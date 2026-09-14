package com.keystone.service;

import com.keystone.dto.request.PasswordChangeRequest;
import com.keystone.dto.request.UserProfileRequest;
import com.keystone.dto.response.UserSummaryResponse;
import com.keystone.entity.User;
import com.keystone.exception.BadRequestException;
import com.keystone.exception.ResourceNotFoundException;
import com.keystone.mapper.UserMapper;
import com.keystone.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public UserSummaryResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return userMapper.toSummaryResponse(user);
    }

    @Transactional
    public UserSummaryResponse updateProfile(Long userId, UserProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setName(request.getName());
        user.setPhone(request.getPhone());

        User updatedUser = userRepository.save(user);
        return userMapper.toSummaryResponse(updatedUser);
    }

    @Transactional
    public void changePassword(Long userId, PasswordChangeRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password does not match.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User findEntityById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }
}
