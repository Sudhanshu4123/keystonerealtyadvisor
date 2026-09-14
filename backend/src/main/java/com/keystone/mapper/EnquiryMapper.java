package com.keystone.mapper;

import com.keystone.dto.response.EnquiryResponse;
import com.keystone.entity.Enquiry;
import com.keystone.entity.PropertyImage;
import org.springframework.stereotype.Component;

@Component
public class EnquiryMapper {

    public EnquiryResponse toResponse(Enquiry enquiry) {
        EnquiryResponse response = new EnquiryResponse();
        response.setId(enquiry.getId());
        response.setName(enquiry.getName());
        response.setEmail(enquiry.getEmail());
        response.setPhone(enquiry.getPhone());
        response.setMessage(enquiry.getMessage());
        response.setStatus(enquiry.getStatus());
        response.setCreatedAt(enquiry.getCreatedAt());
        response.setUpdatedAt(enquiry.getUpdatedAt());

        if (enquiry.getUser() != null) {
            response.setUserId(enquiry.getUser().getId());
            response.setUserName(enquiry.getUser().getName());
        }

        if (enquiry.getProperty() != null) {
            response.setPropertyId(enquiry.getProperty().getId());
            response.setPropertyTitle(enquiry.getProperty().getTitle());
            response.setPropertyCity(enquiry.getProperty().getCity());
            response.setPropertyLocation(enquiry.getProperty().getLocation());

            if (enquiry.getProperty().getImages() != null && !enquiry.getProperty().getImages().isEmpty()) {
                String imgPath = null;
                for (PropertyImage img : enquiry.getProperty().getImages()) {
                    if (Boolean.TRUE.equals(img.getIsPrimary())) {
                        imgPath = img.getImagePath();
                        break;
                    }
                }
                if (imgPath == null) {
                    imgPath = enquiry.getProperty().getImages().get(0).getImagePath();
                }
                response.setPropertyPrimaryImage(imgPath);
            }
        }

        return response;
    }
}
