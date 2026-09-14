package com.keystone.controller;

import com.keystone.dto.request.StatusUpdateRequest;
import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.DashboardStatsResponse;
import com.keystone.dto.response.EnquiryResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.UserSummaryResponse;
import com.keystone.entity.EnquiryStatus;
import com.keystone.entity.UserStatus;
import com.keystone.service.AdminService;
import com.keystone.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final EnquiryService enquiryService;

    public AdminController(AdminService adminService, EnquiryService enquiryService) {
        this.adminService = adminService;
        this.enquiryService = enquiryService;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        DashboardStatsResponse stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success("Dashboard metrics retrieved successfully", stats));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<PageResponse<UserSummaryResponse>>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size) {

        PageResponse<UserSummaryResponse> users = adminService.getAllUsers(page, size);
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }

    @PatchMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> updateUserStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        UserStatus status = UserStatus.valueOf(request.getStatus().toUpperCase());
        UserSummaryResponse response = adminService.updateUserStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", response));
    }

    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<PageResponse<EnquiryResponse>>> getAllEnquiries(
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size) {

        PageResponse<EnquiryResponse> enquiries = enquiryService.getAllEnquiries(status, page, size);
        return ResponseEntity.ok(ApiResponse.success("Enquiries retrieved successfully", enquiries));
    }

    @PatchMapping("/enquiries/{id}/status")
    public ResponseEntity<ApiResponse<EnquiryResponse>> updateEnquiryStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        EnquiryStatus status = EnquiryStatus.valueOf(request.getStatus().toUpperCase());
        EnquiryResponse response = enquiryService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Enquiry status updated successfully", response));
    }

    @DeleteMapping("/enquiries/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Enquiry deleted successfully"));
    }
}
