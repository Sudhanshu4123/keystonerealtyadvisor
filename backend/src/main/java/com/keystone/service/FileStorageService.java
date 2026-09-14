package com.keystone.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.keystone.exception.FileStorageException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    private final Path fileStorageLocation;
    private final Cloudinary cloudinary;

    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = Arrays.asList(
            "jpg", "jpeg", "png", "webp", "gif", "svg", "bmp", "avif"
    );

    private static final List<String> ALLOWED_VIDEO_EXTENSIONS = Arrays.asList(
            "mp4", "mov", "avi", "mkv", "webm", "flv", "m4v"
    );

    private static final List<String> ALLOWED_DOC_EXTENSIONS = Arrays.asList(
            "pdf", "doc", "docx", "xls", "xlsx", "txt", "rtf", "jpg", "jpeg", "png", "webp"
    );

    @Autowired
    public FileStorageService(
            @Value("${app.file.upload-dir:./uploads}") String uploadDir,
            @Autowired(required = false) Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.fileStorageLocation.resolve("properties"));
            Files.createDirectories(this.fileStorageLocation.resolve("projects"));
            Files.createDirectories(this.fileStorageLocation.resolve("documents"));
            Files.createDirectories(this.fileStorageLocation.resolve("videos"));
        } catch (Exception ex) {
            logger.warn("Could not create local upload directories: {}", ex.getMessage());
        }
    }

    public String storeFile(MultipartFile file) {
        return storeFile(file, "");
    }

    public String storeFile(MultipartFile file, String subDirectory) {
        if (file == null || file.isEmpty()) {
            throw new FileStorageException("Cannot upload empty file.");
        }

        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");

        if (originalFileName.contains("..")) {
            throw new FileStorageException("Filename contains invalid path sequence: " + originalFileName);
        }

        String fileExtension = "";
        int dotIndex = originalFileName.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFileName.substring(dotIndex + 1).toLowerCase();
        }

        boolean isVideo = ALLOWED_VIDEO_EXTENSIONS.contains(fileExtension);
        boolean isDoc = ALLOWED_DOC_EXTENSIONS.contains(fileExtension);
        boolean isImg = ALLOWED_IMAGE_EXTENSIONS.contains(fileExtension);

        if (!isVideo && !isDoc && !isImg) {
            throw new FileStorageException("Unsupported file extension: ." + fileExtension);
        }

        // 1. Try Cloudinary Upload First (if configured)
        if (cloudinary != null) {
            try {
                String folderName = "keystone";
                if (subDirectory != null && !subDirectory.trim().isEmpty()) {
                    folderName = "keystone/" + subDirectory.trim().replaceAll("^/+", "").replaceAll("/+$", "");
                }

                Map<String, Object> params = new HashMap<>();
                params.put("folder", folderName);
                params.put("use_filename", true);
                params.put("unique_filename", true);

                if (isVideo) {
                    params.put("resource_type", "video");
                } else if (isDoc && !isImg) {
                    params.put("resource_type", "raw");
                } else {
                    params.put("resource_type", "image");
                }

                logger.info("Uploading file '{}' to Cloudinary folder '{}'...", originalFileName, folderName);
                Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), params);

                String secureUrl = (String) uploadResult.get("secure_url");
                if (secureUrl != null && !secureUrl.trim().isEmpty()) {
                    logger.info("Successfully uploaded to Cloudinary: {}", secureUrl);
                    return secureUrl;
                }
            } catch (Exception ex) {
                logger.error("Cloudinary upload failed for '{}', falling back to local storage. Error: {}", originalFileName, ex.getMessage());
            }
        }

        // 2. Local Storage Fallback
        try {
            String sanitizedName = originalFileName.replaceAll("[^a-zA-Z0-9.-]", "_");
            String targetFileName = UUID.randomUUID().toString() + "_" + sanitizedName;

            Path targetDir = (subDirectory != null && !subDirectory.trim().isEmpty())
                    ? this.fileStorageLocation.resolve(subDirectory).normalize()
                    : this.fileStorageLocation;

            Files.createDirectories(targetDir);
            Path targetLocation = targetDir.resolve(targetFileName);

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }

            String urlPrefix = (subDirectory != null && !subDirectory.trim().isEmpty())
                    ? "/uploads/" + subDirectory + "/" + targetFileName
                    : "/uploads/" + targetFileName;

            return urlPrefix.replaceAll("//+", "/");
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + originalFileName + ". Please try again!", ex);
        }
    }

    public boolean deleteFile(String filePath) {
        if (filePath == null || filePath.trim().isEmpty()) {
            return false;
        }

        // Handle Cloudinary URL deletion
        if (filePath.contains("res.cloudinary.com") && cloudinary != null) {
            try {
                // Extract public ID from Cloudinary URL
                // Example: https://res.cloudinary.com/root/image/upload/v12345/keystone/projects/sample.jpg
                int uploadIndex = filePath.indexOf("/upload/");
                if (uploadIndex > 0) {
                    String afterUpload = filePath.substring(uploadIndex + "/upload/".length());
                    // Remove version prefix if present (e.g., v123456789/)
                    afterUpload = afterUpload.replaceAll("^v[0-9]+/", "");
                    // Remove extension
                    int lastDot = afterUpload.lastIndexOf('.');
                    String publicId = lastDot > 0 ? afterUpload.substring(0, lastDot) : afterUpload;

                    logger.info("Deleting media from Cloudinary with publicId: {}", publicId);
                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                    return true;
                }
            } catch (Exception ex) {
                logger.warn("Could not delete file from Cloudinary: {}", ex.getMessage());
            }
        }

        // Handle Local File Deletion
        try {
            if (filePath.startsWith("/uploads/")) {
                String subPath = filePath.substring("/uploads/".length());
                Path localFile = this.fileStorageLocation.resolve(subPath).normalize();
                return Files.deleteIfExists(localFile);
            }
        } catch (IOException ex) {
            logger.warn("Could not delete local file: {}", ex.getMessage());
        }

        return false;
    }
}
