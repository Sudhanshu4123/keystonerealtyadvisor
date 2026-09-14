package com.keystone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_images", indexes = {
    @Index(name = "idx_proj_img_proj_id", columnList = "project_id")
})
public class ProjectImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 200)
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "image_type", length = 30)
    private ProjectImageType imageType = ProjectImageType.GALLERY;

    @Column(name = "is_cover", nullable = false)
    private Boolean isCover = false;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectImage() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public ProjectImageType getImageType() { return imageType; }
    public void setImageType(ProjectImageType imageType) { this.imageType = imageType; }

    public Boolean getIsCover() { return isCover; }
    public void setIsCover(Boolean isCover) { this.isCover = isCover; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
