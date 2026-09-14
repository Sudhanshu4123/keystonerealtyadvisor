package com.keystone.dto.request;

import jakarta.validation.constraints.NotBlank;

public class ProjectHighlightRequest {

    @NotBlank(message = "Highlight title is required")
    private String title;

    private String description;
    private Integer displayOrder = 0;

    public ProjectHighlightRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
