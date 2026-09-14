package com.keystone.controller;

import com.keystone.dto.request.ProjectSearchCriteria;
import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.ProjectDetailResponse;
import com.keystone.dto.response.ProjectSummaryResponse;
import com.keystone.entity.ProjectType;
import com.keystone.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProjectSummaryResponse>>> searchProjects(
            @ModelAttribute ProjectSearchCriteria criteria,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        criteria.setPage(page);
        criteria.setSize(size);
        PageResponse<ProjectSummaryResponse> result = projectService.searchPublishedProjects(criteria);
        return ResponseEntity.ok(ApiResponse.success("Projects retrieved successfully", result));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProjectSummaryResponse>>> getFeaturedProjects() {
        List<ProjectSummaryResponse> result = projectService.getFeaturedProjects();
        return ResponseEntity.ok(ApiResponse.success("Featured projects retrieved successfully", result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> getProjectById(@PathVariable Long id) {
        ProjectDetailResponse result = projectService.getPublishedProjectById(id);
        return ResponseEntity.ok(ApiResponse.success("Project details retrieved successfully", result));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ProjectDetailResponse>> getProjectBySlug(@PathVariable String slug) {
        ProjectDetailResponse result = projectService.getPublishedProjectBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success("Project details retrieved successfully", result));
    }
}
