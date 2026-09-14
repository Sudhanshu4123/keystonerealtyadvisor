package com.keystone.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name:Root}")
    private String cloudName;

    @Value("${cloudinary.api-key:877916588632514}")
    private String apiKey;

    @Value("${cloudinary.api-secret:81UKRoZlSzOgkntxnN7Jdf9e4_A}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName.trim());
        config.put("api_key", apiKey.trim());
        config.put("api_secret", apiSecret.trim());
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}
