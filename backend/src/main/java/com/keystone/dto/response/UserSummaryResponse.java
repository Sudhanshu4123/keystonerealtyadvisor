package com.keystone.dto.response;

import com.keystone.entity.Role;
import com.keystone.entity.UserStatus;
import java.time.LocalDateTime;

public class UserSummaryResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private UserStatus status;
    private int totalFavorites;
    private int totalEnquiries;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserSummaryResponse() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public int getTotalFavorites() {
        return totalFavorites;
    }

    public void setTotalFavorites(int totalFavorites) {
        this.totalFavorites = totalFavorites;
    }

    public int getTotalEnquiries() {
        return totalEnquiries;
    }

    public void setTotalEnquiries(int totalEnquiries) {
        this.totalEnquiries = totalEnquiries;
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
