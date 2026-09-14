package com.keystone.service;

import com.keystone.dto.request.LoginRequest;
import com.keystone.dto.request.RegisterRequest;
import com.keystone.dto.response.AuthResponse;
import com.keystone.entity.Role;
import com.keystone.entity.User;
import com.keystone.entity.UserStatus;
import com.keystone.exception.BadRequestException;
import com.keystone.mapper.UserMapper;
import com.keystone.repository.UserRepository;
import com.keystone.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;

    @Value("${app.admin.initial-email:keystonerealtyhepldesk@gmail.com}")
    private String adminEmail;

    @Value("${app.admin.initial-password:KeystoneAdmin2026!}")
    private String adminPassword;

    @Value("${app.admin.initial-name:Keystone Executive Admin}")
    private String adminName;

    @Value("${app.admin.initial-phone:9911956274}")
    private String adminPhone;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Bootstrap initial administrator if not present
        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User(
                    adminName,
                    adminEmail,
                    adminPhone,
                    passwordEncoder.encode(adminPassword),
                    Role.ROLE_ADMIN,
                    UserStatus.ACTIVE
            );
            userRepository.save(admin);
        }
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address is already in use.");
        }

        User user = new User(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                passwordEncoder.encode(request.getPassword()),
                Role.ROLE_USER,
                UserStatus.ACTIVE
        );

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return userMapper.toAuthResponse(savedUser, jwt);
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadRequestException("This account has been deactivated or suspended. Please contact Keystone Advisor support.");
        }

        return userMapper.toAuthResponse(user, jwt);
    }
}
