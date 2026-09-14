package com.keystone.mapper;

import com.keystone.dto.request.ProjectRequest;
import com.keystone.dto.response.*;
import com.keystone.entity.*;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public String generateSlug(String input) {
        if (input == null) return "";
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH).replaceAll("-+", "-").replaceAll("^-|-$", "");
    }

    public Project toEntity(ProjectRequest request, String createdBy) {
        Project project = new Project();
        project.setName(request.getName());
        
        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(request.getName());
        }
        project.setSlug(slug);

        project.setProjectType(request.getProjectType());
        project.setStatus(request.getStatus() != null ? request.getStatus() : ProjectStatus.DRAFT);
        project.setShortDescription(request.getShortDescription());
        project.setDescription(request.getDescription());
        project.setBuilderName(request.getBuilderName());
        project.setReraNumber(request.getReraNumber());
        project.setPossessionDate(request.getPossessionDate());
        project.setLaunchDate(request.getLaunchDate());

        // Location
        project.setAddress(request.getAddress());
        project.setLocality(request.getLocality());
        project.setCity(request.getCity());
        project.setState(request.getState());
        project.setCountry(request.getCountry() != null ? request.getCountry() : "India");
        project.setPincode(request.getPincode());
        project.setLatitude(request.getLatitude());
        project.setLongitude(request.getLongitude());
        project.setMapUrl(request.getMapUrl());

        // Pricing
        project.setMinPrice(request.getMinPrice());
        project.setMaxPrice(request.getMaxPrice());
        project.setPricePerSqft(request.getPricePerSqft());
        project.setPriceType(request.getPriceType());
        project.setMaintenanceCharges(request.getMaintenanceCharges());
        project.setBookingAmount(request.getBookingAmount());

        // SEO & Media
        project.setCoverImageUrl(request.getCoverImageUrl());
        project.setSeoTitle(request.getSeoTitle());
        project.setSeoDescription(request.getSeoDescription());
        project.setIsFeatured(Boolean.TRUE.equals(request.getIsFeatured()));
        project.setCreatedBy(createdBy);

        return project;
    }

    public void updateEntityFromRequest(Project project, ProjectRequest request) {
        project.setName(request.getName());
        if (request.getSlug() != null && !request.getSlug().trim().isEmpty()) {
            project.setSlug(generateSlug(request.getSlug()));
        }
        if (request.getProjectType() != null) {
            project.setProjectType(request.getProjectType());
        }
        if (request.getStatus() != null) {
            project.setStatus(request.getStatus());
        }
        project.setShortDescription(request.getShortDescription());
        project.setDescription(request.getDescription());
        project.setBuilderName(request.getBuilderName());
        project.setReraNumber(request.getReraNumber());
        project.setPossessionDate(request.getPossessionDate());
        project.setLaunchDate(request.getLaunchDate());

        // Location
        project.setAddress(request.getAddress());
        project.setLocality(request.getLocality());
        project.setCity(request.getCity());
        project.setState(request.getState());
        if (request.getCountry() != null) {
            project.setCountry(request.getCountry());
        }
        project.setPincode(request.getPincode());
        project.setLatitude(request.getLatitude());
        project.setLongitude(request.getLongitude());
        project.setMapUrl(request.getMapUrl());

        // Pricing
        project.setMinPrice(request.getMinPrice());
        project.setMaxPrice(request.getMaxPrice());
        project.setPricePerSqft(request.getPricePerSqft());
        project.setPriceType(request.getPriceType());
        project.setMaintenanceCharges(request.getMaintenanceCharges());
        project.setBookingAmount(request.getBookingAmount());

        // SEO & Media
        if (request.getCoverImageUrl() != null) {
            project.setCoverImageUrl(request.getCoverImageUrl());
        }
        project.setSeoTitle(request.getSeoTitle());
        project.setSeoDescription(request.getSeoDescription());
        if (request.getIsFeatured() != null) {
            project.setIsFeatured(request.getIsFeatured());
        }
    }

    public ProjectSummaryResponse toSummaryResponse(Project project) {
        ProjectSummaryResponse summary = new ProjectSummaryResponse();
        summary.setId(project.getId());
        summary.setName(project.getName());
        summary.setSlug(project.getSlug());
        summary.setProjectType(project.getProjectType());
        summary.setStatus(project.getStatus());
        summary.setShortDescription(project.getShortDescription());
        summary.setBuilderName(project.getBuilderName());
        summary.setReraNumber(project.getReraNumber());
        summary.setPossessionDate(project.getPossessionDate());
        summary.setLocality(project.getLocality());
        summary.setCity(project.getCity());
        summary.setState(project.getState());
        summary.setMinPrice(project.getMinPrice());
        summary.setMaxPrice(project.getMaxPrice());
        summary.setPricePerSqft(project.getPricePerSqft());
        summary.setPriceType(project.getPriceType());

        // Cover image resolution
        String cover = project.getCoverImageUrl();
        if ((cover == null || cover.trim().isEmpty()) && project.getImages() != null && !project.getImages().isEmpty()) {
            for (ProjectImage img : project.getImages()) {
                if (Boolean.TRUE.equals(img.getIsCover())) {
                    cover = img.getImageUrl();
                    break;
                }
            }
            if (cover == null && !project.getImages().isEmpty()) {
                cover = project.getImages().get(0).getImageUrl();
            }
        }
        summary.setCoverImageUrl(cover);
        summary.setIsFeatured(Boolean.TRUE.equals(project.getIsFeatured()));

        if (project.getConfigurations() != null) {
            summary.setTotalConfigurations(project.getConfigurations().size());
            summary.setConfigurationNames(
                project.getConfigurations().stream()
                    .map(ProjectConfiguration::getName)
                    .limit(5)
                    .collect(Collectors.toList())
            );
        } else {
            summary.setTotalConfigurations(0);
            summary.setConfigurationNames(new ArrayList<>());
        }

        summary.setTotalAmenities(project.getAmenities() != null ? project.getAmenities().size() : 0);
        summary.setCreatedAt(project.getCreatedAt());
        summary.setPublishedAt(project.getPublishedAt());

        return summary;
    }

    public ProjectDetailResponse toDetailResponse(Project project, boolean isPublicView, PropertyMapper propertyMapper) {
        ProjectDetailResponse detail = new ProjectDetailResponse();
        detail.setId(project.getId());
        detail.setName(project.getName());
        detail.setSlug(project.getSlug());
        detail.setProjectType(project.getProjectType());
        detail.setStatus(project.getStatus());
        detail.setShortDescription(project.getShortDescription());
        detail.setDescription(project.getDescription());
        detail.setBuilderName(project.getBuilderName());
        detail.setReraNumber(project.getReraNumber());
        detail.setPossessionDate(project.getPossessionDate());
        detail.setLaunchDate(project.getLaunchDate());

        // Location
        detail.setAddress(project.getAddress());
        detail.setLocality(project.getLocality());
        detail.setCity(project.getCity());
        detail.setState(project.getState());
        detail.setCountry(project.getCountry());
        detail.setPincode(project.getPincode());
        detail.setLatitude(project.getLatitude());
        detail.setLongitude(project.getLongitude());
        detail.setMapUrl(project.getMapUrl());

        // Pricing
        detail.setMinPrice(project.getMinPrice());
        detail.setMaxPrice(project.getMaxPrice());
        detail.setPricePerSqft(project.getPricePerSqft());
        detail.setPriceType(project.getPriceType());
        detail.setMaintenanceCharges(project.getMaintenanceCharges());
        detail.setBookingAmount(project.getBookingAmount());

        // Cover & SEO
        detail.setCoverImageUrl(project.getCoverImageUrl());
        detail.setSeoTitle(project.getSeoTitle());
        detail.setSeoDescription(project.getSeoDescription());
        detail.setIsFeatured(Boolean.TRUE.equals(project.getIsFeatured()));

        // Audit
        detail.setCreatedBy(project.getCreatedBy());
        detail.setCreatedAt(project.getCreatedAt());
        detail.setUpdatedAt(project.getUpdatedAt());
        detail.setPublishedAt(project.getPublishedAt());

        // Sub-entities
        if (project.getConfigurations() != null) {
            detail.setConfigurations(project.getConfigurations().stream().map(this::toConfigResponse).collect(Collectors.toList()));
        } else {
            detail.setConfigurations(new ArrayList<>());
        }

        if (project.getAmenities() != null) {
            detail.setAmenities(project.getAmenities().stream().map(this::toAmenityResponse).collect(Collectors.toList()));
        } else {
            detail.setAmenities(new ArrayList<>());
        }

        if (project.getSpecifications() != null) {
            detail.setSpecifications(project.getSpecifications().stream().map(this::toSpecResponse).collect(Collectors.toList()));
        } else {
            detail.setSpecifications(new ArrayList<>());
        }

        if (project.getHighlights() != null) {
            detail.setHighlights(project.getHighlights().stream().map(this::toHighlightResponse).collect(Collectors.toList()));
        } else {
            detail.setHighlights(new ArrayList<>());
        }

        if (project.getImages() != null) {
            detail.setImages(project.getImages().stream().map(this::toImageResponse).collect(Collectors.toList()));
        } else {
            detail.setImages(new ArrayList<>());
        }

        if (project.getFloorPlans() != null) {
            detail.setFloorPlans(project.getFloorPlans().stream().map(this::toFloorPlanResponse).collect(Collectors.toList()));
        } else {
            detail.setFloorPlans(new ArrayList<>());
        }

        if (project.getDocuments() != null) {
            detail.setDocuments(
                project.getDocuments().stream()
                    .filter(doc -> !isPublicView || Boolean.TRUE.equals(doc.getIsPublic()))
                    .map(this::toDocumentResponse)
                    .collect(Collectors.toList())
            );
        } else {
            detail.setDocuments(new ArrayList<>());
        }

        if (project.getVideos() != null) {
            detail.setVideos(project.getVideos().stream().map(this::toVideoResponse).collect(Collectors.toList()));
        } else {
            detail.setVideos(new ArrayList<>());
        }

        if (project.getProperties() != null && propertyMapper != null) {
            detail.setProperties(
                project.getProperties().stream()
                    .map(p -> propertyMapper.toResponse(p, false))
                    .collect(Collectors.toList())
            );
        } else {
            detail.setProperties(new ArrayList<>());
        }

        return detail;
    }

    public ProjectConfigurationResponse toConfigResponse(ProjectConfiguration config) {
        ProjectConfigurationResponse res = new ProjectConfigurationResponse();
        res.setId(config.getId());
        res.setName(config.getName());
        res.setBedrooms(config.getBedrooms());
        res.setBathrooms(config.getBathrooms());
        res.setArea(config.getArea());
        res.setAreaUnit(config.getAreaUnit());
        res.setPrice(config.getPrice());
        res.setAvailabilityStatus(config.getAvailabilityStatus());
        res.setDescription(config.getDescription());
        res.setDisplayOrder(config.getDisplayOrder());
        return res;
    }

    public ProjectAmenityResponse toAmenityResponse(ProjectAmenity amenity) {
        ProjectAmenityResponse res = new ProjectAmenityResponse();
        res.setId(amenity.getId());
        res.setName(amenity.getName());
        res.setCategory(amenity.getCategory());
        res.setIconName(amenity.getIconName());
        res.setDisplayOrder(amenity.getDisplayOrder());
        return res;
    }

    public ProjectSpecificationResponse toSpecResponse(ProjectSpecification spec) {
        ProjectSpecificationResponse res = new ProjectSpecificationResponse();
        res.setId(spec.getId());
        res.setCategory(spec.getCategory());
        res.setTitle(spec.getTitle());
        res.setDetails(spec.getDetails());
        res.setDisplayOrder(spec.getDisplayOrder());
        return res;
    }

    public ProjectHighlightResponse toHighlightResponse(ProjectHighlight hl) {
        ProjectHighlightResponse res = new ProjectHighlightResponse();
        res.setId(hl.getId());
        res.setTitle(hl.getTitle());
        res.setDescription(hl.getDescription());
        res.setDisplayOrder(hl.getDisplayOrder());
        return res;
    }

    public ProjectImageResponse toImageResponse(ProjectImage img) {
        ProjectImageResponse res = new ProjectImageResponse();
        res.setId(img.getId());
        res.setImageUrl(img.getImageUrl());
        res.setCaption(img.getCaption());
        res.setImageType(img.getImageType());
        res.setIsCover(img.getIsCover());
        res.setDisplayOrder(img.getDisplayOrder());
        return res;
    }

    public ProjectFloorPlanResponse toFloorPlanResponse(ProjectFloorPlan fp) {
        ProjectFloorPlanResponse res = new ProjectFloorPlanResponse();
        res.setId(fp.getId());
        res.setTitle(fp.getTitle());
        res.setConfigurationName(fp.getConfigurationName());
        res.setArea(fp.getArea());
        res.setAreaUnit(fp.getAreaUnit());
        res.setImageUrl(fp.getImageUrl());
        res.setDocumentUrl(fp.getDocumentUrl());
        res.setDescription(fp.getDescription());
        res.setDisplayOrder(fp.getDisplayOrder());
        return res;
    }

    public ProjectDocumentResponse toDocumentResponse(ProjectDocument doc) {
        ProjectDocumentResponse res = new ProjectDocumentResponse();
        res.setId(doc.getId());
        res.setDocumentName(doc.getDocumentName());
        res.setDocumentType(doc.getDocumentType());
        res.setFileUrl(doc.getFileUrl());
        res.setFileSize(doc.getFileSize());
        res.setIsPublic(doc.getIsPublic());
        res.setUploadDate(doc.getUploadDate());
        return res;
    }

    public ProjectVideoResponse toVideoResponse(ProjectVideo video) {
        ProjectVideoResponse res = new ProjectVideoResponse();
        res.setId(video.getId());
        res.setTitle(video.getTitle());
        res.setVideoUrl(video.getVideoUrl());
        res.setVideoType(video.getVideoType());
        res.setDisplayOrder(video.getDisplayOrder());
        return res;
    }
}
