package com.keystone.dto.response;

import com.keystone.entity.FurnishedStatus;
import com.keystone.entity.ListingType;
import com.keystone.entity.PropertyStatus;
import com.keystone.entity.PropertyType;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class PropertyResponse {
    private Long id;
    private String title;
    private String description;
    private Double area;
    private Integer bathrooms;
    private Integer bedrooms;
    private String city;
    private String location;
    private BigDecimal price;
    private PropertyType propertyType;
    private ListingType listingType;
    private FurnishedStatus furnished;
    private PropertyStatus status;
    private String primaryImageUrl;
    private List<PropertyImageResponse> images;
    private Long projectId;
    private String projectName;
    private boolean isFavorite;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PropertyResponse() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public PropertyType getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(PropertyType propertyType) {
        this.propertyType = propertyType;
    }

    public ListingType getListingType() {
        return listingType;
    }

    public void setListingType(ListingType listingType) {
        this.listingType = listingType;
    }

    public FurnishedStatus getFurnished() {
        return furnished;
    }

    public void setFurnished(FurnishedStatus furnished) {
        this.furnished = furnished;
    }

    public PropertyStatus getStatus() {
        return status;
    }

    public void setStatus(PropertyStatus status) {
        this.status = status;
    }

    public String getPrimaryImageUrl() {
        return primaryImageUrl;
    }

    public void setPrimaryImageUrl(String primaryImageUrl) {
        this.primaryImageUrl = primaryImageUrl;
    }

    public List<PropertyImageResponse> getImages() {
        return images;
    }

    public void setImages(List<PropertyImageResponse> images) {
        this.images = images;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
