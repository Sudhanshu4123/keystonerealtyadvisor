package com.keystone.dto.response;

import com.keystone.entity.AreaUnit;

public class ProjectFloorPlanResponse {

    private Long id;
    private String title;
    private String configurationName;
    private Double area;
    private AreaUnit areaUnit;
    private String imageUrl;
    private String documentUrl;
    private String description;
    private Integer displayOrder;

    public ProjectFloorPlanResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
