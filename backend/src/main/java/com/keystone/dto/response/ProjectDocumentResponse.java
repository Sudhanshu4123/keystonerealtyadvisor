package com.keystone.dto.response;

import com.keystone.entity.ProjectDocumentType;
import java.time.LocalDateTime;

public class ProjectDocumentResponse {

    private Long id;
    private String documentName;
    private ProjectDocumentType documentType;
    private String fileUrl;
    private Long fileSize;
    private Boolean isPublic;
    private LocalDateTime uploadDate;

    public ProjectDocumentResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public ProjectDocumentType getDocumentType() { return documentType; }
    public void setDocumentType(ProjectDocumentType documentType) { this.documentType = documentType; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }

    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
}
