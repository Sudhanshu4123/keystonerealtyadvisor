package com.keystone.service;

import com.keystone.exception.FileStorageException;
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
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private static final List<String> ALLOWED_IMAGE_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "webp");
    private static final List<String> ALLOWED_DOC_EXTENSIONS = Arrays.asList("pdf", "doc", "docx", "jpg", "jpeg", "png", "webp");

    public FileStorageService(@Value("${app.file.upload-dir:./uploads}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
            Files.createDirectories(this.fileStorageLocation.resolve("projects"));
            Files.createDirectories(this.fileStorageLocation.resolve("documents"));
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        return storeFile(file, "");
    }

    public String storeFile(MultipartFile file, String subDirectory) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "file");

        try {
            if (originalFileName.contains("..")) {
                throw new FileStorageException("Filename contains invalid path sequence: " + originalFileName);
            }

            String fileExtension = "";
            int dotIndex = originalFileName.lastIndexOf('.');
            if (dotIndex > 0) {
                fileExtension = originalFileName.substring(dotIndex + 1).toLowerCase();
            }

            List<String> allowedList = (subDirectory != null && subDirectory.contains("documents")) 
                ? ALLOWED_DOC_EXTENSIONS 
                : ALLOWED_IMAGE_EXTENSIONS;

            if (!allowedList.contains(fileExtension)) {
                throw new FileStorageException("Invalid file format (" + fileExtension + "). Allowed: " + String.join(", ", allowedList));
            }

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

    public boolean deleteFile(String relativePath) {
        try {
            if (relativePath != null && relativePath.startsWith("/uploads/")) {
                String subPath = relativePath.substring("/uploads/".length());
                Path filePath = this.fileStorageLocation.resolve(subPath).normalize();
                return Files.deleteIfExists(filePath);
            }
        } catch (IOException ex) {
            // Log or quietly ignore deletion failure
        }
        return false;
    }
}
