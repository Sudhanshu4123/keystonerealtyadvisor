package com.keystone.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "project_configurations", indexes = {
    @Index(name = "idx_proj_config_proj_id", columnList = "project_id")
})
public class ProjectConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 100)
    private String name; // e.g. "3 BHK Luxury Apartment", "4 BHK Sky Villa"

    private Integer bedrooms;
    private Integer bathrooms;

    private Double area;

    @Enumerated(EnumType.STRING)
    @Column(name = "area_unit", length = 20)
    private AreaUnit areaUnit = AreaUnit.SQFT;

    @Column(precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "availability_status", length = 50)
    private String availabilityStatus; // e.g. "Available", "Few Units Left", "Sold Out"

    @Column(length = 500)
    private String description;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectConfiguration() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

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
