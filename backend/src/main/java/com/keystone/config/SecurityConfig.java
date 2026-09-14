package com.keystone.config;

import com.keystone.security.CustomUserDetailsService;
import com.keystone.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(CustomUserDetailsService userDetailsService,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          CorsConfigurationSource corsConfigurationSource) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/properties", "/api/properties/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/projects", "/api/projects/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/enquiries").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                .requestMatchers("/error").permitAll()

                // Admin endpoints
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/properties/**", "/api/projects/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/properties/**", "/api/projects/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.PATCH, "/api/properties/**", "/api/projects/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/properties/**", "/api/projects/**").hasAuthority("ROLE_ADMIN")

                // Authenticated user endpoints
                .requestMatchers("/api/users/**").authenticated()
                .requestMatchers("/api/favorites/**").authenticated()
                .requestMatchers("/api/enquiries/my").authenticated()
                .requestMatchers("/api/enquiries/{id}").authenticated()

                // Any other request must be authenticated
                .anyRequest().authenticated()
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
