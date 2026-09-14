package com.keystone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_specifications", indexes = {
    @Index(name = "idx_proj_spec_proj_id", columnList = "project_id")
})
public class ProjectSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private SpecificationCategory category = SpecificationCategory.OTHER;

    @Column(nullable = false, length = 150)
    private String title; // e.g. "Main Door", "Flooring Type", "Wiring"

    @Column(name = "specification_details", columnDefinition = "TEXT")
    private String details;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectSpecification() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public SpecificationCategory getCategory() { return category; }
    public void setCategory(SpecificationCategory category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
