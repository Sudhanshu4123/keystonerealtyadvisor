package com.keystone.controller;

import com.keystone.dto.request.PasswordChangeRequest;
import com.keystone.dto.request.UserProfileRequest;
import com.keystone.dto.response.ApiResponse;
import com.keystone.dto.response.UserSummaryResponse;
import com.keystone.security.UserPrincipal;
import com.keystone.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> getProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {

        UserSummaryResponse response = userService.getProfile(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Profile retrieved successfully", response));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserSummaryResponse>> updateProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody UserProfileRequest request) {

        UserSummaryResponse response = userService.updateProfile(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", response));
    }

    @PutMapping("/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody PasswordChangeRequest request) {

        userService.changePassword(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
    }
}
