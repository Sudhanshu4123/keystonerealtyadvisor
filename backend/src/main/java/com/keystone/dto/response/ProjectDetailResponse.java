package com.keystone.dto.response;

import com.keystone.entity.ProjectStatus;
import com.keystone.entity.ProjectType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ProjectDetailResponse {

    private Long id;
    private String name;
    private String slug;
    private ProjectType projectType;
    private ProjectStatus status;
    private String shortDescription;
    private String description;
    private String builderName;
    private String reraNumber;
    private String possessionDate;
    private String launchDate;

    // Location
    private String address;
    private String locality;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private String mapUrl;

    // Pricing
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal pricePerSqft;
    private String priceType;
    private String maintenanceCharges;
    private String bookingAmount;

    // Cover & SEO
    private String coverImageUrl;
    private String seoTitle;
    private String seoDescription;
    private Boolean isFeatured;

    // Audit
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;

    // Relational Collections
    private List<ProjectConfigurationResponse> configurations;
    private List<ProjectAmenityResponse> amenities;
    private List<ProjectSpecificationResponse> specifications;
    private List<ProjectHighlightResponse> highlights;
    private List<ProjectImageResponse> images;
    private List<ProjectFloorPlanResponse> floorPlans;
    private List<ProjectDocumentResponse> documents;
    private List<ProjectVideoResponse> videos;
    private List<PropertyResponse> properties;

    public ProjectDetailResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public ProjectType getProjectType() { return projectType; }
    public void setProjectType(ProjectType projectType) { this.projectType = projectType; }

    public ProjectStatus getStatus() { return status; }
    public void setStatus(ProjectStatus status) { this.status = status; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBuilderName() { return builderName; }
    public void setBuilderName(String builderName) { this.builderName = builderName; }

    public String getReraNumber() { return reraNumber; }
    public void setReraNumber(String reraNumber) { this.reraNumber = reraNumber; }

    public String getPossessionDate() { return possessionDate; }
    public void setPossessionDate(String possessionDate) { this.possessionDate = possessionDate; }

    public String getLaunchDate() { return launchDate; }
    public void setLaunchDate(String launchDate) { this.launchDate = launchDate; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getLocality() { return locality; }
    public void setLocality(String locality) { this.locality = locality; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getMapUrl() { return mapUrl; }
    public void setMapUrl(String mapUrl) { this.mapUrl = mapUrl; }

    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }

    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }

    public BigDecimal getPricePerSqft() { return pricePerSqft; }
    public void setPricePerSqft(BigDecimal pricePerSqft) { this.pricePerSqft = pricePerSqft; }

    public String getPriceType() { return priceType; }
    public void setPriceType(String priceType) { this.priceType = priceType; }

    public String getMaintenanceCharges() { return maintenanceCharges; }
    public void setMaintenanceCharges(String maintenanceCharges) { this.maintenanceCharges = maintenanceCharges; }

    public String getBookingAmount() { return bookingAmount; }
    public void setBookingAmount(String bookingAmount) { this.bookingAmount = bookingAmount; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public String getSeoTitle() { return seoTitle; }
    public void setSeoTitle(String seoTitle) { this.seoTitle = seoTitle; }

    public String getSeoDescription() { return seoDescription; }
    public void setSeoDescription(String seoDescription) { this.seoDescription = seoDescription; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }

    public List<ProjectConfigurationResponse> getConfigurations() { return configurations; }
    public void setConfigurations(List<ProjectConfigurationResponse> configurations) { this.configurations = configurations; }

    public List<ProjectAmenityResponse> getAmenities() { return amenities; }
    public void setAmenities(List<ProjectAmenityResponse> amenities) { this.amenities = amenities; }

    public List<ProjectSpecificationResponse> getSpecifications() { return specifications; }
    public void setSpecifications(List<ProjectSpecificationResponse> specifications) { this.specifications = specifications; }

    public List<ProjectHighlightResponse> getHighlights() { return highlights; }
    public void setHighlights(List<ProjectHighlightResponse> highlights) { this.highlights = highlights; }

    public List<ProjectImageResponse> getImages() { return images; }
    public void setImages(List<ProjectImageResponse> images) { this.images = images; }

    public List<ProjectFloorPlanResponse> getFloorPlans() { return floorPlans; }
    public void setFloorPlans(List<ProjectFloorPlanResponse> floorPlans) { this.floorPlans = floorPlans; }

    public List<ProjectDocumentResponse> getDocuments() { return documents; }
    public void setDocuments(List<ProjectDocumentResponse> documents) { this.documents = documents; }

    public List<ProjectVideoResponse> getVideos() { return videos; }
    public void setVideos(List<ProjectVideoResponse> videos) { this.videos = videos; }

    public List<PropertyResponse> getProperties() { return properties; }
    public void setProperties(List<PropertyResponse> properties) { this.properties = properties; }
}
