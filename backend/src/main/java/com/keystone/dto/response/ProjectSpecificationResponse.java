package com.keystone.dto.response;

import com.keystone.entity.SpecificationCategory;

public class ProjectSpecificationResponse {

    private Long id;
    private SpecificationCategory category;
    private String title;
    private String details;
    private Integer displayOrder;

    public ProjectSpecificationResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public SpecificationCategory getCategory() { return category; }
    public void setCategory(SpecificationCategory category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
