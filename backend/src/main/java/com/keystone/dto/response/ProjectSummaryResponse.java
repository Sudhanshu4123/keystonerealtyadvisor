package com.keystone.dto.response;

import com.keystone.entity.ProjectStatus;
import com.keystone.entity.ProjectType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ProjectSummaryResponse {

    private Long id;
    private String name;
    private String slug;
    private ProjectType projectType;
    private ProjectStatus status;
    private String shortDescription;
    private String builderName;
    private String reraNumber;
    private String possessionDate;
    private String locality;
    private String city;
    private String state;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private BigDecimal pricePerSqft;
    private String priceType;
    private String coverImageUrl;
    private Boolean isFeatured;
    private Integer totalConfigurations;
    private Integer totalAmenities;
    private List<String> configurationNames;
    private LocalDateTime createdAt;
    private LocalDateTime publishedAt;

    public ProjectSummaryResponse() {}

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

    public String getBuilderName() { return builderName; }
    public void setBuilderName(String builderName) { this.builderName = builderName; }

    public String getReraNumber() { return reraNumber; }
    public void setReraNumber(String reraNumber) { this.reraNumber = reraNumber; }

    public String getPossessionDate() { return possessionDate; }
    public void setPossessionDate(String possessionDate) { this.possessionDate = possessionDate; }

    public String getLocality() { return locality; }
    public void setLocality(String locality) { this.locality = locality; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }

    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }

    public BigDecimal getPricePerSqft() { return pricePerSqft; }
    public void setPricePerSqft(BigDecimal pricePerSqft) { this.pricePerSqft = pricePerSqft; }

    public String getPriceType() { return priceType; }
    public void setPriceType(String priceType) { this.priceType = priceType; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public Integer getTotalConfigurations() { return totalConfigurations; }
    public void setTotalConfigurations(Integer totalConfigurations) { this.totalConfigurations = totalConfigurations; }

    public Integer getTotalAmenities() { return totalAmenities; }
    public void setTotalAmenities(Integer totalAmenities) { this.totalAmenities = totalAmenities; }

    public List<String> getConfigurationNames() { return configurationNames; }
    public void setConfigurationNames(List<String> configurationNames) { this.configurationNames = configurationNames; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
}
