package com.keystone.service;

import com.keystone.dto.request.PropertyRequest;
import com.keystone.dto.request.PropertySearchCriteria;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.PropertyImageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyImage;
import com.keystone.entity.PropertyStatus;
import com.keystone.exception.BadRequestException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.PropertyMapper;
import com.keystone.repository.FavoriteRepository;
import com.keystone.repository.PropertyImageRepository;
import com.keystone.repository.PropertyRepository;
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
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.keystone.entity.Project;
import com.keystone.repository.ProjectRepository;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final ProjectRepository projectRepository;
    private final PropertyImageRepository propertyImageRepository;
    private final FavoriteRepository favoriteRepository;
    private final FileStorageService fileStorageService;
    private final PropertyMapper propertyMapper;

    public PropertyService(PropertyRepository propertyRepository,
                           ProjectRepository projectRepository,
                           PropertyImageRepository propertyImageRepository,
                           FavoriteRepository favoriteRepository,
                           FileStorageService fileStorageService,
                           PropertyMapper propertyMapper) {
        this.propertyRepository = propertyRepository;
        this.projectRepository = projectRepository;
        this.propertyImageRepository = propertyImageRepository;
        this.favoriteRepository = favoriteRepository;
        this.fileStorageService = fileStorageService;
        this.propertyMapper = propertyMapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<PropertyResponse> searchProperties(PropertySearchCriteria criteria, int page, int size, Long currentUserId) {
        Sort sort = Sort.by(
                "ASC".equalsIgnoreCase(criteria.getSortDirection()) ? Sort.Direction.ASC : Sort.Direction.DESC,
                StringUtils.hasText(criteria.getSortBy()) ? criteria.getSortBy() : "createdAt"
        );

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Property> spec = createSearchSpecification(criteria);
        Page<Property> propertyPage = propertyRepository.findAll(spec, pageable);

        List<PropertyResponse> content = propertyPage.getContent().stream()
                .map(property -> {
                    boolean isFav = currentUserId != null && favoriteRepository.existsByUserIdAndPropertyId(currentUserId, property.getId());
                    return propertyMapper.toResponse(property, isFav);
                })
                .collect(Collectors.toList());

        return new PageResponse<>(content, propertyPage);
    }

    private Specification<Property> createSearchSpecification(PropertySearchCriteria criteria) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(criteria.getQuery())) {
                String q = "%" + criteria.getQuery().toLowerCase() + "%";
                Predicate titlePred = cb.like(cb.lower(root.get("title")), q);
                Predicate descPred = cb.like(cb.lower(root.get("description")), q);
                Predicate cityPred = cb.like(cb.lower(root.get("city")), q);
                Predicate locPred = cb.like(cb.lower(root.get("location")), q);
                predicates.add(cb.or(titlePred, descPred, cityPred, locPred));
            }

            if (StringUtils.hasText(criteria.getCity())) {
                String cityLower = criteria.getCity().toLowerCase().trim();
                if ("gurugram".equals(cityLower) || "gurgaon".equals(cityLower)) {
                    Predicate cityG1 = cb.like(cb.lower(root.get("city")), "%gurugram%");
                    Predicate cityG2 = cb.like(cb.lower(root.get("city")), "%gurgaon%");
                    Predicate locG1 = cb.like(cb.lower(root.get("location")), "%gurugram%");
                    Predicate locG2 = cb.like(cb.lower(root.get("location")), "%gurgaon%");
                    predicates.add(cb.or(cityG1, cityG2, locG1, locG2));
                } else if ("dwarka".equals(cityLower)) {
                    Predicate cityD = cb.like(cb.lower(root.get("city")), "%dwarka%");
                    Predicate locD = cb.like(cb.lower(root.get("location")), "%dwarka%");
                    predicates.add(cb.or(cityD, locD));
                } else {
                    predicates.add(cb.like(cb.lower(root.get("city")), "%" + cityLower + "%"));
                }
            }

            if (StringUtils.hasText(criteria.getLocation())) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + criteria.getLocation().toLowerCase().trim() + "%"));
            }

            if (criteria.getPropertyType() != null) {
                predicates.add(cb.equal(root.get("propertyType"), criteria.getPropertyType()));
            }

            if (criteria.getListingType() != null) {
                predicates.add(cb.equal(root.get("listingType"), criteria.getListingType()));
            }

            if (criteria.getStatus() != null) {
                predicates.add(cb.equal(root.get("status"), criteria.getStatus()));
            }

            if (criteria.getFurnished() != null) {
                predicates.add(cb.equal(root.get("furnished"), criteria.getFurnished()));
            }

            if (criteria.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), criteria.getMinPrice()));
            }

            if (criteria.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), criteria.getMaxPrice()));
            }

            if (criteria.getBedrooms() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("bedrooms"), criteria.getBedrooms()));
            }

            if (criteria.getBathrooms() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("bathrooms"), criteria.getBathrooms()));
            }

            if (criteria.getMinArea() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("area"), criteria.getMinArea()));
            }

            if (criteria.getMaxArea() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("area"), criteria.getMaxArea()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    @Transactional(readOnly = true)
    public PropertyResponse getPropertyById(Long id, Long currentUserId) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

        boolean isFav = currentUserId != null && favoriteRepository.existsByUserIdAndPropertyId(currentUserId, property.getId());
        return propertyMapper.toResponse(property, isFav);
    }

    @Transactional(readOnly = true)
    public PropertyResponse getPropertyByIdOrSlug(String identifier, Long currentUserId) {
        if (identifier == null || identifier.trim().isEmpty()) {
            throw new ResourceNotFoundException("Property identifier cannot be empty");
        }

        Property property = null;

        // 1. Try finding directly by slug
        property = propertyRepository.findBySlug(identifier.trim()).orElse(null);

        // 2. If not found and identifier is numeric, search by ID
        if (property == null) {
            try {
                Long id = Long.parseLong(identifier.trim());
                property = propertyRepository.findById(id).orElse(null);
            } catch (NumberFormatException ignored) {}
        }

        // 3. If still not found and identifier contains hyphens ending with ID (e.g. title-slug-25)
        if (property == null && identifier.contains("-")) {
            try {
                String[] parts = identifier.split("-");
                Long lastId = Long.parseLong(parts[parts.length - 1]);
                property = propertyRepository.findById(lastId).orElse(null);
            } catch (Exception ignored) {}
        }

        // 4. Try matching normalized/deduped slug or generated slug
        if (property == null) {
            String normIdentifier = normalizeSlug(identifier);
            String dedupIdentifier = dedupeSlugTokens(identifier);
            List<Property> all = propertyRepository.findAll();

            Property bestMatch = null;
            double bestScore = 0.0;

            for (Property p : all) {
                String pSlug = p.getSlug() != null ? p.getSlug() : "";
                String generated = propertyMapper.generateSlug(p.getTitle(), p.getLocation(), p.getCity(), p.getId());
                String pNormSlug = normalizeSlug(pSlug);
                String pDedupSlug = dedupeSlugTokens(pSlug);
                String genDedupSlug = dedupeSlugTokens(generated);

                boolean exactOrDedupMatch = identifier.equalsIgnoreCase(pSlug)
                        || identifier.equalsIgnoreCase(generated)
                        || (!dedupIdentifier.isEmpty() && dedupIdentifier.equalsIgnoreCase(pDedupSlug))
                        || (!dedupIdentifier.isEmpty() && dedupIdentifier.equalsIgnoreCase(genDedupSlug))
                        || (!normIdentifier.isEmpty() && normIdentifier.equalsIgnoreCase(pNormSlug));

                if (exactOrDedupMatch) {
                    property = p;
                    break;
                }

                // Calculate token overlap score for resilient fallback
                double score = calculateSlugSimilarity(identifier, p);
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = p;
                }
            }

            // If no exact match but high similarity found (>= 0.65 threshold)
            if (property == null && bestMatch != null && bestScore >= 0.65) {
                property = bestMatch;
            }
        }

        if (property == null) {
            throw new ResourceNotFoundException("Property not found with identifier: " + identifier);
        }

        boolean isFav = currentUserId != null && favoriteRepository.existsByUserIdAndPropertyId(currentUserId, property.getId());
        return propertyMapper.toResponse(property, isFav);
    }

    @Transactional(readOnly = true)
    public List<PropertyResponse> getFeaturedAvailableProperties(Long currentUserId) {
        List<Property> properties = propertyRepository.findTop6ByStatusOrderByCreatedAtDesc(PropertyStatus.AVAILABLE);
        if (properties.isEmpty()) {
            properties = propertyRepository.findAll(PageRequest.of(0, 6, Sort.by(Sort.Direction.DESC, "createdAt"))).getContent();
        }
        return properties.stream()
                .map(p -> {
                    boolean isFav = currentUserId != null && favoriteRepository.existsByUserIdAndPropertyId(currentUserId, p.getId());
                    return propertyMapper.toResponse(p, isFav);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public PropertyResponse createProperty(PropertyRequest request) {
        Property property = propertyMapper.toEntity(request);
        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + request.getProjectId()));
            property.setProject(project);
        }
        Property saved = propertyRepository.save(property);
        return propertyMapper.toResponse(saved, false);
    }

    @Transactional
    public PropertyResponse updateProperty(Long id, PropertyRequest request) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

        propertyMapper.updateEntityFromRequest(property, request);
        if (request.getProjectId() != null) {
            Project project = projectRepository.findById(request.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + request.getProjectId()));
            property.setProject(project);
        } else {
            property.setProject(null);
        }
        Property updated = propertyRepository.save(property);
        return propertyMapper.toResponse(updated, false);
    }

    @Transactional
    public void deleteProperty(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

        // Delete physical image files from disk
        if (property.getImages() != null) {
            for (PropertyImage img : property.getImages()) {
                fileStorageService.deleteFile(img.getImagePath());
            }
        }

        propertyRepository.delete(property);
    }

    private static final List<String> ALLOWED_PROPERTY_IMAGE_EXTS = Arrays.asList("jpg", "jpeg", "png");

    @Transactional
    public List<PropertyImageResponse> uploadImages(Long propertyId, List<MultipartFile> files) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));

        boolean hasPrimary = property.getImages().stream().anyMatch(PropertyImage::getIsPrimary);
        List<PropertyImageResponse> uploadedList = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            if (file.isEmpty()) continue;

            String originalFileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "";
            String ext = "";
            int dotIdx = originalFileName.lastIndexOf('.');
            if (dotIdx > 0) {
                ext = originalFileName.substring(dotIdx + 1).toLowerCase();
            }

            if (!ALLOWED_PROPERTY_IMAGE_EXTS.contains(ext)) {
                throw new BadRequestException("Invalid image format for '" + originalFileName + "'. Only JPG, JPEG, and PNG images are allowed for properties. WEBP files are not supported.");
            }

            String storedPath = fileStorageService.storeFile(file, "properties");
            boolean isPrimary = (!hasPrimary && i == 0 && property.getImages().isEmpty());

            PropertyImage image = new PropertyImage(property, storedPath, isPrimary);
            PropertyImage savedImage = propertyImageRepository.save(image);
            property.addImage(savedImage);
            uploadedList.add(propertyMapper.toImageResponse(savedImage));
        }

        return uploadedList;
    }

    @Transactional
    public void deleteImage(Long propertyId, Long imageId) {
        PropertyImage image = propertyImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found with id: " + imageId));

        if (!image.getProperty().getId().equals(propertyId)) {
            throw new ResourceNotFoundException("Image does not belong to property id: " + propertyId);
        }

        fileStorageService.deleteFile(image.getImagePath());
        propertyImageRepository.delete(image);
    }

    @Transactional
    public void setPrimaryImage(Long propertyId, Long imageId) {
        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + propertyId));

        for (PropertyImage img : property.getImages()) {
            img.setIsPrimary(img.getId().equals(imageId));
            propertyImageRepository.save(img);
        }
    }

    @Transactional
    public PropertyResponse updateStatus(Long id, PropertyStatus newStatus) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));

        property.setStatus(newStatus);
        Property updated = propertyRepository.save(property);
        return propertyMapper.toResponse(updated, false);
    }

    @Transactional(readOnly = true)
    public Property findEntityById(Long id) {
        return propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property not found with id: " + id));
    }

    private String normalizeSlug(String slug) {
        if (slug == null) return "";
        return slug.toLowerCase().replace("-", "").trim();
    }

    private String dedupeSlugTokens(String slug) {
        if (slug == null || slug.trim().isEmpty()) return "";
        String[] tokens = slug.toLowerCase().trim().split("-");
        List<String> result = new ArrayList<>();
        Set<String> dedupeKeywords = Set.of(
            "gurgaon", "gurugram", "delhi", "noida", "dwarka",
            "flat", "flats", "apartment", "apartments", "sector"
        );
        String lastToken = "";
        for (String t : tokens) {
            if (t.isEmpty()) continue;
            if (t.equals(lastToken)) continue;
            if (result.contains(t) && dedupeKeywords.contains(t)) continue;
            result.add(t);
            lastToken = t;
        }
        return String.join("-", result);
    }

    private double calculateSlugSimilarity(String identifier, Property p) {
        if (identifier == null || p == null) return 0.0;
        String[] idTokens = identifier.toLowerCase().split("-");
        Set<String> significantIdTokens = new HashSet<>();
        Set<String> stopWords = Set.of("in", "for", "sale", "rent", "the", "a", "an", "and", "of", "to", "at", "by", "is");
        for (String t : idTokens) {
            if (t.length() > 1 && !stopWords.contains(t)) {
                significantIdTokens.add(t);
            }
        }
        if (significantIdTokens.isEmpty()) return 0.0;

        StringBuilder sb = new StringBuilder();
        if (p.getTitle() != null) sb.append(" ").append(p.getTitle());
        if (p.getSocietyName() != null) sb.append(" ").append(p.getSocietyName());
        if (p.getLocation() != null) sb.append(" ").append(p.getLocation());
        if (p.getCity() != null) sb.append(" ").append(p.getCity());
        if (p.getSlug() != null) sb.append(" ").append(p.getSlug().replace("-", " "));
        String propText = sb.toString().toLowerCase();

        int matches = 0;
        for (String token : significantIdTokens) {
            if (propText.contains(token)) {
                matches++;
            }
        }
        return (double) matches / significantIdTokens.size();
    }
}
