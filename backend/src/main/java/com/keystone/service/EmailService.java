package com.keystone.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final ObjectProvider<JavaMailSender> mailSenderProvider;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    public EmailService(ObjectProvider<JavaMailSender> mailSenderProvider) {
        this.mailSenderProvider = mailSenderProvider;
    }

    @Async
    public void sendPasswordResetEmail(String toEmail, String name, String token) {
        String resetUrl = frontendUrl + "/reset-password?token=" + token;
        JavaMailSender mailSender = mailSenderProvider.getIfAvailable();

        boolean sent = false;
        if (mailSender != null && mailUsername != null && !mailUsername.isBlank()) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setFrom(mailUsername.trim(), "Keystone Realty Advisor");
                helper.setTo(toEmail.trim());
                helper.setSubject("Password Reset Request - Keystone Realty");

                String htmlContent = buildResetEmailHtml(name, resetUrl);
                helper.setText(htmlContent, true);

                mailSender.send(message);
                sent = true;
                log.info("Password reset email successfully sent to {}", toEmail);
                System.out.println("[KEYSTONE EMAIL] Password reset email successfully sent to: " + toEmail);
            } catch (Exception e) {
                log.error("Could not dispatch reset email to {} via SMTP: {}", toEmail, e.getMessage(), e);
                System.err.println("[KEYSTONE SMTP ERROR] Failed to send email via SMTP: " + e.getMessage());
            }
        }

        if (!sent) {
            String banner = "\n================================================================================\n" +
                    "[KEYSTONE DEV/FALLBACK] PASSWORD RESET LINK GENERATED:\n" +
                    "To: " + toEmail + " (" + (name != null ? name : "User") + ")\n" +
                    "Reset URL: " + resetUrl + "\n" +
                    "Token: " + token + "\n" +
                    "Expires in: 15 minutes\n" +
                    "================================================================================";
            log.warn(banner);
            System.out.println(banner);
        }
    }

    private String buildResetEmailHtml(String name, String resetUrl) {
        String recipient = (name != null && !name.isBlank()) ? name : "Client";
        return "<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;\">" +
               "<div style=\"text-align: center; margin-bottom: 28px;\">" +
               "<h1 style=\"font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 6px 0;\">Keystone Realty Advisor</h1>" +
               "<p style=\"font-size: 14px; color: #6b7280; margin: 0;\">Verified Luxury Real Estate</p>" +
               "</div>" +
               "<div style=\"padding: 20px 0; border-top: 1px solid #f3f4f6; border-bottom: 1px solid #f3f4f6;\">" +
               "<p style=\"font-size: 15px; color: #1f2937; margin: 0 0 16px 0;\">Hello <strong>" + recipient + "</strong>,</p>" +
               "<p style=\"font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 0 24px 0;\">We received a request to reset the password for your Keystone Realty account. Click the button below to choose a new password. This link will safely expire in <strong>15 minutes</strong>.</p>" +
               "<div style=\"text-align: center; margin: 28px 0;\">" +
               "<a href=\"" + resetUrl + "\" style=\"background-color: #c8a96a; color: #ffffff; padding: 13px 32px; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 8px; display: inline-block; box-shadow: 0 2px 4px rgba(200, 169, 106, 0.25);\">Reset My Password</a>" +
               "</div>" +
               "<p style=\"font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0 0 8px 0;\">If the button above does not work, copy and paste this link into your browser:</p>" +
               "<p style=\"font-size: 12px; color: #2563eb; word-break: break-all; margin: 0;\"><a href=\"" + resetUrl + "\" style=\"color: #2563eb;\">" + resetUrl + "</a></p>" +
               "</div>" +
               "<div style=\"margin-top: 24px; text-align: center;\">" +
               "<p style=\"font-size: 12px; color: #9ca3af; margin: 0 0 6px 0;\">If you did not request this password reset, please disregard this email or contact support.</p>" +
               "<p style=\"font-size: 11px; color: #d1d5db; margin: 0;\">© 2026 Keystone Realty Advisor. All rights reserved.</p>" +
               "</div>" +
               "</div>";
    }
}
