package com.keystone.service;

import com.keystone.dto.request.*;
import com.keystone.dto.response.*;
import com.keystone.entity.*;
import com.keystone.exception.BadRequestException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.ProjectMapper;
import com.keystone.mapper.PropertyMapper;
import com.keystone.repository.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectImageRepository projectImageRepository;
    private final ProjectDocumentRepository projectDocumentRepository;
    private final ProjectConfigurationRepository projectConfigurationRepository;
    private final ProjectAmenityRepository projectAmenityRepository;
    private final ProjectSpecificationRepository projectSpecificationRepository;
    private final ProjectHighlightRepository projectHighlightRepository;
    private final ProjectFloorPlanRepository projectFloorPlanRepository;
    private final ProjectVideoRepository projectVideoRepository;
    private final ProjectMapper projectMapper;
    private final PropertyMapper propertyMapper;
    private final FileStorageService fileStorageService;

    public ProjectService(
            ProjectRepository projectRepository,
            ProjectImageRepository projectImageRepository,
            ProjectDocumentRepository projectDocumentRepository,
            ProjectConfigurationRepository projectConfigurationRepository,
            ProjectAmenityRepository projectAmenityRepository,
            ProjectSpecificationRepository projectSpecificationRepository,
            ProjectHighlightRepository projectHighlightRepository,
            ProjectFloorPlanRepository projectFloorPlanRepository,
            ProjectVideoRepository projectVideoRepository,
            ProjectMapper projectMapper,
            PropertyMapper propertyMapper,
            FileStorageService fileStorageService) {
        this.projectRepository = projectRepository;
        this.projectImageRepository = projectImageRepository;
        this.projectDocumentRepository = projectDocumentRepository;
        this.projectConfigurationRepository = projectConfigurationRepository;
        this.projectAmenityRepository = projectAmenityRepository;
        this.projectSpecificationRepository = projectSpecificationRepository;
        this.projectHighlightRepository = projectHighlightRepository;
        this.projectFloorPlanRepository = projectFloorPlanRepository;
        this.projectVideoRepository = projectVideoRepository;
        this.projectMapper = projectMapper;
        this.propertyMapper = propertyMapper;
        this.fileStorageService = fileStorageService;
    }

    // ==========================================
    // PUBLIC ACCESS METHODS
    // ==========================================

    @Transactional(readOnly = true)
    public PageResponse<ProjectSummaryResponse> searchPublishedProjects(ProjectSearchCriteria criteria) {
        // Enforce published status for public view
        criteria.setStatus(ProjectStatus.PUBLISHED);
        return executeSearch(criteria);
    }

    @Transactional(readOnly = true)
    public List<ProjectSummaryResponse> getFeaturedProjects() {
        return projectRepository.findTop6ByStatusAndIsFeaturedTrueOrderByCreatedAtDesc(ProjectStatus.PUBLISHED)
                .stream()
                .map(projectMapper::toSummaryResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getPublishedProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        if (project.getStatus() != ProjectStatus.PUBLISHED) {
            throw new ResourceNotFoundException("Project", "id", id);
        }

        return projectMapper.toDetailResponse(project, true, propertyMapper);
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getPublishedProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "slug", slug));

        if (project.getStatus() != ProjectStatus.PUBLISHED) {
            throw new ResourceNotFoundException("Project", "slug", slug);
        }

        return projectMapper.toDetailResponse(project, true, propertyMapper);
    }

    // ==========================================
    // ADMIN ACCESS METHODS
    // ==========================================

    @Transactional(readOnly = true)
    public PageResponse<ProjectSummaryResponse> adminSearchProjects(ProjectSearchCriteria criteria) {
        return executeSearch(criteria);
    }

    @Transactional(readOnly = true)
    public ProjectDetailResponse getAdminProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return projectMapper.toDetailResponse(project, false, propertyMapper);
    }

    @Transactional
    public ProjectDetailResponse createProject(ProjectRequest request, String createdBy) {
        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = projectMapper.generateSlug(request.getName());
        } else {
            slug = projectMapper.generateSlug(slug);
        }

        // Ensure unique slug
        String uniqueSlug = slug;
        int counter = 1;
        while (projectRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = slug + "-" + counter++;
        }
        request.setSlug(uniqueSlug);

        Project project = projectMapper.toEntity(request, createdBy);
        Project saved = projectRepository.save(project);
        return projectMapper.toDetailResponse(saved, false, propertyMapper);
    }

    @Transactional
    public ProjectDetailResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        if (request.getSlug() != null && !request.getSlug().trim().isEmpty()) {
            String newSlug = projectMapper.generateSlug(request.getSlug());
            if (projectRepository.existsBySlugAndIdNot(newSlug, id)) {
                throw new BadRequestException("Project with slug '" + newSlug + "' already exists.");
            }
            project.setSlug(newSlug);
        }

        projectMapper.updateEntityFromRequest(project, request);
        Project updated = projectRepository.save(project);
        return projectMapper.toDetailResponse(updated, false, propertyMapper);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        // Delete physical files
        if (project.getImages() != null) {
            for (ProjectImage img : project.getImages()) {
                fileStorageService.deleteFile(img.getImageUrl());
            }
        }
        if (project.getDocuments() != null) {
            for (ProjectDocument doc : project.getDocuments()) {
                fileStorageService.deleteFile(doc.getFileUrl());
            }
        }
        if (project.getFloorPlans() != null) {
            for (ProjectFloorPlan fp : project.getFloorPlans()) {
                if (fp.getImageUrl() != null) fileStorageService.deleteFile(fp.getImageUrl());
                if (fp.getDocumentUrl() != null) fileStorageService.deleteFile(fp.getDocumentUrl());
            }
        }

        projectRepository.delete(project);
    }

    @Transactional
    public ProjectSummaryResponse updateProjectStatus(Long id, ProjectStatus status) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        project.setStatus(status);
        Project saved = projectRepository.save(project);
        return projectMapper.toSummaryResponse(saved);
    }

    // ==========================================
    // MEDIA & GALLERY MANAGEMENT
    // ==========================================

    @Transactional
    public List<ProjectImageResponse> uploadProjectImages(Long projectId, MultipartFile[] files, ProjectImageType imageType, Boolean setFirstAsCover) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        List<ProjectImageResponse> uploadedImages = new ArrayList<>();
        boolean isFirst = Boolean.TRUE.equals(setFirstAsCover);

        for (MultipartFile file : files) {
            if (file.isEmpty()) continue;
            String fileUrl = fileStorageService.storeFile(file, "projects");

            ProjectImage image = new ProjectImage();
            image.setProject(project);
            image.setImageUrl(fileUrl);
            image.setImageType(imageType != null ? imageType : ProjectImageType.GALLERY);
            image.setIsCover(isFirst);
            image.setDisplayOrder(project.getImages().size());

            if (isFirst) {
                // If set as cover, update project coverImageUrl
                project.setCoverImageUrl(fileUrl);
                // Unset any previous cover
                for (ProjectImage existing : project.getImages()) {
                    existing.setIsCover(false);
                }
                isFirst = false;
            }

            ProjectImage savedImage = projectImageRepository.save(image);
            project.addImage(savedImage);
            uploadedImages.add(projectMapper.toImageResponse(savedImage));
        }

        projectRepository.save(project);
        return uploadedImages;
    }

    @Transactional
    public void deleteProjectImage(Long imageId) {
        ProjectImage image = projectImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectImage", "id", imageId));

        fileStorageService.deleteFile(image.getImageUrl());

        Project project = image.getProject();
        if (project != null) {
            project.removeImage(image);
            if (Boolean.TRUE.equals(image.getIsCover()) || image.getImageUrl().equals(project.getCoverImageUrl())) {
                project.setCoverImageUrl(null);
            }
        }
        projectImageRepository.delete(image);
    }

    @Transactional
    public void setProjectCoverImage(Long projectId, Long imageId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectImage targetImage = projectImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectImage", "id", imageId));

        if (!targetImage.getProject().getId().equals(projectId)) {
            throw new BadRequestException("Image does not belong to this project.");
        }

        for (ProjectImage img : project.getImages()) {
            img.setIsCover(img.getId().equals(imageId));
        }
        project.setCoverImageUrl(targetImage.getImageUrl());
        projectRepository.save(project);
    }

    // ==========================================
    // DOCUMENT VAULT MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectDocumentResponse uploadProjectDocument(
            Long projectId,
            MultipartFile file,
            String documentName,
            ProjectDocumentType documentType,
            Boolean isPublic) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        if (file.isEmpty()) {
            throw new BadRequestException("File cannot be empty.");
        }

        String fileUrl = fileStorageService.storeFile(file, "documents");

        ProjectDocument doc = new ProjectDocument();
        doc.setProject(project);
        doc.setDocumentName(StringUtils.hasText(documentName) ? documentName : file.getOriginalFilename());
        doc.setDocumentType(documentType != null ? documentType : ProjectDocumentType.BROCHURE);
        doc.setFileUrl(fileUrl);
        doc.setFileSize(file.getSize());
        doc.setIsPublic(isPublic != null ? isPublic : true);

        ProjectDocument saved = projectDocumentRepository.save(doc);
        project.addDocument(saved);
        return projectMapper.toDocumentResponse(saved);
    }

    @Transactional
    public void deleteProjectDocument(Long documentId) {
        ProjectDocument doc = projectDocumentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectDocument", "id", documentId));

        fileStorageService.deleteFile(doc.getFileUrl());
        Project project = doc.getProject();
        if (project != null) {
            project.removeDocument(doc);
        }
        projectDocumentRepository.delete(doc);
    }

    // ==========================================
    // CONFIGURATIONS MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectConfigurationResponse addConfiguration(Long projectId, ProjectConfigurationRequest req) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectConfiguration config = new ProjectConfiguration();
        config.setProject(project);
        config.setName(req.getName());
        config.setBedrooms(req.getBedrooms());
        config.setBathrooms(req.getBathrooms());
        config.setArea(req.getArea());
        config.setAreaUnit(req.getAreaUnit() != null ? req.getAreaUnit() : AreaUnit.SQFT);
        config.setPrice(req.getPrice());
        config.setAvailabilityStatus(req.getAvailabilityStatus());
        config.setDescription(req.getDescription());
        config.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getConfigurations().size());

        ProjectConfiguration saved = projectConfigurationRepository.save(config);
        project.addConfiguration(saved);
        return projectMapper.toConfigResponse(saved);
    }

    @Transactional
    public ProjectConfigurationResponse updateConfiguration(Long configId, ProjectConfigurationRequest req) {
        ProjectConfiguration config = projectConfigurationRepository.findById(configId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectConfiguration", "id", configId));

        config.setName(req.getName());
        config.setBedrooms(req.getBedrooms());
        config.setBathrooms(req.getBathrooms());
        config.setArea(req.getArea());
        if (req.getAreaUnit() != null) config.setAreaUnit(req.getAreaUnit());
        config.setPrice(req.getPrice());
        config.setAvailabilityStatus(req.getAvailabilityStatus());
        config.setDescription(req.getDescription());
        if (req.getDisplayOrder() != null) config.setDisplayOrder(req.getDisplayOrder());

        ProjectConfiguration updated = projectConfigurationRepository.save(config);
        return projectMapper.toConfigResponse(updated);
    }

    @Transactional
    public void deleteConfiguration(Long configId) {
        ProjectConfiguration config = projectConfigurationRepository.findById(configId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectConfiguration", "id", configId));
        Project project = config.getProject();
        if (project != null) {
            project.removeConfiguration(config);
        }
        projectConfigurationRepository.delete(config);
    }

    // ==========================================
    // AMENITIES MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectAmenityResponse addAmenity(Long projectId, ProjectAmenityRequest req) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectAmenity amenity = new ProjectAmenity();
        amenity.setProject(project);
        amenity.setName(req.getName());
        amenity.setCategory(req.getCategory() != null ? req.getCategory() : AmenityCategory.OTHER);
        amenity.setIconName(req.getIconName());
        amenity.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getAmenities().size());

        ProjectAmenity saved = projectAmenityRepository.save(amenity);
        project.addAmenity(saved);
        return projectMapper.toAmenityResponse(saved);
    }

    @Transactional
    public void deleteAmenity(Long amenityId) {
        ProjectAmenity amenity = projectAmenityRepository.findById(amenityId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectAmenity", "id", amenityId));
        Project project = amenity.getProject();
        if (project != null) {
            project.removeAmenity(amenity);
        }
        projectAmenityRepository.delete(amenity);
    }

    // ==========================================
    // SPECIFICATIONS MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectSpecificationResponse addSpecification(Long projectId, ProjectSpecificationRequest req) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectSpecification spec = new ProjectSpecification();
        spec.setProject(project);
        spec.setCategory(req.getCategory() != null ? req.getCategory() : SpecificationCategory.OTHER);
        spec.setTitle(req.getTitle());
        spec.setDetails(req.getDetails());
        spec.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getSpecifications().size());

        ProjectSpecification saved = projectSpecificationRepository.save(spec);
        project.addSpecification(saved);
        return projectMapper.toSpecResponse(saved);
    }

    @Transactional
    public void deleteSpecification(Long specId) {
        ProjectSpecification spec = projectSpecificationRepository.findById(specId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectSpecification", "id", specId));
        Project project = spec.getProject();
        if (project != null) {
            project.removeSpecification(spec);
        }
        projectSpecificationRepository.delete(spec);
    }

    // ==========================================
    // HIGHLIGHTS MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectHighlightResponse addHighlight(Long projectId, ProjectHighlightRequest req) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectHighlight hl = new ProjectHighlight();
        hl.setProject(project);
        hl.setTitle(req.getTitle());
        hl.setDescription(req.getDescription());
        hl.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getHighlights().size());

        ProjectHighlight saved = projectHighlightRepository.save(hl);
        project.addHighlight(saved);
        return projectMapper.toHighlightResponse(saved);
    }

    @Transactional
    public void deleteHighlight(Long highlightId) {
        ProjectHighlight hl = projectHighlightRepository.findById(highlightId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectHighlight", "id", highlightId));
        Project project = hl.getProject();
        if (project != null) {
            project.removeHighlight(hl);
        }
        projectHighlightRepository.delete(hl);
    }

    // ==========================================
    // FLOOR PLANS MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectFloorPlanResponse addFloorPlan(Long projectId, ProjectFloorPlanRequest req, MultipartFile imageFile) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectFloorPlan fp = new ProjectFloorPlan();
        fp.setProject(project);
        fp.setTitle(req.getTitle());
        fp.setConfigurationName(req.getConfigurationName());
        fp.setArea(req.getArea());
        fp.setAreaUnit(req.getAreaUnit() != null ? req.getAreaUnit() : AreaUnit.SQFT);
        fp.setDescription(req.getDescription());
        fp.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getFloorPlans().size());

        if (imageFile != null && !imageFile.isEmpty()) {
            String url = fileStorageService.storeFile(imageFile, "projects");
            fp.setImageUrl(url);
        } else if (req.getImageUrl() != null) {
            fp.setImageUrl(req.getImageUrl());
        }

        fp.setDocumentUrl(req.getDocumentUrl());

        ProjectFloorPlan saved = projectFloorPlanRepository.save(fp);
        project.addFloorPlan(saved);
        return projectMapper.toFloorPlanResponse(saved);
    }

    @Transactional
    public void deleteFloorPlan(Long floorPlanId) {
        ProjectFloorPlan fp = projectFloorPlanRepository.findById(floorPlanId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectFloorPlan", "id", floorPlanId));

        if (fp.getImageUrl() != null) fileStorageService.deleteFile(fp.getImageUrl());
        if (fp.getDocumentUrl() != null) fileStorageService.deleteFile(fp.getDocumentUrl());

        Project project = fp.getProject();
        if (project != null) {
            project.removeFloorPlan(fp);
        }
        projectFloorPlanRepository.delete(fp);
    }

    // ==========================================
    // VIDEOS MANAGEMENT
    // ==========================================

    @Transactional
    public ProjectVideoResponse addVideo(Long projectId, ProjectVideoRequest req) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        ProjectVideo video = new ProjectVideo();
        video.setProject(project);
        video.setTitle(req.getTitle());
        video.setVideoUrl(req.getVideoUrl());
        video.setVideoType(req.getVideoType() != null ? req.getVideoType() : VideoType.YOUTUBE);
        video.setDisplayOrder(req.getDisplayOrder() != null ? req.getDisplayOrder() : project.getVideos().size());

        ProjectVideo saved = projectVideoRepository.save(video);
        project.addVideo(saved);
        return projectMapper.toVideoResponse(saved);
    }

    @Transactional
    public void deleteVideo(Long videoId) {
        ProjectVideo video = projectVideoRepository.findById(videoId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectVideo", "id", videoId));
        Project project = video.getProject();
        if (project != null) {
            project.removeVideo(video);
        }
        projectVideoRepository.delete(video);
    }

    // ==========================================
    // SEARCH SPECIFICATION BUILDER
    // ==========================================

    private PageResponse<ProjectSummaryResponse> executeSearch(ProjectSearchCriteria criteria) {
        Sort sort = criteria.getSortDirection().equalsIgnoreCase("asc")
                ? Sort.by(criteria.getSortBy()).ascending()
                : Sort.by(criteria.getSortBy()).descending();

        Pageable pageable = PageRequest.of(criteria.getPage(), criteria.getSize(), sort);
        Specification<Project> spec = createSearchSpecification(criteria);

        Page<Project> projectPage = projectRepository.findAll(spec, pageable);
        List<ProjectSummaryResponse> content = projectPage.getContent().stream()
                .map(projectMapper::toSummaryResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(content, projectPage);
    }

    private Specification<Project> createSearchSpecification(ProjectSearchCriteria criteria) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), criteria.getStatus()));
            }

            if (StringUtils.hasText(criteria.getQuery())) {
                String q = "%" + criteria.getQuery().toLowerCase() + "%";
                Predicate namePred = cb.like(cb.lower(root.get("name")), q);
                Predicate descPred = cb.like(cb.lower(root.get("shortDescription")), q);
                Predicate builderPred = cb.like(cb.lower(root.get("builderName")), q);
                Predicate reraPred = cb.like(cb.lower(root.get("reraNumber")), q);
                Predicate cityPred = cb.like(cb.lower(root.get("city")), q);
                Predicate locPred = cb.like(cb.lower(root.get("locality")), q);
                predicates.add(cb.or(namePred, descPred, builderPred, reraPred, cityPred, locPred));
            }

            if (StringUtils.hasText(criteria.getCity())) {
                predicates.add(cb.equal(cb.lower(root.get("city")), criteria.getCity().toLowerCase()));
            }

            if (StringUtils.hasText(criteria.getLocality())) {
                predicates.add(cb.like(cb.lower(root.get("locality")), "%" + criteria.getLocality().toLowerCase() + "%"));
            }

            if (criteria.getProjectType() != null) {
                predicates.add(cb.equal(root.get("projectType"), criteria.getProjectType()));
            }

            if (criteria.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("minPrice"), criteria.getMinPrice()));
            }

            if (criteria.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("maxPrice"), criteria.getMaxPrice()));
            }

            if (criteria.getIsFeatured() != null) {
                predicates.add(cb.equal(root.get("isFeatured"), criteria.getIsFeatured()));
            }

            if (criteria.getBedrooms() != null) {
                Join<Project, ProjectConfiguration> configJoin = root.join("configurations", JoinType.INNER);
                predicates.add(cb.greaterThanOrEqualTo(configJoin.get("bedrooms"), criteria.getBedrooms()));
                query.distinct(true);
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
