package com.keystone.service;

import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.entity.Favorite;
import com.keystone.entity.Property;
import com.keystone.entity.User;
import com.keystone.mapper.PropertyMapper;
import com.keystone.repository.FavoriteRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final PropertyService propertyService;
    private final PropertyMapper propertyMapper;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           UserService userService,
                           PropertyService propertyService,
                           PropertyMapper propertyMapper) {
        this.favoriteRepository = favoriteRepository;
        this.userService = userService;
        this.propertyService = propertyService;
        this.propertyMapper = propertyMapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<PropertyResponse> getUserFavorites(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Favorite> favoritesPage = favoriteRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        List<PropertyResponse> content = favoritesPage.getContent().stream()
                .map(fav -> propertyMapper.toResponse(fav.getProperty(), true))
                .collect(Collectors.toList());

        return new PageResponse<>(content, favoritesPage);
    }

    @Transactional
    public void addFavorite(Long userId, Long propertyId) {
        if (favoriteRepository.existsByUserIdAndPropertyId(userId, propertyId)) {
            return; // Already favorited
        }

        User user = userService.findEntityById(userId);
        Property property = propertyService.findEntityById(propertyId);

        Favorite favorite = new Favorite(user, property);
        favoriteRepository.save(favorite);
    }

    @Transactional
    public void removeFavorite(Long userId, Long propertyId) {
        favoriteRepository.deleteByUserIdAndPropertyId(userId, propertyId);
    }

    @Transactional(readOnly = true)
    public boolean isFavorite(Long userId, Long propertyId) {
        return favoriteRepository.existsByUserIdAndPropertyId(userId, propertyId);
    }
}
