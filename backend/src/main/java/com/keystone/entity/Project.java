package com.keystone.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects", indexes = {
    @Index(name = "idx_proj_slug", columnList = "slug", unique = true),
    @Index(name = "idx_proj_city", columnList = "city"),
    @Index(name = "idx_proj_locality", columnList = "locality"),
    @Index(name = "idx_proj_type", columnList = "project_type"),
    @Index(name = "idx_proj_status", columnList = "status"),
    @Index(name = "idx_proj_min_price", columnList = "min_price"),
    @Index(name = "idx_proj_featured", columnList = "is_featured"),
    @Index(name = "idx_proj_created", columnList = "created_at")
})
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_type", nullable = false, length = 40)
    private ProjectType projectType = ProjectType.RESIDENTIAL;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProjectStatus status = ProjectStatus.DRAFT;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "builder_name", length = 150)
    private String builderName;

    @Column(name = "rera_number", length = 100)
    private String reraNumber;

    @Column(name = "possession_date")
    private String possessionDate; // e.g. "Dec 2026", "Ready to Move", "Q3 2027"

    @Column(name = "launch_date")
    private String launchDate;

    // Location Fields
    @Column(length = 300)
    private String address;

    @Column(nullable = false, length = 150)
    private String locality;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 100)
    private String country = "India";

    @Column(length = 20)
    private String pincode;

    private Double latitude;
    private Double longitude;

    @Column(name = "map_url", length = 500)
    private String mapUrl;

    // Pricing Fields
    @Column(name = "min_price", precision = 15, scale = 2)
    private BigDecimal minPrice;

    @Column(name = "max_price", precision = 15, scale = 2)
    private BigDecimal maxPrice;

    @Column(name = "price_per_sqft", precision = 12, scale = 2)
    private BigDecimal pricePerSqft;

    @Column(name = "price_type", length = 50)
    private String priceType; // e.g. "All Inclusive", "Base Price", "On Request"

    @Column(name = "maintenance_charges", length = 100)
    private String maintenanceCharges;

    @Column(name = "booking_amount", length = 100)
    private String bookingAmount;

    // Cover Image & SEO
    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    @Column(name = "seo_title", length = 200)
    private String seoTitle;

    @Column(name = "seo_description", length = 500)
    private String seoDescription;

    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    // Audit Fields
    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    // Relationships
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectConfiguration> configurations = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectAmenity> amenities = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectSpecification> specifications = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectHighlight> highlights = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("isCover DESC, displayOrder ASC, id ASC")
    private List<ProjectImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectFloorPlan> floorPlans = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("uploadDate DESC, id ASC")
    private List<ProjectDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC, id ASC")
    private List<ProjectVideo> videos = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<Property> properties = new ArrayList<>();

    public Project() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == ProjectStatus.PUBLISHED && this.publishedAt == null) {
            this.publishedAt = LocalDateTime.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (this.status == ProjectStatus.PUBLISHED && this.publishedAt == null) {
            this.publishedAt = LocalDateTime.now();
        }
    }

    // Helper methods for cascading management
    public void addConfiguration(ProjectConfiguration config) {
        configurations.add(config);
        config.setProject(this);
    }

    public void removeConfiguration(ProjectConfiguration config) {
        configurations.remove(config);
        config.setProject(null);
    }

    public void addAmenity(ProjectAmenity amenity) {
        amenities.add(amenity);
        amenity.setProject(this);
    }

    public void removeAmenity(ProjectAmenity amenity) {
        amenities.remove(amenity);
        amenity.setProject(null);
    }

    public void addSpecification(ProjectSpecification spec) {
        specifications.add(spec);
        spec.setProject(this);
    }

    public void removeSpecification(ProjectSpecification spec) {
        specifications.remove(spec);
        spec.setProject(null);
    }

    public void addHighlight(ProjectHighlight highlight) {
        highlights.add(highlight);
        highlight.setProject(this);
    }

    public void removeHighlight(ProjectHighlight highlight) {
        highlights.remove(highlight);
        highlight.setProject(null);
    }

    public void addImage(ProjectImage image) {
        images.add(image);
        image.setProject(this);
    }

    public void removeImage(ProjectImage image) {
        images.remove(image);
        image.setProject(null);
    }

    public void addFloorPlan(ProjectFloorPlan floorPlan) {
        floorPlans.add(floorPlan);
        floorPlan.setProject(this);
    }

    public void removeFloorPlan(ProjectFloorPlan floorPlan) {
        floorPlans.remove(floorPlan);
        floorPlan.setProject(null);
    }

    public void addDocument(ProjectDocument doc) {
        documents.add(doc);
        doc.setProject(this);
    }

    public void removeDocument(ProjectDocument doc) {
        documents.remove(doc);
        doc.setProject(null);
    }

    public void addVideo(ProjectVideo video) {
        videos.add(video);
        video.setProject(this);
    }

    public void removeVideo(ProjectVideo video) {
        videos.remove(video);
        video.setProject(null);
    }

    // Getters and Setters
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

    public List<ProjectConfiguration> getConfigurations() { return configurations; }
    public void setConfigurations(List<ProjectConfiguration> configurations) { this.configurations = configurations; }

    public List<ProjectAmenity> getAmenities() { return amenities; }
    public void setAmenities(List<ProjectAmenity> amenities) { this.amenities = amenities; }

    public List<ProjectSpecification> getSpecifications() { return specifications; }
    public void setSpecifications(List<ProjectSpecification> specifications) { this.specifications = specifications; }

    public List<ProjectHighlight> getHighlights() { return highlights; }
    public void setHighlights(List<ProjectHighlight> highlights) { this.highlights = highlights; }

    public List<ProjectImage> getImages() { return images; }
    public void setImages(List<ProjectImage> images) { this.images = images; }

    public List<ProjectFloorPlan> getFloorPlans() { return floorPlans; }
    public void setFloorPlans(List<ProjectFloorPlan> floorPlans) { this.floorPlans = floorPlans; }

    public List<ProjectDocument> getDocuments() { return documents; }
    public void setDocuments(List<ProjectDocument> documents) { this.documents = documents; }

    public List<ProjectVideo> getVideos() { return videos; }
    public void setVideos(List<ProjectVideo> videos) { this.videos = videos; }

    public List<Property> getProperties() { return properties; }
    public void setProperties(List<Property> properties) { this.properties = properties; }
}
