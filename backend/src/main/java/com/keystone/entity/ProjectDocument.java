package com.keystone.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_documents", indexes = {
    @Index(name = "idx_proj_doc_proj_id", columnList = "project_id")
})
public class ProjectDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "document_name", nullable = false, length = 200)
    private String documentName;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false, length = 40)
    private ProjectDocumentType documentType = ProjectDocumentType.BROCHURE;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "file_size")
    private Long fileSize; // in bytes

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic = true;

    @Column(name = "upload_date", nullable = false)
    private LocalDateTime uploadDate;

    public ProjectDocument() {}

    @PrePersist
    protected void onCreate() {
        if (this.uploadDate == null) {
            this.uploadDate = LocalDateTime.now();
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

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
