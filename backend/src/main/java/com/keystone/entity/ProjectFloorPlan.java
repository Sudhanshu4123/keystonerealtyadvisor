package com.keystone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_floor_plans", indexes = {
    @Index(name = "idx_proj_fp_proj_id", columnList = "project_id")
})
public class ProjectFloorPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 150)
    private String title; // e.g. "Typical 3 BHK Floor Plan", "Penthouse Lower Level"

    @Column(name = "configuration_name", length = 100)
    private String configurationName;

    private Double area;

    @Enumerated(EnumType.STRING)
    @Column(name = "area_unit", length = 20)
    private AreaUnit areaUnit = AreaUnit.SQFT;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "document_url", length = 500)
    private String documentUrl;

    @Column(length = 500)
    private String description;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectFloorPlan() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getConfigurationName() { return configurationName; }
    public void setConfigurationName(String configurationName) { this.configurationName = configurationName; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public AreaUnit getAreaUnit() { return areaUnit; }
    public void setAreaUnit(AreaUnit areaUnit) { this.areaUnit = areaUnit; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDocumentUrl() { return documentUrl; }
    public void setDocumentUrl(String documentUrl) { this.documentUrl = documentUrl; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
