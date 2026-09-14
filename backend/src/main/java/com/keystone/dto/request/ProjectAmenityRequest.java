package com.keystone.dto.request;

import com.keystone.entity.AmenityCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ProjectAmenityRequest {

    @NotBlank(message = "Amenity name is required")
    private String name;

    @NotNull(message = "Amenity category is required")
    private AmenityCategory category = AmenityCategory.OTHER;

    private String iconName;
    private Integer displayOrder = 0;

    public ProjectAmenityRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AmenityCategory getCategory() { return category; }
    public void setCategory(AmenityCategory category) { this.category = category; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
