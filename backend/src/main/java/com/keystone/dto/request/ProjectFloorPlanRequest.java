package com.keystone.dto.request;

import com.keystone.entity.AreaUnit;
import jakarta.validation.constraints.NotBlank;

public class ProjectFloorPlanRequest {

    @NotBlank(message = "Floor plan title is required")
    private String title;

    private String configurationName;
    private Double area;
    private AreaUnit areaUnit = AreaUnit.SQFT;
    private String imageUrl;
    private String documentUrl;
    private String description;
    private Integer displayOrder = 0;

    public ProjectFloorPlanRequest() {}

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
