package com.keystone.config;

import com.keystone.entity.*;
import com.keystone.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
@Order(2)
public class ProjectDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(ProjectDataInitializer.class);

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectDataInitializer(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        try {
            initializeConscientParq();
        } catch (Exception e) {
            log.error("Failed to initialize Conscient Parq project data: {}", e.getMessage(), e);
        }
    }

    private void initializeConscientParq() {
        String slug = "conscient-parq-sector-80-gurgaon";
        Optional<Project> existingOpt = projectRepository.findBySlug(slug);

        Project project = existingOpt.orElseGet(Project::new);

        // 1. Basic Project Information
        project.setName("Conscient Parq");
        project.setSlug(slug);
        project.setBuilderName("Conscient Infrastructures");
        project.setProjectType(ProjectType.RESIDENTIAL);
        project.setStatus(ProjectStatus.PUBLISHED);
        project.setReraNumber("GGM/818/550/2024/45");
        project.setLaunchDate("May 2024");
        project.setPossessionDate("February 2030");
        project.setAddress("Naurangpur Rd, Sector 80, New Gurgaon, Gurgaon");
        project.setLocality("Sector 80");
        project.setCity("Gurgaon");
        project.setState("Haryana");
        project.setCountry("India");
        project.setPincode("122001");
        project.setIsFeatured(true);

        // 2. Pricing Information
        project.setMinPrice(new BigDecimal("34000000.00")); // ₹3.4 Cr
        project.setMaxPrice(new BigDecimal("49100000.00")); // ₹4.91 Cr
        project.setPricePerSqft(new BigDecimal("31980.00")); // ₹31.98K/sq.ft.
        project.setPriceType("₹3.4 Cr - ₹4.91 Cr");
        project.setBookingAmount("10% on Booking");
        project.setMaintenanceCharges("As per standard society handover norms");

        // 3. Descriptions & Details
        project.setShortDescription("Conscient Parq in Sector 80, Gurgaon by Conscient Infrastructures offers luxury 3 & 4 BHK apartments across 5.6 acres with a 50,000 sq.ft. clubhouse, 2.2-acre central greens, and possession starting February 2030.");
        
        project.setDescription(
            "Conscient Parq is a premier luxury residential development by Conscient Infrastructures located on Naurangpur Rd, Sector 80, New Gurgaon, Gurgaon.\n\n" +
            "Spread across 5.6 Acres, the project features 4 high-rise residential towers (40 floors per tower) comprising a total of 448 meticulously crafted 3 BHK and 4 BHK luxury apartments with sizes ranging from 1063 to 1537 sq.ft.\n\n" +
            "The master layout incorporates a 2.2 Acre central green zone, surrounded by 300 acres of Karma Lake and 2700 acres of protected NSG green area with breathtaking views of the Aravalli Hills. The project features an iconic 50,000 sq.ft. clubhouse, elevated meandering walkways connecting residential towers directly to clubhouse lobbies, segregated pedestrian and vehicular movement, two levels of green spaces, and IGBC Platinum green building certification."
        );

        // 4. SEO Fields
        project.setSeoTitle("Conscient Parq Sector 80 Gurgaon | 3 & 4 BHK Apartments");
        project.setSeoDescription("Conscient Parq in Sector 80, Gurgaon by Conscient Infrastructures offers 3 & 4 BHK apartments with premium amenities, 5.6-acre development, 50,000 sq.ft. clubhouse and possession starting February 2030.");
        project.setCoverImageUrl("/uploads/projects/conscient-parq-cover.jpg");

        // Clear existing child collections if updating
        if (existingOpt.isPresent()) {
            project.getConfigurations().clear();
            project.getFloorPlans().clear();
            project.getHighlights().clear();
            project.getAmenities().clear();
            project.getSpecifications().clear();
        }

        // 5. Configurations
        addConfig(project, "3 BHK Apartment (Type A)", 3, 3, 1063.4, new BigDecimal("34000000.00"), "Available", "3 BHK luxury apartment with expansive living/dining, entrance foyer, utility and balconies.", 1);
        addConfig(project, "3 BHK Apartment (Type B)", 3, 3, 1253.0, new BigDecimal("37500000.00"), "Available", "3 BHK premium layout with spacious master suite and dressing area.", 2);
        addConfig(project, "3 BHK Apartment (Type C)", 3, 3, 1276.0, new BigDecimal("39000000.00"), "Available", "3 BHK luxury residence with dedicated utility and panoramic green views.", 3);
        addConfig(project, "3 BHK Apartment (Type D)", 3, 3, 1288.0, new BigDecimal("41200000.00"), "Available", "3 BHK grand corner apartment with large wrap-around balconies.", 4);
        addConfig(project, "4 BHK Apartment", 4, 4, 1537.0, new BigDecimal("49100000.00"), "Available", "4 BHK ultra-luxury apartment with 4 en-suite bathrooms, grand living room and panoramic Aravalli views.", 5);

        // 6. Floor Plans
        addFloorPlan(project, "3 BHK Luxury Floor Plan", "3 BHK Apartment", 1063.4, 
            "Bedroom 1, Bedroom 2, Bedroom 3, Drawing/Living Room, Attached Bathroom with Bedroom 2, Attached Bathroom with Bedroom 1, Dressing Room, Common Bathroom, Kitchen, Entrance Foyer, Passage, Kitchen & Utility, Attached Balcony with Bedroom 2, Balcony", 1);
        addFloorPlan(project, "4 BHK Luxury Floor Plan", "4 BHK Apartment", 1537.0, 
            "4 Bedrooms, Drawing/Living Room, Attached Bathrooms with Bedrooms, Dressing Room, Common Bathroom, Kitchen & Utility, Entrance Foyer, Extended Balconies", 2);

        // 7. Project Highlights
        addHighlight(project, "2.2 Acre Central Green Area", "Expansive central landscape offering lush green views and open recreational spaces.", 1);
        addHighlight(project, "Airport Distance - 32 km", "Direct highway connectivity to Indira Gandhi International Airport (IGI).", 2);
        addHighlight(project, "Close to NH48 & Dwarka Expressway", "Immediate access to Delhi-Jaipur Expressway (NH48) and Southern Peripheral Road.", 3);
        addHighlight(project, "Upcoming Greater SPR & Cyber City II", "Located right next to Gurgaon's upcoming high-growth commercial and IT corridors.", 4);
        addHighlight(project, "Surrounded by 300 Acres Karma Lake", "Serene natural waterbody backdrop providing pristine living environment.", 5);
        addHighlight(project, "Surrounded by 2700 Acres NSG Green Area", "Permanent uninterrupted green buffer ensuring clean air and open horizons.", 6);
        addHighlight(project, "Panoramic Aravalli Hills Views", "Unobstructed vistas towards the south and east across ancient Aravalli ranges.", 7);
        addHighlight(project, "50,000 sq.ft. Clubhouse", "Grand world-class clubhouse with indoor heated pool, spa, fitness and banqueting.", 8);
        addHighlight(project, "Segregated Pedestrian & Vehicular Movement", "Zero-vehicle movement at ground level ensuring child and senior citizen safety.", 9);
        addHighlight(project, "Elevated Meandering Walkway", "Connected sky walk linking all 4 residential towers directly to the club and lobbies.", 10);
        addHighlight(project, "Grand Double-Height Entrance Lobbies", "Luxurious air-conditioned arrival experience with dedicated drop-off zones.", 11);
        addHighlight(project, "Units Begin ~30 ft Above Ground Level", "Ground floor is free of residences, creating elevated privacy and natural airflow.", 12);
        addHighlight(project, "IGBC Platinum Certified Green Building", "Highest standard of sustainability, solar power, and rainwater harvesting.", 13);
        addHighlight(project, "Developed by Conscient (12,000+ Homes Delivered)", "Reputed institutional developer with over 4 decades of excellence.", 14);
        addHighlight(project, "4 Towers - 40 Floors - 448 Units", "Low-density development on 5.6 Acres with only 4 towers.", 15);
        addHighlight(project, "Unique Sky Walk, Pet Park & Padel Ball Court", "State-of-the-art sports and wellness amenities distributed across the podium.", 16);
        addHighlight(project, "Two Levels of Green Spaces", "Multi-tiered landscaped gardens at ground level and elevated podium.", 17);

        // 8. Amenities
        addAmenity(project, "Swimming Pool", AmenityCategory.RECREATION, "Droplets", 1);
        addAmenity(project, "Kid's Pool", AmenityCategory.RECREATION, "Smile", 2);
        addAmenity(project, "Gymnasium", AmenityCategory.FITNESS, "Dumbbell", 3);
        addAmenity(project, "Open Gym", AmenityCategory.FITNESS, "Activity", 4);
        addAmenity(project, "Sauna Bath", AmenityCategory.RECREATION, "Flame", 5);
        addAmenity(project, "Skating Rink", AmenityCategory.RECREATION, "Compass", 6);
        addAmenity(project, "50,000 sq.ft. Clubhouse", AmenityCategory.COMMUNITY, "Building2", 7);
        addAmenity(project, "Padel Ball Court", AmenityCategory.FITNESS, "Trophy", 8);
        addAmenity(project, "Pet Park", AmenityCategory.OUTDOOR, "Heart", 9);
        addAmenity(project, "Landscaping & Tree Planting", AmenityCategory.OUTDOOR, "Trees", 10);
        addAmenity(project, "Flower Garden", AmenityCategory.OUTDOOR, "Flower2", 11);
        addAmenity(project, "Closed Car Parking", AmenityCategory.PARKING, "Car", 12);
        addAmenity(project, "Fire Fighting System", AmenityCategory.SECURITY, "ShieldAlert", 13);
        addAmenity(project, "Internet / Wi-Fi", AmenityCategory.UTILITIES, "Wifi", 14);

        // 9. Specifications
        addSpec(project, SpecificationCategory.FLOORING, "Living / Dining Flooring", "Imported Marble Flooring", 1);
        addSpec(project, SpecificationCategory.FLOORING, "Master Bedroom Flooring", "Imported Marble Flooring", 2);
        addSpec(project, SpecificationCategory.FLOORING, "Other Bedrooms Flooring", "Imported Marble Flooring", 3);
        addSpec(project, SpecificationCategory.FLOORING, "Kitchen Flooring", "Marble Flooring", 4);
        addSpec(project, SpecificationCategory.FLOORING, "Toilets Flooring", "Marble Flooring", 5);
        addSpec(project, SpecificationCategory.FLOORING, "Balcony Flooring", "Anti Skid Tiles", 6);
        addSpec(project, SpecificationCategory.BATHROOM, "Toilets Fittings", "CP fittings, Branded Sanitary Fittings", 7);
        addSpec(project, SpecificationCategory.KITCHEN, "Kitchen Fittings", "Modular Kitchen with Chimney, HOB & Exhaust Fan", 8);
        addSpec(project, SpecificationCategory.DOORS_WINDOWS, "Doors", "Decorative Main Door", 9);
        addSpec(project, SpecificationCategory.STRUCTURE, "Interior Walls", "Acrylic Emulsion Paint", 10);
        addSpec(project, SpecificationCategory.STRUCTURE, "Exterior Finish", "Gypsum Finish", 11);
        addSpec(project, SpecificationCategory.KITCHEN, "Kitchen Walls", "Ceramic Tiles", 12);
        addSpec(project, SpecificationCategory.BATHROOM, "Toilets Walls", "Ceramic Tiles", 13);

        projectRepository.save(project);
        log.info("Successfully initialized Conscient Parq project (ID: {}, Slug: {})", project.getId(), project.getSlug());

        // Safely deactivate older demo projects without triggering foreign key violations
        try {
            List<Project> allProjects = projectRepository.findAll();
            for (Project p : allProjects) {
                if (!slug.equals(p.getSlug()) && (p.getName() != null && (p.getName().contains("Grand View") || p.getName().contains("Sample") || p.getName().contains("Demo")))) {
                    log.info("Deactivating demo project: {}", p.getName());
                    p.setStatus(ProjectStatus.DRAFT);
                    p.setIsFeatured(false);
                    projectRepository.save(p);
                }
            }
        } catch (Exception ex) {
            log.warn("Could not archive demo projects: {}", ex.getMessage());
        }
    }

    private void addConfig(Project project, String name, int beds, int baths, double area, BigDecimal price, String status, String desc, int order) {
        ProjectConfiguration config = new ProjectConfiguration();
        config.setName(name);
        config.setBedrooms(beds);
        config.setBathrooms(baths);
        config.setArea(area);
        config.setAreaUnit(AreaUnit.SQFT);
        config.setPrice(price);
        config.setAvailabilityStatus(status);
        config.setDescription(desc);
        config.setDisplayOrder(order);
        project.addConfiguration(config);
    }

    private void addFloorPlan(Project project, String title, String configName, double area, String desc, int order) {
        ProjectFloorPlan plan = new ProjectFloorPlan();
        plan.setTitle(title);
        plan.setConfigurationName(configName);
        plan.setArea(area);
        plan.setAreaUnit(AreaUnit.SQFT);
        plan.setDescription(desc);
        plan.setDisplayOrder(order);
        project.addFloorPlan(plan);
    }

    private void addHighlight(Project project, String title, String desc, int order) {
        ProjectHighlight hl = new ProjectHighlight();
        hl.setTitle(title);
        hl.setDescription(desc);
        hl.setDisplayOrder(order);
        project.addHighlight(hl);
    }

    private void addAmenity(Project project, String name, AmenityCategory cat, String icon, int order) {
        ProjectAmenity amenity = new ProjectAmenity();
        amenity.setName(name);
        amenity.setCategory(cat);
        amenity.setIconName(icon);
        amenity.setDisplayOrder(order);
        project.addAmenity(amenity);
    }

    private void addSpec(Project project, SpecificationCategory cat, String title, String details, int order) {
        ProjectSpecification spec = new ProjectSpecification();
        spec.setCategory(cat);
        spec.setTitle(title);
        spec.setDetails(details);
        spec.setDisplayOrder(order);
        project.addSpecification(spec);
    }
}
