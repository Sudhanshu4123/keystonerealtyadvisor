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
    private String slug;
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
    private String propertyCategory;
    private String societyName;
    private Double builtUpArea;
    private Double carpetArea;
    private String transactionType;
    private String constructionStatus;
    private String propertyAge;
    private Integer balconies;
    private String floorNo;
    private Integer totalFloors;
    private Integer coveredParking;
    private Integer openParking;
    private String preferredTenant;
    private String bachelorPreference;
    private Boolean petFriendly;
    private String availableFrom;
    private String maintenanceCharges;
    private String securityDeposit;
    private String lockInPeriod;
    private String brokerage;
    private String amenities;
    private String furnishingDetails;
    private String pgName;
    private Integer totalBeds;
    private String pgFor;
    private String bestSuitedFor;
    private Boolean mealsAvailable;
    private String noticePeriod;
    private String pgRules;
    private String commonAreas;
    private String propertyManagedBy;
    private Boolean managerStaysAtProperty;
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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
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

    public String getPropertyCategory() {
        return propertyCategory;
    }

    public void setPropertyCategory(String propertyCategory) {
        this.propertyCategory = propertyCategory;
    }

    public String getSocietyName() {
        return societyName;
    }

    public void setSocietyName(String societyName) {
        this.societyName = societyName;
    }

    public Double getBuiltUpArea() {
        return builtUpArea;
    }

    public void setBuiltUpArea(Double builtUpArea) {
        this.builtUpArea = builtUpArea;
    }

    public Double getCarpetArea() {
        return carpetArea;
    }

    public void setCarpetArea(Double carpetArea) {
        this.carpetArea = carpetArea;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getConstructionStatus() {
        return constructionStatus;
    }

    public void setConstructionStatus(String constructionStatus) {
        this.constructionStatus = constructionStatus;
    }

    public String getPropertyAge() {
        return propertyAge;
    }

    public void setPropertyAge(String propertyAge) {
        this.propertyAge = propertyAge;
    }

    public Integer getBalconies() {
        return balconies;
    }

    public void setBalconies(Integer balconies) {
        this.balconies = balconies;
    }

    public String getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(String floorNo) {
        this.floorNo = floorNo;
    }

    public Integer getTotalFloors() {
        return totalFloors;
    }

    public void setTotalFloors(Integer totalFloors) {
        this.totalFloors = totalFloors;
    }

    public Integer getCoveredParking() {
        return coveredParking;
    }

    public void setCoveredParking(Integer coveredParking) {
        this.coveredParking = coveredParking;
    }

    public Integer getOpenParking() {
        return openParking;
    }

    public void setOpenParking(Integer openParking) {
        this.openParking = openParking;
    }

    public String getPreferredTenant() {
        return preferredTenant;
    }

    public void setPreferredTenant(String preferredTenant) {
        this.preferredTenant = preferredTenant;
    }

    public Boolean getPetFriendly() {
        return petFriendly;
    }

    public void setPetFriendly(Boolean petFriendly) {
        this.petFriendly = petFriendly;
    }

    public String getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(String availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getMaintenanceCharges() {
        return maintenanceCharges;
    }

    public void setMaintenanceCharges(String maintenanceCharges) {
        this.maintenanceCharges = maintenanceCharges;
    }

    public String getSecurityDeposit() {
        return securityDeposit;
    }

    public void setSecurityDeposit(String securityDeposit) {
        this.securityDeposit = securityDeposit;
    }

    public String getLockInPeriod() {
        return lockInPeriod;
    }

    public void setLockInPeriod(String lockInPeriod) {
        this.lockInPeriod = lockInPeriod;
    }

    public String getBrokerage() {
        return brokerage;
    }

    public void setBrokerage(String brokerage) {
        this.brokerage = brokerage;
    }

    public String getAmenities() {
        return amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public String getFurnishingDetails() {
        return furnishingDetails;
    }

    public void setFurnishingDetails(String furnishingDetails) {
        this.furnishingDetails = furnishingDetails;
    }

    public String getBachelorPreference() {
        return bachelorPreference;
    }

    public void setBachelorPreference(String bachelorPreference) {
        this.bachelorPreference = bachelorPreference;
    }

    public String getPgName() {
        return pgName;
    }

    public void setPgName(String pgName) {
        this.pgName = pgName;
    }

    public Integer getTotalBeds() {
        return totalBeds;
    }

    public void setTotalBeds(Integer totalBeds) {
        this.totalBeds = totalBeds;
    }

    public String getPgFor() {
        return pgFor;
    }

    public void setPgFor(String pgFor) {
        this.pgFor = pgFor;
    }

    public String getBestSuitedFor() {
        return bestSuitedFor;
    }

    public void setBestSuitedFor(String bestSuitedFor) {
        this.bestSuitedFor = bestSuitedFor;
    }

    public Boolean getMealsAvailable() {
        return mealsAvailable;
    }

    public void setMealsAvailable(Boolean mealsAvailable) {
        this.mealsAvailable = mealsAvailable;
    }

    public String getNoticePeriod() {
        return noticePeriod;
    }

    public void setNoticePeriod(String noticePeriod) {
        this.noticePeriod = noticePeriod;
    }

    public String getPgRules() {
        return pgRules;
    }

    public void setPgRules(String pgRules) {
        this.pgRules = pgRules;
    }

    public String getCommonAreas() {
        return commonAreas;
    }

    public void setCommonAreas(String commonAreas) {
        this.commonAreas = commonAreas;
    }

    public String getPropertyManagedBy() {
        return propertyManagedBy;
    }

    public void setPropertyManagedBy(String propertyManagedBy) {
        this.propertyManagedBy = propertyManagedBy;
    }

    public Boolean getManagerStaysAtProperty() {
        return managerStaysAtProperty;
    }

    public void setManagerStaysAtProperty(Boolean managerStaysAtProperty) {
        this.managerStaysAtProperty = managerStaysAtProperty;
    }
}
