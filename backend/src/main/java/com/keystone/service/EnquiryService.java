package com.keystone.service;

import com.keystone.dto.request.EnquiryRequest;
import com.keystone.dto.response.EnquiryResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.entity.Enquiry;
import com.keystone.entity.EnquiryStatus;
import com.keystone.entity.Property;
import com.keystone.entity.User;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.EnquiryMapper;
import com.keystone.repository.EnquiryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final UserService userService;
    private final PropertyService propertyService;
    private final EnquiryMapper enquiryMapper;

    public EnquiryService(EnquiryRepository enquiryRepository,
                          UserService userService,
                          PropertyService propertyService,
                          EnquiryMapper enquiryMapper) {
        this.enquiryRepository = enquiryRepository;
        this.userService = userService;
        this.propertyService = propertyService;
        this.enquiryMapper = enquiryMapper;
    }

    @Transactional
    public EnquiryResponse createEnquiry(EnquiryRequest request, Long currentUserId) {
        User user = null;
        if (currentUserId != null) {
            try {
                user = userService.findEntityById(currentUserId);
            } catch (Exception ignored) {
            }
        }

        Property property = null;
        if (request.getPropertyId() != null) {
            property = propertyService.findEntityById(request.getPropertyId());
        }

        Enquiry enquiry = new Enquiry(
                user,
                property,
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getMessage()
        );

        Enquiry saved = enquiryRepository.save(enquiry);
        return enquiryMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public PageResponse<EnquiryResponse> getUserEnquiries(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Enquiry> enquiryPage = enquiryRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        List<EnquiryResponse> content = enquiryPage.getContent().stream()
                .map(enquiryMapper::toResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(content, enquiryPage);
    }

    @Transactional(readOnly = true)
    public PageResponse<EnquiryResponse> getAllEnquiries(EnquiryStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Enquiry> enquiryPage;

        if (status != null) {
            enquiryPage = enquiryRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else {
            enquiryPage = enquiryRepository.findAll(pageable);
        }

        List<EnquiryResponse> content = enquiryPage.getContent().stream()
                .map(enquiryMapper::toResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(content, enquiryPage);
    }

    @Transactional(readOnly = true)
    public EnquiryResponse getEnquiryById(Long id, Long currentUserId, boolean isAdmin) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));

        // IDOR Protection: Standard users can only view their own enquiries
        if (!isAdmin) {
            if (enquiry.getUser() == null || !enquiry.getUser().getId().equals(currentUserId)) {
                throw new com.keystone.exception.UnauthorizedException("Access denied: You do not have permission to view this enquiry");
            }
        }

        return enquiryMapper.toResponse(enquiry);
    }

    @Transactional
    public EnquiryResponse updateStatus(Long id, EnquiryStatus newStatus) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));

        enquiry.setStatus(newStatus);
        Enquiry updated = enquiryRepository.save(enquiry);
        return enquiryMapper.toResponse(updated);
    }

    @Transactional
    public void deleteEnquiry(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        enquiryRepository.delete(enquiry);
    }
}
