package com.keystone.controller;

import com.keystone.dto.request.*;
import com.keystone.dto.response.*;
import com.keystone.entity.ProjectDocumentType;
import com.keystone.entity.ProjectImageType;
import com.keystone.entity.ProjectStatus;
import com.keystone.entity.ProjectType;
import com.keystone.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/admin/projects")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminProjectController {

    private final ProjectService projectService;

    public AdminProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProjectSummaryResponse>>> getAdminProjects(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String locality,
            @RequestParam(required = false) ProjectType projectType,
            @RequestParam(required = false) ProjectStatus status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean isFeatured,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size) {

        ProjectSearchCriteria criteria = new ProjectSearchCriteria();
        criteria.setQuery(query);
        criteria.setCity(city);
        criteria.setLocality(locality);
        criteria.setProjectType(projectType);
        criteria.setStatus(status);
        criteria.setMinPrice(minPrice);
        criteria.setMaxPrice(maxPrice);
        criteria.setIsFeatured(isFeatured);
        criteria.setSortBy(sortBy);
        criteria.setSortDirection(sortDirection);
        criteria.setPage(page);
        criteria.setSize(size);

        PageResponse<ProjectSummaryResponse> result = projectService.adminSearchProjects(criteria);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> getAdminProjectById(@PathVariable Long id) {
        ProjectDetailResponse result = projectService.getAdminProjectById(id);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> createProject(
            @Valid @RequestBody ProjectRequest request,
            Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "admin";
        ProjectDetailResponse result = projectService.createProject(request, username);
        return new ResponseEntity<>(ApiResponse.success("Project created successfully", result), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody ProjectRequest request) {
        ProjectDetailResponse result = projectService.updateProject(id, request);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<ProjectSummaryResponse>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody ProjectStatusRequest request) {
        ProjectSummaryResponse result = projectService.updateProjectStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.success("Project status updated to " + request.getStatus(), result));
    }

    // ==========================================
    // IMAGES & COVER MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/images")
    public ResponseEntity<ApiResponse<List<ProjectImageResponse>>> uploadImages(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files,
            @RequestParam(required = false, defaultValue = "GALLERY") ProjectImageType imageType,
            @RequestParam(required = false, defaultValue = "false") Boolean setFirstAsCover) {
        List<ProjectImageResponse> result = projectService.uploadProjectImages(id, files, imageType, setFirstAsCover);
        return ResponseEntity.ok(ApiResponse.success("Images uploaded successfully", result));
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<ApiResponse<Void>> deleteImage(@PathVariable Long imageId) {
        projectService.deleteProjectImage(imageId);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully", null));
    }

    @PatchMapping("/{id}/cover/{imageId}")
    public ResponseEntity<ApiResponse<Void>> setCoverImage(
            @PathVariable Long id,
            @PathVariable Long imageId) {
        projectService.setProjectCoverImage(id, imageId);
        return ResponseEntity.ok(ApiResponse.success("Cover image updated successfully", null));
    }

    // ==========================================
    // DOCUMENT VAULT MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/documents")
    public ResponseEntity<ApiResponse<ProjectDocumentResponse>> uploadDocument(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String documentName,
            @RequestParam(required = false, defaultValue = "BROCHURE") ProjectDocumentType documentType,
            @RequestParam(required = false, defaultValue = "true") Boolean isPublic) {
        ProjectDocumentResponse result = projectService.uploadProjectDocument(id, file, documentName, documentType, isPublic);
        return ResponseEntity.ok(ApiResponse.success("Document uploaded successfully", result));
    }

    @DeleteMapping("/documents/{documentId}")
    public ResponseEntity<ApiResponse<Void>> deleteDocument(@PathVariable Long documentId) {
        projectService.deleteProjectDocument(documentId);
        return ResponseEntity.ok(ApiResponse.success("Document deleted successfully", null));
    }

    // ==========================================
    // CONFIGURATIONS MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/configurations")
    public ResponseEntity<ApiResponse<ProjectConfigurationResponse>> addConfiguration(
            @PathVariable Long id,
            @Valid @RequestBody ProjectConfigurationRequest request) {
        ProjectConfigurationResponse result = projectService.addConfiguration(id, request);
        return new ResponseEntity<>(ApiResponse.success("Configuration added successfully", result), HttpStatus.CREATED);
    }

    @PutMapping("/configurations/{configId}")
    public ResponseEntity<ApiResponse<ProjectConfigurationResponse>> updateConfiguration(
            @PathVariable Long configId,
            @Valid @RequestBody ProjectConfigurationRequest request) {
        ProjectConfigurationResponse result = projectService.updateConfiguration(configId, request);
        return ResponseEntity.ok(ApiResponse.success("Configuration updated successfully", result));
    }

    @DeleteMapping("/configurations/{configId}")
    public ResponseEntity<ApiResponse<Void>> deleteConfiguration(@PathVariable Long configId) {
        projectService.deleteConfiguration(configId);
        return ResponseEntity.ok(ApiResponse.success("Configuration deleted successfully", null));
    }

    // ==========================================
    // AMENITIES MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/amenities")
    public ResponseEntity<ApiResponse<ProjectAmenityResponse>> addAmenity(
            @PathVariable Long id,
            @Valid @RequestBody ProjectAmenityRequest request) {
        ProjectAmenityResponse result = projectService.addAmenity(id, request);
        return new ResponseEntity<>(ApiResponse.success("Amenity added successfully", result), HttpStatus.CREATED);
    }

    @DeleteMapping("/amenities/{amenityId}")
    public ResponseEntity<ApiResponse<Void>> deleteAmenity(@PathVariable Long amenityId) {
        projectService.deleteAmenity(amenityId);
        return ResponseEntity.ok(ApiResponse.success("Amenity deleted successfully", null));
    }

    // ==========================================
    // SPECIFICATIONS MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/specifications")
    public ResponseEntity<ApiResponse<ProjectSpecificationResponse>> addSpecification(
            @PathVariable Long id,
            @Valid @RequestBody ProjectSpecificationRequest request) {
        ProjectSpecificationResponse result = projectService.addSpecification(id, request);
        return new ResponseEntity<>(ApiResponse.success("Specification added successfully", result), HttpStatus.CREATED);
    }

    @DeleteMapping("/specifications/{specId}")
    public ResponseEntity<ApiResponse<Void>> deleteSpecification(@PathVariable Long specId) {
        projectService.deleteSpecification(specId);
        return ResponseEntity.ok(ApiResponse.success("Specification deleted successfully", null));
    }

    // ==========================================
    // HIGHLIGHTS MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/highlights")
    public ResponseEntity<ApiResponse<ProjectHighlightResponse>> addHighlight(
            @PathVariable Long id,
            @Valid @RequestBody ProjectHighlightRequest request) {
        ProjectHighlightResponse result = projectService.addHighlight(id, request);
        return new ResponseEntity<>(ApiResponse.success("Highlight added successfully", result), HttpStatus.CREATED);
    }

    @DeleteMapping("/highlights/{highlightId}")
    public ResponseEntity<ApiResponse<Void>> deleteHighlight(@PathVariable Long highlightId) {
        projectService.deleteHighlight(highlightId);
        return ResponseEntity.ok(ApiResponse.success("Highlight deleted successfully", null));
    }

    // ==========================================
    // FLOOR PLANS MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/floor-plans")
    public ResponseEntity<ApiResponse<ProjectFloorPlanResponse>> addFloorPlan(
            @PathVariable Long id,
            @RequestPart("data") ProjectFloorPlanRequest request,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        ProjectFloorPlanResponse result = projectService.addFloorPlan(id, request, imageFile);
        return new ResponseEntity<>(ApiResponse.success("Floor plan added successfully", result), HttpStatus.CREATED);
    }

    @DeleteMapping("/floor-plans/{floorPlanId}")
    public ResponseEntity<ApiResponse<Void>> deleteFloorPlan(@PathVariable Long floorPlanId) {
        projectService.deleteFloorPlan(floorPlanId);
        return ResponseEntity.ok(ApiResponse.success("Floor plan deleted successfully", null));
    }

    // ==========================================
    // VIDEOS MANAGEMENT
    // ==========================================

    @PostMapping("/{id}/videos")
    public ResponseEntity<ApiResponse<ProjectVideoResponse>> addVideo(
            @PathVariable Long id,
            @Valid @RequestBody ProjectVideoRequest request) {
        ProjectVideoResponse result = projectService.addVideo(id, request);
        return new ResponseEntity<>(ApiResponse.success("Video added successfully", result), HttpStatus.CREATED);
    }

    @DeleteMapping("/videos/{videoId}")
    public ResponseEntity<ApiResponse<Void>> deleteVideo(@PathVariable Long videoId) {
        projectService.deleteVideo(videoId);
        return ResponseEntity.ok(ApiResponse.success("Video deleted successfully", null));
    }
}
