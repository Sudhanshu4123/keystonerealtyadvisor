package com.keystone.dto.response;

import java.time.LocalDateTime;

public class PropertyImageResponse {
    private Long id;
    private String imagePath;
    private Boolean isPrimary;
    private LocalDateTime createdAt;

    public PropertyImageResponse() {
    }

    public PropertyImageResponse(Long id, String imagePath, Boolean isPrimary, LocalDateTime createdAt) {
        this.id = id;
        this.imagePath = imagePath;
        this.isPrimary = isPrimary;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImageUrl() {
        return imagePath;
    }

    public String getUrl() {
        return imagePath;
    }

    public Boolean getIsPrimary() {
        return isPrimary;
    }

    public void setIsPrimary(Boolean primary) {
        isPrimary = primary;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
