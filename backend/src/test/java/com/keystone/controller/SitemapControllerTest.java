package com.keystone.controller;

import com.keystone.entity.Project;
import com.keystone.entity.ProjectStatus;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyStatus;
import com.keystone.mapper.PropertyMapper;
import com.keystone.repository.ProjectRepository;
import com.keystone.repository.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SitemapControllerTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private PropertyMapper propertyMapper;

    @InjectMocks
    private SitemapController sitemapController;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(sitemapController, "siteBaseUrl", "https://keystonerealtyadvisor.com");
    }

    @Test
    @DisplayName("Sitemap should include all static indexable pages")
    void testStaticIndexablePages() {
        when(propertyRepository.findAll()).thenReturn(List.of());
        when(projectRepository.findAll()).thenReturn(List.of());

        ResponseEntity<String> response = sitemapController.getSitemap();
        assertNotNull(response);
        String body = response.getBody();
        assertNotNull(body);

        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/</loc>"));
        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/properties</loc>"));
        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/projects</loc>"));
        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/advisory</loc>"));
        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/contact</loc>"));
        assertFalse(body.contains("<loc>https://keystonerealtyadvisor.com/entity-map</loc>"));
        assertFalse(body.contains("<loc>https://keystonerealtyadvisor.com/login</loc>"));
    }

    @Test
    @DisplayName("Sitemap should include PUBLISHED projects and exclude DRAFT projects")
    void testProjectInclusionInSitemap() {
        when(propertyRepository.findAll()).thenReturn(List.of());

        Project publishedProject = new Project();
        publishedProject.setName("Conscient Parq");
        publishedProject.setSlug("conscient-parq-sector-80-gurgaon");
        publishedProject.setStatus(ProjectStatus.PUBLISHED);
        publishedProject.setCoverImageUrl("/uploads/projects/conscient-parq-cover.jpg");

        Project draftProject = new Project();
        draftProject.setName("Upcoming Secret Project");
        draftProject.setSlug("upcoming-secret-project");
        draftProject.setStatus(ProjectStatus.DRAFT);

        when(projectRepository.findAll()).thenReturn(List.of(publishedProject, draftProject));

        ResponseEntity<String> response = sitemapController.getSitemap();
        String body = response.getBody();
        assertNotNull(body);

        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/projects/conscient-parq-sector-80-gurgaon</loc>"),
                "Published project URL should be present in sitemap");
        assertTrue(body.contains("<image:loc>https://keystonerealtyadvisor.com/uploads/projects/conscient-parq-cover.jpg</image:loc>"),
                "Published project cover image should be present");
        assertFalse(body.contains("upcoming-secret-project"),
                "DRAFT project must NOT be present in sitemap");
    }

    @Test
    @DisplayName("Sitemap should include AVAILABLE properties and format URL")
    void testActivePropertiesInSitemap() {
        when(projectRepository.findAll()).thenReturn(List.of());

        Property availableProp = new Property();
        availableProp.setTitle("Luxury 3 BHK Flat");
        availableProp.setSlug("luxury-3-bhk-flat-gurgaon");
        availableProp.setStatus(PropertyStatus.AVAILABLE);
        availableProp.setUpdatedAt(LocalDateTime.of(2026, 10, 20, 10, 0));

        Property soldProp = new Property();
        soldProp.setTitle("Sold Villa");
        soldProp.setSlug("sold-villa-delhi");
        soldProp.setStatus(PropertyStatus.SOLD);

        when(propertyRepository.findAll()).thenReturn(List.of(availableProp, soldProp));

        ResponseEntity<String> response = sitemapController.getSitemap();
        String body = response.getBody();
        assertNotNull(body);

        assertTrue(body.contains("<loc>https://keystonerealtyadvisor.com/properties/luxury-3-bhk-flat-gurgaon</loc>"));
        assertTrue(body.contains("<lastmod>2026-10-20</lastmod>"));
        assertFalse(body.contains("sold-villa-delhi"));
    }
}
