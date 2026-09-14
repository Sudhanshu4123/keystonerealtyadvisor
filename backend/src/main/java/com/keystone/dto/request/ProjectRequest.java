package com.keystone.dto.request;

import com.keystone.entity.ProjectStatus;
import com.keystone.entity.ProjectType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public class ProjectRequest {

    @NotBlank(message = "Project name is required")
    @Size(max = 200, message = "Project name cannot exceed 200 characters")
    private String name;

    private String slug;

    @NotNull(message = "Project type is required")
    private ProjectType projectType;

    private ProjectStatus status;

    @Size(max = 500, message = "Short description cannot exceed 500 characters")
    private String shortDescription;

    private String description;

    @Size(max = 150, message = "Builder name cannot exceed 150 characters")
    private String builderName;

    @Size(max = 100, message = "RERA number cannot exceed 100 characters")
    private String reraNumber;

    private String possessionDate;
    private String launchDate;

    // Location
    private String address;

    @NotBlank(message = "Locality is required")
    @Size(max = 150, message = "Locality cannot exceed 150 characters")
    private String locality;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
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

    // SEO & Meta
    private String coverImageUrl;
    private String seoTitle;
    private String seoDescription;
    private Boolean isFeatured;

    public ProjectRequest() {}

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
}
