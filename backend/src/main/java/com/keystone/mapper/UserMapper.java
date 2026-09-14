package com.keystone.mapper;

import com.keystone.dto.response.AuthResponse;
import com.keystone.dto.response.UserSummaryResponse;
import com.keystone.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public AuthResponse toAuthResponse(User user, String token) {
        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getStatus()
        );
    }

    public UserSummaryResponse toSummaryResponse(User user) {
        UserSummaryResponse response = new UserSummaryResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setTotalFavorites(user.getFavorites() != null ? user.getFavorites().size() : 0);
        response.setTotalEnquiries(user.getEnquiries() != null ? user.getEnquiries().size() : 0);
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        return response;
    }
}
