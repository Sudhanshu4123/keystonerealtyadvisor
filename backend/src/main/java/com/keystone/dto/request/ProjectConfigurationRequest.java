package com.keystone.dto.request;

import com.keystone.entity.AreaUnit;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public class ProjectConfigurationRequest {

    @NotBlank(message = "Configuration name is required")
    private String name;

    private Integer bedrooms;
    private Integer bathrooms;
    private Double area;
    private AreaUnit areaUnit = AreaUnit.SQFT;
    private BigDecimal price;
    private String availabilityStatus;
    private String description;
    private Integer displayOrder = 0;

    public ProjectConfigurationRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Integer getBathrooms() { return bathrooms; }
    public void setBathrooms(Integer bathrooms) { this.bathrooms = bathrooms; }

    public Double getArea() { return area; }
    public void setArea(Double area) { this.area = area; }

    public AreaUnit getAreaUnit() { return areaUnit; }
    public void setAreaUnit(AreaUnit areaUnit) { this.areaUnit = areaUnit; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
