package com.keystone.dto.request;

import com.keystone.entity.SpecificationCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProjectSpecificationRequest {

    @NotNull(message = "Category is required")
    private SpecificationCategory category = SpecificationCategory.OTHER;

    @NotBlank(message = "Specification title/item is required")
    private String title;

    private String details;
    private Integer displayOrder = 0;

    public ProjectSpecificationRequest() {}

    public SpecificationCategory getCategory() { return category; }
    public void setCategory(SpecificationCategory category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
