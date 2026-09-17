package com.keystone.controller;

import com.keystone.entity.Project;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyStatus;
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

@RestController
public class SitemapController {

    private final PropertyRepository propertyRepository;
    private final ProjectRepository projectRepository;

    @Value("${app.site.base-url:https://keystonerealtyadvisor.com}")
    private String siteBaseUrl;

    @Autowired
    public SitemapController(PropertyRepository propertyRepository, ProjectRepository projectRepository) {
        this.propertyRepository = propertyRepository;
        this.projectRepository = projectRepository;
    }

    @GetMapping(value = {"/api/sitemap.xml", "/sitemap.xml"}, produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> getSitemap() {
        String baseUrl = siteBaseUrl.replaceAll("/+$", "");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDateTime.now().format(formatter);

        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\n");
        xml.append("        xmlns:image=\"http://www.google.com/schemas/sitemap-image/1.1\">\n");

        // 1. Static Core Pages
        addUrl(xml, baseUrl + "/", today, "daily", "1.0", baseUrl + "/keystone-logo.png", "Keystone Realty Advisor");
        addUrl(xml, baseUrl + "/properties", today, "daily", "0.9", null, null);
        addUrl(xml, baseUrl + "/projects", today, "daily", "0.9", null, null);
        addUrl(xml, baseUrl + "/advisory", today, "monthly", "0.8", null, null);
        addUrl(xml, baseUrl + "/contact", today, "monthly", "0.8", null, null);
        addUrl(xml, baseUrl + "/terms", today, "monthly", "0.5", null, null);
        addUrl(xml, baseUrl + "/privacy", today, "monthly", "0.5", null, null);

        // 2. Dynamic Active Properties
        List<Property> properties = propertyRepository.findAll();
        for (Property p : properties) {
            if (p.getStatus() == PropertyStatus.AVAILABLE || p.getStatus() == PropertyStatus.UNDER_OFFER) {
                String modDate = p.getUpdatedAt() != null ? p.getUpdatedAt().format(formatter) : today;
                String imgUrl = null;
                if (p.getImages() != null && !p.getImages().isEmpty()) {
                    imgUrl = p.getImages().get(0).getImagePath();
                    if (imgUrl != null && !imgUrl.startsWith("http")) {
                        imgUrl = baseUrl + (imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl);
                    }
                }
                addUrl(xml, baseUrl + "/properties/" + p.getId(), modDate, "weekly", "0.8", imgUrl, p.getTitle());
            }
        }

        // 3. Dynamic Projects
        List<Project> projects = projectRepository.findAll();
        for (Project proj : projects) {
            String modDate = proj.getUpdatedAt() != null ? proj.getUpdatedAt().format(formatter) : today;
            String projectPath = (proj.getSlug() != null && !proj.getSlug().trim().isEmpty())
                    ? "/projects/" + proj.getSlug().trim()
                    : "/projects/" + proj.getId();
            String imgUrl = proj.getCoverImageUrl();
            if (imgUrl != null && !imgUrl.startsWith("http")) {
                imgUrl = baseUrl + (imgUrl.startsWith("/") ? imgUrl : "/" + imgUrl);
            }
            addUrl(xml, baseUrl + projectPath, modDate, "weekly", "0.8", imgUrl, proj.getName());
        }

        xml.append("</urlset>");
        return ResponseEntity.ok(xml.toString());
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
