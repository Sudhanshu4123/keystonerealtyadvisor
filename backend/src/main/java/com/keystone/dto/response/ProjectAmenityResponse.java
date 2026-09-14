package com.keystone.dto.response;

import com.keystone.entity.AmenityCategory;

public class ProjectAmenityResponse {

    private Long id;
    private String name;
    private AmenityCategory category;
    private String iconName;
    private Integer displayOrder;

    public ProjectAmenityResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AmenityCategory getCategory() { return category; }
    public void setCategory(AmenityCategory category) { this.category = category; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
