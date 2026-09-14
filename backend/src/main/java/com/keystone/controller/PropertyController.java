package com.keystone.controller;

import com.keystone.dto.request.PropertyRequest;
import com.keystone.dto.request.PropertySearchCriteria;
import com.keystone.dto.request.StatusUpdateRequest;
import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.PropertyImageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.entity.PropertyStatus;
import com.keystone.security.UserPrincipal;
import com.keystone.service.PropertyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> searchProperties(
            @ModelAttribute PropertySearchCriteria criteria,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Long currentUserId = userPrincipal != null ? userPrincipal.getId() : null;
        PageResponse<PropertyResponse> result = propertyService.searchProperties(criteria, page, size, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Properties retrieved successfully", result));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<PropertyResponse>>> getFeaturedProperties(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Long currentUserId = userPrincipal != null ? userPrincipal.getId() : null;
        List<PropertyResponse> featured = propertyService.getFeaturedAvailableProperties(currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Featured properties retrieved successfully", featured));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PropertyResponse>> getPropertyById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        Long currentUserId = userPrincipal != null ? userPrincipal.getId() : null;
        PropertyResponse property = propertyService.getPropertyById(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Property retrieved successfully", property));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PropertyResponse>> createProperty(
            @Valid @RequestBody PropertyRequest request) {

        PropertyResponse created = propertyService.createProperty(request);
        return ResponseEntity.ok(ApiResponse.success("Property created successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PropertyResponse>> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyRequest request) {

        PropertyResponse updated = propertyService.updateProperty(id, request);
        return ResponseEntity.ok(ApiResponse.success("Property updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.ok(ApiResponse.success("Property deleted successfully"));
    }

    @PostMapping("/{id}/images")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<PropertyImageResponse>>> uploadImages(
            @PathVariable Long id,
            @RequestParam("files") List<MultipartFile> files) {

        List<PropertyImageResponse> uploaded = propertyService.uploadImages(id, files);
        return ResponseEntity.ok(ApiResponse.success("Images uploaded successfully", uploaded));
    }

    @DeleteMapping("/{id}/images/{imageId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteImage(
            @PathVariable Long id,
            @PathVariable Long imageId) {

        propertyService.deleteImage(id, imageId);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully"));
    }

    @PutMapping("/{id}/images/{imageId}/primary")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> setPrimaryImage(
            @PathVariable Long id,
            @PathVariable Long imageId) {

        propertyService.setPrimaryImage(id, imageId);
        return ResponseEntity.ok(ApiResponse.success("Primary image updated successfully"));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<PropertyResponse>> updatePropertyStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        PropertyStatus status = PropertyStatus.valueOf(request.getStatus().toUpperCase());
        PropertyResponse updated = propertyService.updateStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Property status updated successfully", updated));
    }
}
