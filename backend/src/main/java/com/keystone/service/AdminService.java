package com.keystone.service;

import com.keystone.dto.response.DashboardStatsResponse;
import com.keystone.dto.response.EnquiryResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.dto.response.UserSummaryResponse;
import com.keystone.entity.EnquiryStatus;
import com.keystone.entity.PropertyStatus;
import com.keystone.entity.User;
import com.keystone.entity.UserStatus;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.EnquiryMapper;
import com.keystone.mapper.PropertyMapper;
import com.keystone.mapper.UserMapper;
import com.keystone.repository.EnquiryRepository;
import com.keystone.repository.PropertyRepository;
import com.keystone.repository.UserRepository;
import com.keystone.dto.response.ProjectSummaryResponse;
import com.keystone.entity.ProjectStatus;
import com.keystone.mapper.ProjectMapper;
import com.keystone.repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final PropertyRepository propertyRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final EnquiryRepository enquiryRepository;
    private final PropertyMapper propertyMapper;
    private final ProjectMapper projectMapper;
    private final UserMapper userMapper;
    private final EnquiryMapper enquiryMapper;

    public AdminService(PropertyRepository propertyRepository,
                        ProjectRepository projectRepository,
                        UserRepository userRepository,
                        EnquiryRepository enquiryRepository,
                        PropertyMapper propertyMapper,
                        ProjectMapper projectMapper,
                        UserMapper userMapper,
                        EnquiryMapper enquiryMapper) {
        this.propertyRepository = propertyRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.enquiryRepository = enquiryRepository;
        this.propertyMapper = propertyMapper;
        this.projectMapper = projectMapper;
        this.userMapper = userMapper;
        this.enquiryMapper = enquiryMapper;
    }

    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        DashboardStatsResponse stats = new DashboardStatsResponse();

        // Real Database Counts only
        stats.setTotalProperties(propertyRepository.count());
        stats.setAvailableProperties(propertyRepository.countByStatus(PropertyStatus.AVAILABLE));
        stats.setUnderOfferProperties(propertyRepository.countByStatus(PropertyStatus.UNDER_OFFER));
        stats.setSoldProperties(propertyRepository.countByStatus(PropertyStatus.SOLD));
        stats.setRentedProperties(propertyRepository.countByStatus(PropertyStatus.RENTED));

        stats.setTotalProjects(projectRepository.count());
        stats.setPublishedProjects(projectRepository.countByStatus(ProjectStatus.PUBLISHED));
        stats.setDraftProjects(projectRepository.countByStatus(ProjectStatus.DRAFT));

        stats.setTotalUsers(userRepository.count());
        stats.setTotalEnquiries(enquiryRepository.count());
        stats.setPendingEnquiries(enquiryRepository.countByStatus(EnquiryStatus.PENDING));
        stats.setContactedEnquiries(enquiryRepository.countByStatus(EnquiryStatus.CONTACTED));
        stats.setInProgressEnquiries(enquiryRepository.countByStatus(EnquiryStatus.IN_PROGRESS));
        stats.setResolvedEnquiries(enquiryRepository.countByStatus(EnquiryStatus.RESOLVED));

        List<EnquiryResponse> recentEnquiries = enquiryRepository.findTop5ByOrderByCreatedAtDesc().stream()
                .map(enquiryMapper::toResponse)
                .collect(Collectors.toList());
        stats.setRecentEnquiries(recentEnquiries);

        List<PropertyResponse> recentProperties = propertyRepository.findTop6ByStatusOrderByCreatedAtDesc(PropertyStatus.AVAILABLE).stream()
                .map(p -> propertyMapper.toResponse(p, false))
                .collect(Collectors.toList());
        stats.setRecentProperties(recentProperties);

        List<ProjectSummaryResponse> recentProjects = projectRepository.findAll(PageRequest.of(0, 5, Sort.by("createdAt").descending())).getContent().stream()
                .map(projectMapper::toSummaryResponse)
                .collect(Collectors.toList());
        stats.setRecentProjects(recentProjects);

        return stats;
    }

    @Transactional(readOnly = true)
    public PageResponse<UserSummaryResponse> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> usersPage = userRepository.findAll(pageable);

        List<UserSummaryResponse> content = usersPage.getContent().stream()
                .map(userMapper::toSummaryResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(content, usersPage);
    }

    @Transactional
    public UserSummaryResponse updateUserStatus(Long userId, UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setStatus(status);
        User saved = userRepository.save(user);
        return userMapper.toSummaryResponse(saved);
    }
}
