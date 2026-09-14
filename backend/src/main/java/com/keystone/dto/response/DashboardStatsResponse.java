package com.keystone.dto.response;

import java.util.List;

public class DashboardStatsResponse {
    private long totalProperties;
    private long availableProperties;
    private long underOfferProperties;
    private long soldProperties;
    private long rentedProperties;
    private long totalProjects;
    private long publishedProjects;
    private long draftProjects;
    private long totalUsers;
    private long totalEnquiries;
    private long pendingEnquiries;
    private long contactedEnquiries;
    private long inProgressEnquiries;
    private long resolvedEnquiries;
    private List<EnquiryResponse> recentEnquiries;
    private List<PropertyResponse> recentProperties;
    private List<ProjectSummaryResponse> recentProjects;

    public DashboardStatsResponse() {
    }

    // Getters and Setters
    public long getTotalProperties() {
        return totalProperties;
    }

    public void setTotalProperties(long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public long getAvailableProperties() {
        return availableProperties;
    }

    public void setAvailableProperties(long availableProperties) {
        this.availableProperties = availableProperties;
    }

    public long getUnderOfferProperties() {
        return underOfferProperties;
    }

    public void setUnderOfferProperties(long underOfferProperties) {
        this.underOfferProperties = underOfferProperties;
    }

    public long getSoldProperties() {
        return soldProperties;
    }

    public void setSoldProperties(long soldProperties) {
        this.soldProperties = soldProperties;
    }

    public long getRentedProperties() {
        return rentedProperties;
    }

    public void setRentedProperties(long rentedProperties) {
        this.rentedProperties = rentedProperties;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getTotalEnquiries() {
        return totalEnquiries;
    }

    public void setTotalEnquiries(long totalEnquiries) {
        this.totalEnquiries = totalEnquiries;
    }

    public long getPendingEnquiries() {
        return pendingEnquiries;
    }

    public void setPendingEnquiries(long pendingEnquiries) {
        this.pendingEnquiries = pendingEnquiries;
    }

    public long getContactedEnquiries() {
        return contactedEnquiries;
    }

    public void setContactedEnquiries(long contactedEnquiries) {
        this.contactedEnquiries = contactedEnquiries;
    }

    public long getInProgressEnquiries() {
        return inProgressEnquiries;
    }

    public void setInProgressEnquiries(long inProgressEnquiries) {
        this.inProgressEnquiries = inProgressEnquiries;
    }

    public long getResolvedEnquiries() {
        return resolvedEnquiries;
    }

    public void setResolvedEnquiries(long resolvedEnquiries) {
        this.resolvedEnquiries = resolvedEnquiries;
    }

    public List<EnquiryResponse> getRecentEnquiries() {
        return recentEnquiries;
    }

    public void setRecentEnquiries(List<EnquiryResponse> recentEnquiries) {
        this.recentEnquiries = recentEnquiries;
    }

    public List<PropertyResponse> getRecentProperties() {
        return recentProperties;
    }

    public void setRecentProperties(List<PropertyResponse> recentProperties) {
        this.recentProperties = recentProperties;
    }

    public long getTotalProjects() {
        return totalProjects;
    }

    public void setTotalProjects(long totalProjects) {
        this.totalProjects = totalProjects;
    }

    public long getPublishedProjects() {
        return publishedProjects;
    }

    public void setPublishedProjects(long publishedProjects) {
        this.publishedProjects = publishedProjects;
    }

    public long getDraftProjects() {
        return draftProjects;
    }

    public void setDraftProjects(long draftProjects) {
        this.draftProjects = draftProjects;
    }

    public List<ProjectSummaryResponse> getRecentProjects() {
        return recentProjects;
    }

    public void setRecentProjects(List<ProjectSummaryResponse> recentProjects) {
        this.recentProjects = recentProjects;
    }
}
