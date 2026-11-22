package com.keystone.scheduler;

import com.keystone.repository.PasswordResetTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

/**
 * Scheduled background tasks for maintenance and cleanup operations.
 */
@Component
public class TokenCleanupScheduler {

    private static final Logger log = LoggerFactory.getLogger(TokenCleanupScheduler.class);

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public TokenCleanupScheduler(PasswordResetTokenRepository passwordResetTokenRepository) {
        this.passwordResetTokenRepository = passwordResetTokenRepository;
    }

    /**
     * Purges expired password reset tokens every 6 hours to keep the database lean and performant.
     */
    @Scheduled(fixedRate = 21600000L)
    @Transactional
    public void purgeExpiredResetTokens() {
        try {
            passwordResetTokenRepository.deleteByExpiryDateBefore(LocalDateTime.now());
            log.info("[KEYSTONE CLEANUP] Expired password reset tokens successfully purged.");
        } catch (Exception e) {
            log.warn("[KEYSTONE CLEANUP] Could not purge expired tokens: {}", e.getMessage());
        }
    }
}
