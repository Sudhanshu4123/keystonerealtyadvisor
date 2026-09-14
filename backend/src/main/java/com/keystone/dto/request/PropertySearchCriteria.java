package com.keystone.dto.request;

import com.keystone.entity.FurnishedStatus;
import com.keystone.entity.ListingType;
import com.keystone.entity.PropertyStatus;
import com.keystone.entity.PropertyType;

import java.math.BigDecimal;

public class PropertySearchCriteria {
    private String query;
    private String city;
    private String location;
    private PropertyType propertyType;
    private ListingType listingType;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer bedrooms;
    private Integer bathrooms;
    private Double minArea;
    private Double maxArea;
    private FurnishedStatus furnished;
    private PropertyStatus status;
    private String sortBy = "createdAt"; // createdAt, price, area
    private String sortDirection = "DESC"; // ASC, DESC

    public PropertySearchCriteria() {
    }

    // Getters and Setters
    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
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

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(BigDecimal minPrice) {
        this.minPrice = minPrice;
    }

    public BigDecimal getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(BigDecimal maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public Double getMinArea() {
        return minArea;
    }

    public void setMinArea(Double minArea) {
        this.minArea = minArea;
    }

    public Double getMaxArea() {
        return maxArea;
    }

    public void setMaxArea(Double maxArea) {
        this.maxArea = maxArea;
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

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }
}
