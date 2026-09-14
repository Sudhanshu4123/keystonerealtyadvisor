package com.keystone.controller;

import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.PageResponse;
import com.keystone.dto.response.PropertyResponse;
import com.keystone.security.UserPrincipal;
import com.keystone.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<PropertyResponse>>> getUserFavorites(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        PageResponse<PropertyResponse> favorites = favoriteService.getUserFavorites(userPrincipal.getId(), page, size);
        return ResponseEntity.ok(ApiResponse.success("Favorites retrieved successfully", favorites));
    }

    @PostMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<Void>> addFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long propertyId) {

        favoriteService.addFavorite(userPrincipal.getId(), propertyId);
        return ResponseEntity.ok(ApiResponse.success("Property added to favorites"));
    }

    @DeleteMapping("/{propertyId}")
    public ResponseEntity<ApiResponse<Void>> removeFavorite(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long propertyId) {

        favoriteService.removeFavorite(userPrincipal.getId(), propertyId);
        return ResponseEntity.ok(ApiResponse.success("Property removed from favorites"));
    }
}
