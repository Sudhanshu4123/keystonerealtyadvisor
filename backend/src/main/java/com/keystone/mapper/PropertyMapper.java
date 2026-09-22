package com.keystone.mapper;

import com.keystone.dto.request.PropertyRequest;
import com.keystone.dto.response.PropertyImageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyImage;
import org.springframework.stereotype.Component;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class PropertyMapper {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public String generateSlug(String title, String location, String city, Long id) {
        StringBuilder sb = new StringBuilder();
        if (title != null && !title.trim().isEmpty()) {
            sb.append(title.trim());
        }
        if (location != null && !location.trim().isEmpty()) {
            sb.append(" ").append(location.trim());
        }
        if (city != null && !city.trim().isEmpty()) {
            sb.append(" ").append(city.trim());
        }
        String text = sb.length() > 0 ? sb.toString() : "property";
        String nowhitespace = WHITESPACE.matcher(text).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String cleanSlug = NONLATIN.matcher(normalized).replaceAll("").toLowerCase(Locale.ENGLISH).replaceAll("-+", "-").replaceAll("^-|-$", "");
        return cleanSlug.isEmpty() ? ("property-" + (id != null ? id : "listing")) : cleanSlug;
    }

    public Property toEntity(PropertyRequest request) {
        Property property = new Property();
        property.setTitle(request.getTitle());
        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(request.getTitle(), request.getLocation(), request.getCity(), null);
        }
        property.setSlug(slug);
        property.setDescription(request.getDescription());
        property.setArea(request.getArea());
        property.setBathrooms(request.getBathrooms());
        property.setBedrooms(request.getBedrooms());
        property.setCity(request.getCity());
        property.setLocation(request.getLocation());
        property.setPrice(request.getPrice());
        property.setPropertyType(request.getPropertyType());
        property.setListingType(request.getListingType());
        property.setFurnished(request.getFurnished());
        property.setStatus(request.getStatus());

        property.setPropertyCategory(request.getPropertyCategory());
        property.setSocietyName(request.getSocietyName());
        property.setBuiltUpArea(request.getBuiltUpArea());
        property.setCarpetArea(request.getCarpetArea());
        property.setTransactionType(request.getTransactionType());
        property.setPropertyAge(request.getPropertyAge());
        property.setBalconies(request.getBalconies());
        property.setFloorNo(request.getFloorNo());
        property.setTotalFloors(request.getTotalFloors());
        property.setCoveredParking(request.getCoveredParking());
        property.setOpenParking(request.getOpenParking());
        property.setPreferredTenant(request.getPreferredTenant());
        property.setBachelorPreference(request.getBachelorPreference());
        property.setPetFriendly(request.getPetFriendly());
        property.setAvailableFrom(request.getAvailableFrom());
        property.setMaintenanceCharges(request.getMaintenanceCharges());
        property.setSecurityDeposit(request.getSecurityDeposit());
        property.setLockInPeriod(request.getLockInPeriod());
        property.setBrokerage(request.getBrokerage());
        property.setAmenities(request.getAmenities());
        property.setFurnishingDetails(request.getFurnishingDetails());
        return property;
    }

    public void updateEntityFromRequest(Property property, PropertyRequest request) {
        property.setTitle(request.getTitle());
        property.setDescription(request.getDescription());
        property.setArea(request.getArea());
        property.setBathrooms(request.getBathrooms());
        property.setBedrooms(request.getBedrooms());
        property.setCity(request.getCity());
        property.setLocation(request.getLocation());
        property.setPrice(request.getPrice());
        property.setPropertyType(request.getPropertyType());
        property.setListingType(request.getListingType());
        property.setFurnished(request.getFurnished());
        property.setStatus(request.getStatus());

        property.setPropertyCategory(request.getPropertyCategory());
        property.setSocietyName(request.getSocietyName());
        property.setBuiltUpArea(request.getBuiltUpArea());
        property.setCarpetArea(request.getCarpetArea());
        property.setTransactionType(request.getTransactionType());
        property.setPropertyAge(request.getPropertyAge());
        property.setBalconies(request.getBalconies());
        property.setFloorNo(request.getFloorNo());
        property.setTotalFloors(request.getTotalFloors());
        property.setCoveredParking(request.getCoveredParking());
        property.setOpenParking(request.getOpenParking());
        property.setPreferredTenant(request.getPreferredTenant());
        property.setBachelorPreference(request.getBachelorPreference());
        property.setPetFriendly(request.getPetFriendly());
        property.setAvailableFrom(request.getAvailableFrom());
        property.setMaintenanceCharges(request.getMaintenanceCharges());
        property.setSecurityDeposit(request.getSecurityDeposit());
        property.setLockInPeriod(request.getLockInPeriod());
        property.setBrokerage(request.getBrokerage());
        property.setAmenities(request.getAmenities());
        property.setFurnishingDetails(request.getFurnishingDetails());
        if (request.getSlug() != null && !request.getSlug().trim().isEmpty()) {
            property.setSlug(request.getSlug().trim());
        } else if (property.getSlug() == null || property.getSlug().trim().isEmpty()) {
            property.setSlug(generateSlug(request.getTitle(), request.getLocation(), request.getCity(), property.getId()));
        }
    }

    public PropertyResponse toResponse(Property property, boolean isFavorite) {
        PropertyResponse response = new PropertyResponse();
        response.setId(property.getId());
        String slug = property.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(property.getTitle(), property.getLocation(), property.getCity(), property.getId());
        }
        response.setSlug(slug);
        response.setTitle(property.getTitle());
        response.setDescription(property.getDescription());
        response.setArea(property.getArea());
        response.setBathrooms(property.getBathrooms());
        response.setBedrooms(property.getBedrooms());
        response.setCity(property.getCity());
        response.setLocation(property.getLocation());
        response.setPrice(property.getPrice());
        response.setPropertyType(property.getPropertyType());
        response.setListingType(property.getListingType());
        response.setFurnished(property.getFurnished());
        response.setStatus(property.getStatus());
        response.setFavorite(isFavorite);

        response.setPropertyCategory(property.getPropertyCategory());
        response.setSocietyName(property.getSocietyName());
        response.setBuiltUpArea(property.getBuiltUpArea());
        response.setCarpetArea(property.getCarpetArea());
        response.setTransactionType(property.getTransactionType());
        response.setPropertyAge(property.getPropertyAge());
        response.setBalconies(property.getBalconies());
        response.setFloorNo(property.getFloorNo());
        response.setTotalFloors(property.getTotalFloors());
        response.setCoveredParking(property.getCoveredParking());
        response.setOpenParking(property.getOpenParking());
        response.setPreferredTenant(property.getPreferredTenant());
        response.setBachelorPreference(property.getBachelorPreference());
        response.setPetFriendly(property.getPetFriendly());
        response.setAvailableFrom(property.getAvailableFrom());
        response.setMaintenanceCharges(property.getMaintenanceCharges());
        response.setSecurityDeposit(property.getSecurityDeposit());
        response.setLockInPeriod(property.getLockInPeriod());
        response.setBrokerage(property.getBrokerage());
        response.setAmenities(property.getAmenities());
        response.setFurnishingDetails(property.getFurnishingDetails());
        if (property.getProject() != null) {
            response.setProjectId(property.getProject().getId());
            response.setProjectName(property.getProject().getName());
        }
        response.setCreatedAt(property.getCreatedAt());
        response.setUpdatedAt(property.getUpdatedAt());

        List<PropertyImageResponse> imageResponses = new ArrayList<>();
        String primaryUrl = null;

        if (property.getImages() != null && !property.getImages().isEmpty()) {
            imageResponses = property.getImages().stream()
                    .map(this::toImageResponse)
                    .collect(Collectors.toList());

            // Primary image search
            for (PropertyImage img : property.getImages()) {
                if (Boolean.TRUE.equals(img.getIsPrimary())) {
                    primaryUrl = img.getImagePath();
                    break;
                }
            }
            if (primaryUrl == null && !property.getImages().isEmpty()) {
                primaryUrl = property.getImages().get(0).getImagePath();
            }
        }

        response.setPrimaryImageUrl(primaryUrl);
        response.setImages(imageResponses);
        return response;
    }

    public PropertyImageResponse toImageResponse(PropertyImage image) {
        return new PropertyImageResponse(
                image.getId(),
                image.getImagePath(),
                image.getIsPrimary(),
                image.getCreatedAt()
        );
    }
}
