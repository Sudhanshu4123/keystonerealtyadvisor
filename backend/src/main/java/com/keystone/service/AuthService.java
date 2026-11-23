package com.keystone.service;

import com.keystone.dto.request.ForgotPasswordRequest;
import com.keystone.dto.request.GoogleLoginRequest;
import com.keystone.dto.request.LoginRequest;
import com.keystone.dto.request.RegisterRequest;
import com.keystone.dto.request.ResetPasswordRequest;
import com.keystone.dto.response.AuthResponse;
import com.keystone.entity.PasswordResetToken;
import com.keystone.entity.Role;
import com.keystone.entity.User;
import com.keystone.entity.UserStatus;
import com.keystone.exception.BadRequestException;
import com.keystone.mapper.UserMapper;
import com.keystone.repository.PasswordResetTokenRepository;
import com.keystone.repository.UserRepository;
import com.keystone.security.JwtTokenProvider;
import com.keystone.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserMapper userMapper;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;

    @Value("${app.reset-password.expiration-minutes:15}")
    private int resetTokenExpirationMinutes;

    @Value("${app.admin.initial-email:keystonexhelpdesk@gmail.com}")
    private String adminEmail;

    @Value("${app.admin.initial-password:KeystoneAdmin2026!}")
    private String adminPassword;

    @Value("${app.admin.initial-name:Keystone Executive Admin}")
    private String adminName;

    @Value("${app.admin.initial-phone:9911956274}")
    private String adminPhone;

    @Value("${app.google.client-id:518108375653-vi62hfvroinsug0bkj0rmdd04l3saug5.apps.googleusercontent.com}")
    private String googleClientId;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider,
            UserMapper userMapper,
            PasswordResetTokenRepository passwordResetTokenRepository,
            EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userMapper = userMapper;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Bootstrap or sync initial administrator credentials and active status
        userRepository.findByEmail(adminEmail).ifPresentOrElse(
                existingAdmin -> {
                    existingAdmin.setName(adminName);
                    existingAdmin.setPhone(adminPhone);
                    existingAdmin.setPassword(passwordEncoder.encode(adminPassword));
                    existingAdmin.setRole(Role.ROLE_ADMIN);
                    existingAdmin.setStatus(UserStatus.ACTIVE);
                    userRepository.save(existingAdmin);
                },
                () -> {
                    User admin = new User(
                            adminName,
                            adminEmail,
                            adminPhone,
                            passwordEncoder.encode(adminPassword),
                            Role.ROLE_ADMIN,
                            UserStatus.ACTIVE);
                    userRepository.save(admin);
                });
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim())) {
            throw new BadRequestException("Email address is already in use.");
        }

        String phone = null;
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            phone = request.getPhone().trim().replaceAll("[^0-9]", "");
            if (phone.length() != 10) {
                throw new BadRequestException("Contact number must be exactly 10 digits.");
            }
        }

        String name = request.getName().trim();
        if (name.length() > 40) {
            throw new BadRequestException("Name cannot exceed 40 characters.");
        }

        User user = new User(
                name,
                request.getEmail().trim().toLowerCase(),
                phone,
                passwordEncoder.encode(request.getPassword()),
                Role.ROLE_USER,
                UserStatus.ACTIVE);

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return userMapper.toAuthResponse(savedUser, jwt);
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadRequestException(
                    "This account has been deactivated or suspended. Please contact Keystone Advisor support.");
        }

        return userMapper.toAuthResponse(user, jwt);
    }

    @Transactional
    public AuthResponse googleLogin(GoogleLoginRequest request) {
        if (request == null || request.getToken() == null || request.getToken().isBlank()) {
            throw new BadRequestException("Google token is required.");
        }

        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + request.getToken().trim();
            @SuppressWarnings("unchecked")
            Map<String, Object> tokenInfo = restTemplate.getForObject(url, Map.class);

            if (tokenInfo == null || !tokenInfo.containsKey("email")) {
                throw new BadRequestException("Invalid or expired Google token.");
            }

            // Verify audience
            if (googleClientId != null && !googleClientId.isBlank()) {
                String aud = (String) tokenInfo.get("aud");
                String azp = (String) tokenInfo.get("azp");
                if (!googleClientId.equals(aud) && !googleClientId.equals(azp)) {
                    log.warn("Google token audience mismatch. Expected: {}, Got aud: {}, azp: {}", googleClientId, aud, azp);
                    throw new BadRequestException("Google token audience verification failed.");
                }
            }

            String email = ((String) tokenInfo.get("email")).toLowerCase().trim();
            String name = (String) tokenInfo.get("name");
            if (name == null || name.isBlank()) {
                name = email.split("@")[0];
            }
            if (name.length() > 40) {
                name = name.substring(0, 40);
            }

            User user = userRepository.findByEmailIgnoreCase(email).orElse(null);
            if (user == null) {
                user = new User(
                        name,
                        email,
                        null,
                        passwordEncoder.encode(UUID.randomUUID().toString()),
                        Role.ROLE_USER,
                        UserStatus.ACTIVE
                );
                user = userRepository.save(user);
                log.info("Successfully registered new user via Google OAuth: {}", email);
            } else {
                if (user.getStatus() != UserStatus.ACTIVE) {
                    throw new BadRequestException("This account has been deactivated or suspended. Please contact Keystone Advisor support.");
                }
            }

            UserPrincipal userPrincipal = UserPrincipal.create(user);
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userPrincipal, null, userPrincipal.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.generateToken(authentication);
            return userMapper.toAuthResponse(user, jwt);
        } catch (HttpClientErrorException e) {
            log.error("Google token verification HTTP error: {}", e.getResponseBodyAsString());
            throw new BadRequestException("Google token verification failed: " + e.getMessage());
        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error during Google login", e);
            throw new BadRequestException("Failed to authenticate with Google: " + e.getMessage());
        }
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        if (request == null || request.getEmail() == null || request.getEmail().isBlank()) {
            throw new BadRequestException("Please enter a valid email address.");
        }

        String email = request.getEmail().trim();
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new BadRequestException(
                        "No account found with this email address. Please check your email or register."));

        // Rate-limiting check: enforce 60-second cooldown per user to prevent email
        // flooding
        passwordResetTokenRepository.findTopByUserOrderByCreatedAtDesc(user).ifPresent(lastToken -> {
            if (lastToken.getCreatedAt() != null &&
                    lastToken.getCreatedAt().isAfter(LocalDateTime.now().minusSeconds(60))) {
                throw new BadRequestException(
                        "A password reset link was already sent recently. Please wait a minute before requesting another.");
            }
        });

        // Invalidate/delete any previous reset tokens for this user and clear expired
        // tokens
        try {
            passwordResetTokenRepository.deleteByUser(user);
            passwordResetTokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
        } catch (Exception ignored) {
        }

        // Generate a secure random token
        String token = UUID.randomUUID().toString().replace("-", "") +
                UUID.randomUUID().toString().replace("-", "");
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(resetTokenExpirationMinutes);

        PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), token);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        if (request == null || request.getToken() == null || request.getNewPassword() == null) {
            throw new BadRequestException("Invalid reset password request.");
        }

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken().trim())
                .orElseThrow(() -> new BadRequestException("Invalid or expired password reset link."));

        if (resetToken.isUsed() || resetToken.isExpired()) {
            throw new BadRequestException(
                    "This password reset link has expired or has already been used. Please request a new one.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsed(true);
        passwordResetTokenRepository.save(resetToken);
    }
}