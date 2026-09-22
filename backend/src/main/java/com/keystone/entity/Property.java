package com.keystone.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "properties", indexes = {
    @Index(name = "idx_prop_slug", columnList = "slug"),
    @Index(name = "idx_prop_city", columnList = "city"),
    @Index(name = "idx_prop_location", columnList = "location"),
    @Index(name = "idx_prop_price", columnList = "price"),
    @Index(name = "idx_prop_type", columnList = "property_type"),
    @Index(name = "idx_prop_listing_type", columnList = "listing_type"),
    @Index(name = "idx_prop_status", columnList = "status"),
    @Index(name = "idx_prop_created", columnList = "created_at")
})
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String slug;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double area; // in sq ft / sq m

    @Column(nullable = false)
    private Integer bathrooms;

    @Column(nullable = false)
    private Integer bedrooms;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(nullable = false, length = 200)
    private String location;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false, length = 30)
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "listing_type", nullable = false, length = 20)
    private ListingType listingType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private FurnishedStatus furnished = FurnishedStatus.UNFURNISHED;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private PropertyStatus status = PropertyStatus.AVAILABLE;

    @Column(name = "property_category", length = 50)
    private String propertyCategory = "Residential";

    @Column(name = "society_name", length = 200)
    private String societyName;

    @Column(name = "built_up_area")
    private Double builtUpArea;

    @Column(name = "carpet_area")
    private Double carpetArea;

    @Column(name = "transaction_type", length = 50)
    private String transactionType;

    @Column(name = "construction_status", length = 50)
    private String constructionStatus;

    @Column(name = "property_age", length = 50)
    private String propertyAge;

    @Column(name = "balconies")
    private Integer balconies = 0;

    @Column(name = "floor_no", length = 30)
    private String floorNo;

    @Column(name = "total_floors")
    private Integer totalFloors;

    @Column(name = "covered_parking")
    private Integer coveredParking = 0;

    @Column(name = "open_parking")
    private Integer openParking = 0;

    @Column(name = "preferred_tenant", length = 50)
    private String preferredTenant;

    @Column(name = "bachelor_preference", length = 50)
    private String bachelorPreference = "Open for both";

    @Column(name = "pet_friendly")
    private Boolean petFriendly = false;

    @Column(name = "available_from", length = 100)
    private String availableFrom;

    @Column(name = "maintenance_charges", length = 100)
    private String maintenanceCharges;

    @Column(name = "security_deposit", length = 100)
    private String securityDeposit;

    @Column(name = "lock_in_period", length = 100)
    private String lockInPeriod;

    @Column(name = "brokerage", length = 100)
    private String brokerage;

    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;

    @Column(name = "furnishing_details", columnDefinition = "TEXT")
    private String furnishingDetails;

    @Column(name = "pg_name", length = 200)
    private String pgName;

    @Column(name = "total_beds")
    private Integer totalBeds;

    @Column(name = "pg_for", length = 50)
    private String pgFor;

    @Column(name = "best_suited_for", length = 100)
    private String bestSuitedFor;

    @Column(name = "meals_available")
    private Boolean mealsAvailable;

    @Column(name = "notice_period", length = 50)
    private String noticePeriod;

    @Column(name = "pg_rules", columnDefinition = "TEXT")
    private String pgRules;

    @Column(name = "common_areas", columnDefinition = "TEXT")
    private String commonAreas;

    @Column(name = "property_managed_by", length = 100)
    private String propertyManagedBy;

    @Column(name = "manager_stays_at_property")
    private Boolean managerStaysAtProperty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("isPrimary DESC, id ASC")
    private List<PropertyImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Favorite> favorites = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enquiry> enquiries = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Property() {
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.slug == null || this.slug.trim().isEmpty()) {
            this.slug = generateSlug();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
        if (this.slug == null || this.slug.trim().isEmpty()) {
            this.slug = generateSlug();
        }
    }

    public String generateSlug() {
        StringBuilder sb = new StringBuilder();
        if (title != null && !title.trim().isEmpty()) {
            sb.append(title.trim());
        }
        if (location != null && !location.trim().isEmpty()) {
            sb.append(" ").append(location.trim());
        }
        if (city != null && !city.trim().isEmpty()) {
            sb.append(" ").append(city.trim());
        }
        String text = sb.length() > 0 ? sb.toString() : "property";
        String nowhitespace = text.replaceAll("[\\s]+", "-");
        String normalized = java.text.Normalizer.normalize(nowhitespace, java.text.Normalizer.Form.NFD);
        String cleanSlug = normalized.replaceAll("[^\\w-]", "").toLowerCase(java.util.Locale.ENGLISH).replaceAll("-+", "-").replaceAll("^-|-$", "");
        return cleanSlug.isEmpty() ? ("property-" + (id != null ? id : System.currentTimeMillis())) : cleanSlug;
    }

    public void addImage(PropertyImage image) {
        images.add(image);
        image.setProperty(this);
    }

    public void removeImage(PropertyImage image) {
        images.remove(image);
        image.setProperty(null);
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

    public List<PropertyImage> getImages() {
        return images;
    }

    public void setImages(List<PropertyImage> images) {
        this.images = images;
    }

    public List<Favorite> getFavorites() {
        return favorites;
    }

    public void setFavorites(List<Favorite> favorites) {
        this.favorites = favorites;
    }

    public List<Enquiry> getEnquiries() {
        return enquiries;
    }

    public void setEnquiries(List<Enquiry> enquiries) {
        this.enquiries = enquiries;
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

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
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
