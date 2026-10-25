package com.keystone.controller;

import com.keystone.entity.Project;
import com.keystone.entity.ProjectStatus;
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

import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@RestController
public class SitemapController {

    private static final Logger log = LoggerFactory.getLogger(SitemapController.class);

    private static final List<String> INDEXABLE_STATIC_PATHS = List.of(
            "/",
            "/properties",
            "/properties-in-delhi",
            "/properties-in-gurugram",
            "/properties-in-noida",
            "/flats-for-rent-in-gurugram",
            "/flats-for-sale-in-gurugram",
            "/flats-for-sale-in-delhi",
            "/flats-for-sale-in-noida",
            "/flats-for-rent-in-delhi",
            "/flats-for-rent-in-noida",
            "/3-bhk-flats-in-gurgaon",
            "/2-bhk-flats-in-gurgaon",
            "/4-bhk-flats-in-gurgaon",
            "/luxury-villas-in-gurgaon",
            "/luxury-villas-in-delhi",
            "/builder-floors-in-delhi",
            "/builder-floors-in-gurgaon",
            "/commercial-properties-in-gurgaon",
            "/commercial-properties-in-delhi",
            "/flats-for-sale-in-dwarka",
            "/projects",
            "/advisory",
            "/contact",
            "/terms",
            "/privacy"
    );

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

        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n");
        xml.append("        xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n");

        // 1. Static indexable pages. Keep INDEXABLE_STATIC_PATHS in step with the routes in frontend/src/App.jsx
        //    (PROGRAMMATIC_PAGES in programmaticSeoConfig.js); `npm run seo:check` in /frontend fails if they drift.
        //    No <lastmod> is emitted for these: the pages have no real modification date, and a date that changes
        //    on every request teaches Google to ignore lastmod.
        for (String path : INDEXABLE_STATIC_PATHS) {
            addUrl(xml, baseUrl + path, null, "/".equals(path) ? baseUrl + "/keystone-logo.png" : null,
                    "/".equals(path) ? "Keystone Realty Advisor" : null);
        }

        // 2. Dynamic Active Properties (Safe Fetch)
        try {
            List<Property> properties = propertyRepository.findAll();
            for (Property p : properties) {
                try {
                    if (p.getStatus() == PropertyStatus.AVAILABLE || p.getStatus() == PropertyStatus.UNDER_OFFER) {
                        String modDate = p.getUpdatedAt() != null ? p.getUpdatedAt().format(formatter) : null;
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
                        addUrl(xml, baseUrl + propertyPath, modDate, imgUrl, p.getTitle());
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
                    // Only active/public projects resolve on the site; DRAFT and UNPUBLISHED are hidden.
                    if (proj.getStatus() == ProjectStatus.DRAFT || proj.getStatus() == ProjectStatus.UNPUBLISHED) {
                        continue;
                    }
                    String modDate = proj.getUpdatedAt() != null ? proj.getUpdatedAt().format(formatter) : null;
                    String projectPath = (proj.getSlug() != null && !proj.getSlug().trim().isEmpty())
                            ? "/projects/" + proj.getSlug().trim()
                            : "/projects/" + proj.getId();
                    String imgUrl = proj.getCoverImageUrl();
                    if (imgUrl != null && !imgUrl.startsWith("http")) {
                        imgUrl = baseUrl + (imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl);
                    }
                    addUrl(xml, baseUrl + projectPath, modDate, imgUrl, proj.getName());
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

    private void addUrl(StringBuilder xml, String loc, String lastmod, String imageLoc, String imageTitle) {
        xml.append("  <url>\n");
        xml.append("    <loc>").append(escapeXml(loc)).append("</loc>\n");
        if (lastmod != null && !lastmod.trim().isEmpty()) {
            xml.append("    <lastmod>").append(escapeXml(lastmod)).append("</lastmod>\n");
        }
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
