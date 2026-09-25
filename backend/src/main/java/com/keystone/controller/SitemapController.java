package com.keystone.controller;

import com.keystone.entity.Project;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyStatus;
import com.keystone.mapper.PropertyMapper;
import com.keystone.repository.ProjectRepository;
import com.keystone.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@RestController
public class SitemapController {

    private static final Logger log = LoggerFactory.getLogger(SitemapController.class);

    private final PropertyRepository propertyRepository;
    private final ProjectRepository projectRepository;
    private final PropertyMapper propertyMapper;

    @Value("${app.site.base-url:https://keystonerealtyadvisor.com}")
    private String siteBaseUrl;

    @Autowired
    public SitemapController(PropertyRepository propertyRepository,
                             ProjectRepository projectRepository,
                             PropertyMapper propertyMapper) {
        this.propertyRepository = propertyRepository;
        this.projectRepository = projectRepository;
        this.propertyMapper = propertyMapper;
    }

    @GetMapping(value = {"/api/sitemap.xml", "/sitemap.xml"}, produces = MediaType.APPLICATION_XML_VALUE)
    @Transactional(readOnly = true)
    public ResponseEntity<String> getSitemap() {
        String baseUrl = siteBaseUrl != null ? siteBaseUrl.replaceAll("/+$", "") : "https://keystonerealtyadvisor.com";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDateTime.now().format(formatter);

        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n");
        xml.append("        xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n");

        // 1. Static Core Pages & High-Intent SEO Landing Pages
        addUrl(xml, baseUrl + "/", today, "daily", "1.0", baseUrl + "/keystone-logo.png", "Keystone Realty Advisor");
        addUrl(xml, baseUrl + "/properties", today, "daily", "0.9", null, null);
        addUrl(xml, baseUrl + "/properties-in-delhi", today, "daily", "0.95", null, null);
        addUrl(xml, baseUrl + "/properties-in-gurugram", today, "daily", "0.95", null, null);
        addUrl(xml, baseUrl + "/properties-in-noida", today, "daily", "0.95", null, null);
        addUrl(xml, baseUrl + "/flats-for-rent-in-gurugram", today, "daily", "0.95", null, null);
        addUrl(xml, baseUrl + "/projects", today, "daily", "0.9", null, null);
        addUrl(xml, baseUrl + "/advisory", today, "monthly", "0.8", null, null);
        addUrl(xml, baseUrl + "/contact", today, "monthly", "0.8", null, null);
        addUrl(xml, baseUrl + "/terms", today, "monthly", "0.5", null, null);
        addUrl(xml, baseUrl + "/privacy", today, "monthly", "0.5", null, null);

        // 2. Dynamic Active Properties (Safe Fetch)
        try {
            List<Property> properties = propertyRepository.findAll();
            for (Property p : properties) {
                try {
                    if (p.getStatus() == PropertyStatus.AVAILABLE || p.getStatus() == PropertyStatus.UNDER_OFFER) {
                        String modDate = p.getUpdatedAt() != null ? p.getUpdatedAt().format(formatter) : today;
                        String imgUrl = null;
                        try {
                            if (p.getImages() != null && !p.getImages().isEmpty() && p.getImages().get(0) != null) {
                                imgUrl = p.getImages().get(0).getImagePath();
                                if (imgUrl != null && !imgUrl.startsWith("http")) {
                                    imgUrl = baseUrl + (imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl);
                                }
                            }
                        } catch (Exception imgEx) {
                            log.debug("Image lazy fetch skipped for property {}: {}", p.getId(), imgEx.getMessage());
                        }

                        String propertyPath;
                        if (p.getSlug() != null && !p.getSlug().trim().isEmpty()) {
                            propertyPath = "/properties/" + p.getSlug().trim();
                        } else if (propertyMapper != null) {
                            propertyPath = "/properties/" + propertyMapper.generateSlug(p.getTitle(), p.getLocation(), p.getCity(), p.getId());
                        } else {
                            propertyPath = "/properties/" + p.getId();
                        }
                        addUrl(xml, baseUrl + propertyPath, modDate, "weekly", "0.8", imgUrl, p.getTitle());
                    }
                } catch (Exception propEx) {
                    log.warn("Error processing property for sitemap: {}", propEx.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Failed to query properties for sitemap: {}", e.getMessage());
        }

        // 3. Dynamic Projects (Safe Fetch)
        try {
            List<Project> projects = projectRepository.findAll();
            for (Project proj : projects) {
                try {
                    String modDate = proj.getUpdatedAt() != null ? proj.getUpdatedAt().format(formatter) : today;
                    String projectPath = (proj.getSlug() != null && !proj.getSlug().trim().isEmpty())
                            ? "/projects/" + proj.getSlug().trim()
                            : "/projects/" + proj.getId();
                    String imgUrl = proj.getCoverImageUrl();
                    if (imgUrl != null && !imgUrl.startsWith("http")) {
                        imgUrl = baseUrl + (imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl);
                    }
                    addUrl(xml, baseUrl + projectPath, modDate, "weekly", "0.8", imgUrl, proj.getName());
                } catch (Exception projEx) {
                    log.warn("Error processing project for sitemap: {}", projEx.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Failed to query projects for sitemap: {}", e.getMessage());
        }

        xml.append("</urlset>");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .body(xml.toString());
    }

    private void addUrl(StringBuilder xml, String loc, String lastmod, String changefreq, String priority, String imageLoc, String imageTitle) {
        xml.append("  <url>\n");
        xml.append("    <loc>").append(escapeXml(loc)).append("</loc>\n");
        xml.append("    <lastmod>").append(escapeXml(lastmod)).append("</lastmod>\n");
        xml.append("    <changefreq>").append(escapeXml(changefreq)).append("</changefreq>\n");
        xml.append("    <priority>").append(escapeXml(priority)).append("</priority>\n");
        if (imageLoc != null && !imageLoc.trim().isEmpty()) {
            xml.append("    <image:image>\n");
            xml.append("      <image:loc>").append(escapeXml(imageLoc)).append("</image:loc>\n");
            if (imageTitle != null && !imageTitle.trim().isEmpty()) {
                xml.append("      <image:title>").append(escapeXml(imageTitle)).append("</image:title>\n");
            }
            xml.append("    </image:image>\n");
        }
        xml.append("  </url>\n");
    }

    private String escapeXml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&apos;");
    }
}
