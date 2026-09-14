package com.keystone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_amenities", indexes = {
    @Index(name = "idx_proj_amenity_proj_id", columnList = "project_id")
})
public class ProjectAmenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 150)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AmenityCategory category = AmenityCategory.OTHER;

    @Column(name = "icon_name", length = 50)
    private String iconName;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectAmenity() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AmenityCategory getCategory() { return category; }
    public void setCategory(AmenityCategory category) { this.category = category; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
