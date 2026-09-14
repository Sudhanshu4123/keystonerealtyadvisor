package com.keystone.dto.request;

import com.keystone.entity.ProjectStatus;
import com.keystone.entity.ProjectType;
import java.math.BigDecimal;

public class ProjectSearchCriteria {

    private String query;
    private String city;
    private String locality;
    private ProjectType projectType;
    private ProjectStatus status;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private Integer bedrooms;
    private Boolean isFeatured;
    private String sortBy = "createdAt";
    private String sortDirection = "desc";
    private int page = 0;
    private int size = 12;

    public ProjectSearchCriteria() {}

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getLocality() { return locality; }
    public void setLocality(String locality) { this.locality = locality; }

    public ProjectType getProjectType() { return projectType; }
    public void setProjectType(ProjectType projectType) { this.projectType = projectType; }

    public ProjectStatus getStatus() { return status; }
    public void setStatus(ProjectStatus status) { this.status = status; }

    public BigDecimal getMinPrice() { return minPrice; }
    public void setMinPrice(BigDecimal minPrice) { this.minPrice = minPrice; }

    public BigDecimal getMaxPrice() { return maxPrice; }
    public void setMaxPrice(BigDecimal maxPrice) { this.maxPrice = maxPrice; }

    public Integer getBedrooms() { return bedrooms; }
    public void setBedrooms(Integer bedrooms) { this.bedrooms = bedrooms; }

    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }

    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }

    public String getSortDirection() { return sortDirection; }
    public void setSortDirection(String sortDirection) { this.sortDirection = sortDirection; }

    public int getPage() { return page; }
    public void setPage(int page) { this.page = page; }

    public int getSize() { return size; }
    public void setSize(int size) { this.size = size; }
}
