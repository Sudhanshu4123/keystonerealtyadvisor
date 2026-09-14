package com.keystone.controller;

import com.keystone.dto.request.EnquiryRequest;
import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.EnquiryResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.security.UserPrincipal;
import com.keystone.service.EnquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EnquiryResponse>> createEnquiry(
            @Valid @RequestBody EnquiryRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Long currentUserId = userPrincipal != null ? userPrincipal.getId() : null;
        EnquiryResponse response = enquiryService.createEnquiry(request, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Enquiry submitted successfully. A Keystone Realty advisor will contact you shortly.", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<PageResponse<EnquiryResponse>>> getUserEnquiries(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        PageResponse<EnquiryResponse> response = enquiryService.getUserEnquiries(userPrincipal.getId(), page, size);
        return ResponseEntity.ok(ApiResponse.success("Enquiries retrieved successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnquiryResponse>> getEnquiryById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        boolean isAdmin = userPrincipal != null && userPrincipal.getRole() == com.keystone.entity.Role.ROLE_ADMIN;
        Long currentUserId = userPrincipal != null ? userPrincipal.getId() : null;
        EnquiryResponse response = enquiryService.getEnquiryById(id, currentUserId, isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Enquiry details retrieved successfully", response));
    }
}
