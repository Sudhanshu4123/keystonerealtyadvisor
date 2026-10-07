-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: keystonedb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(120) NOT NULL,
  `message` text NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `status` enum('CLOSED','CONTACTED','IN_PROGRESS','PENDING','RESOLVED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `property_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_enq_user` (`user_id`),
  KEY `idx_enq_property` (`property_id`),
  KEY `idx_enq_status` (`status`),
  KEY `idx_enq_created` (`created_at`),
  CONSTRAINT `FK2ctkfrgg2lae6ghxb9q15igp6` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  CONSTRAINT `FKa44jwmva003yd8quj3wgbvgcs` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `property_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_property_favorite` (`user_id`,`property_id`),
  KEY `idx_fav_user` (`user_id`),
  KEY `idx_fav_property` (`property_id`),
  CONSTRAINT `FKd1rhumcrlv6g55lt8eprudthc` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`),
  CONSTRAINT `FKk7du8b8ewipawnnpg76d55fus` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_amenities`
--

DROP TABLE IF EXISTS `project_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_amenities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` enum('COMMUNITY','FITNESS','OTHER','OUTDOOR','PARKING','RECREATION','SECURITY','UTILITIES') NOT NULL,
  `display_order` int DEFAULT NULL,
  `icon_name` varchar(50) DEFAULT NULL,
  `name` varchar(150) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_amenity_proj_id` (`project_id`),
  CONSTRAINT `FKlh5prnr0n6ifgan8qgvugkc2o` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_amenities`
--

LOCK TABLES `project_amenities` WRITE;
/*!40000 ALTER TABLE `project_amenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_configurations`
--

DROP TABLE IF EXISTS `project_configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_configurations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `area` double DEFAULT NULL,
  `area_unit` enum('ACRE','SQFT','SQM','SQYD') DEFAULT NULL,
  `availability_status` varchar(50) DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_config_proj_id` (`project_id`),
  CONSTRAINT `FKde5eb6qr93nngvl0uwj3e3l42` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_configurations`
--

LOCK TABLES `project_configurations` WRITE;
/*!40000 ALTER TABLE `project_configurations` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_configurations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_documents`
--

DROP TABLE IF EXISTS `project_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_documents` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `document_name` varchar(200) NOT NULL,
  `document_type` enum('BROCHURE','FLOOR_PLAN','LEGAL_APPROVALS','MASTER_PLAN','OTHER','PAYMENT_PLAN','PRICE_LIST','SPECIFICATION_SHEET') NOT NULL,
  `file_size` bigint DEFAULT NULL,
  `file_url` varchar(500) NOT NULL,
  `is_public` bit(1) NOT NULL,
  `upload_date` datetime(6) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_doc_proj_id` (`project_id`),
  CONSTRAINT `FKfu1nh0td6ql5va3viuej44opf` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_documents`
--

LOCK TABLES `project_documents` WRITE;
/*!40000 ALTER TABLE `project_documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_floor_plans`
--

DROP TABLE IF EXISTS `project_floor_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_floor_plans` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `area` double DEFAULT NULL,
  `area_unit` enum('ACRE','SQFT','SQM','SQYD') DEFAULT NULL,
  `configuration_name` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `document_url` varchar(500) DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_fp_proj_id` (`project_id`),
  CONSTRAINT `FKnwjqrdfdhnvp2pg7g05nsg7g9` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_floor_plans`
--

LOCK TABLES `project_floor_plans` WRITE;
/*!40000 ALTER TABLE `project_floor_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_floor_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_highlights`
--

DROP TABLE IF EXISTS `project_highlights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_highlights` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_hl_proj_id` (`project_id`),
  CONSTRAINT `FKm2xvw0l8n5l70hn57egfpqcpa` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_highlights`
--

LOCK TABLES `project_highlights` WRITE;
/*!40000 ALTER TABLE `project_highlights` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_highlights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `caption` varchar(200) DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `image_type` enum('CONSTRUCTION_UPDATE','COVER','GALLERY','LOCATION_MAP','MASTER_PLAN','OTHER','SITE_PLAN') DEFAULT NULL,
  `image_url` varchar(500) NOT NULL,
  `is_cover` bit(1) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_img_proj_id` (`project_id`),
  CONSTRAINT `FKoej10untas4roy2rqxcmbdj42` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_specifications`
--

DROP TABLE IF EXISTS `project_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_specifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` enum('BATHROOM','DOORS_WINDOWS','ELECTRICAL','FLOORING','KITCHEN','OTHER','PARKING','PLUMBING','SECURITY','STRUCTURE') NOT NULL,
  `specification_details` text,
  `display_order` int DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_spec_proj_id` (`project_id`),
  CONSTRAINT `FKeudc1fmt5mlpbu34vcvcd1y` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_specifications`
--

LOCK TABLES `project_specifications` WRITE;
/*!40000 ALTER TABLE `project_specifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_videos`
--

DROP TABLE IF EXISTS `project_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_videos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `display_order` int DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `video_type` enum('DIRECT','OTHER','VIMEO','YOUTUBE') DEFAULT NULL,
  `video_url` varchar(500) NOT NULL,
  `project_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_proj_video_proj_id` (`project_id`),
  CONSTRAINT `FK6wokxdvx7m43gp6av6g4d1vga` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_videos`
--

LOCK TABLES `project_videos` WRITE;
/*!40000 ALTER TABLE `project_videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(300) DEFAULT NULL,
  `booking_amount` varchar(100) DEFAULT NULL,
  `builder_name` varchar(150) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `cover_image_url` varchar(500) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `description` longtext,
  `is_featured` bit(1) NOT NULL,
  `latitude` double DEFAULT NULL,
  `launch_date` varchar(255) DEFAULT NULL,
  `locality` varchar(150) NOT NULL,
  `longitude` double DEFAULT NULL,
  `maintenance_charges` varchar(100) DEFAULT NULL,
  `map_url` varchar(500) DEFAULT NULL,
  `max_price` decimal(15,2) DEFAULT NULL,
  `min_price` decimal(15,2) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `possession_date` varchar(255) DEFAULT NULL,
  `price_per_sqft` decimal(12,2) DEFAULT NULL,
  `price_type` varchar(255) DEFAULT NULL,
  `project_type` enum('COMMERCIAL','INDUSTRIAL','MIXED_USE','PLOTTED_DEVELOPMENT','RESIDENTIAL','VILLA') NOT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `rera_number` varchar(100) DEFAULT NULL,
  `seo_description` varchar(500) DEFAULT NULL,
  `seo_title` varchar(200) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `slug` varchar(220) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `status` enum('COMPLETED','DRAFT','PUBLISHED','READY_TO_MOVE','SOLD_OUT','UNDER_CONSTRUCTION','UNPUBLISHED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_proj_slug` (`slug`),
  KEY `idx_proj_city` (`city`),
  KEY `idx_proj_locality` (`locality`),
  KEY `idx_proj_type` (`project_type`),
  KEY `idx_proj_status` (`status`),
  KEY `idx_proj_min_price` (`min_price`),
  KEY `idx_proj_featured` (`is_featured`),
  KEY `idx_proj_created` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `area` double NOT NULL,
  `bathrooms` int NOT NULL,
  `bedrooms` int NOT NULL,
  `city` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `furnished` enum('FULLY_FURNISHED','SEMI_FURNISHED','UNFURNISHED') NOT NULL,
  `listing_type` enum('LEASE','PG_CO_LIVING','RENT','SALE') NOT NULL,
  `location` varchar(200) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `property_type` enum('APARTMENT','COMMERCIAL','DUPLEX','ESTATE','FARM_HOUSE','INDEPENDENT_FLOOR','INDEPENDENT_HOUSE','LAND','OFFICE','PENTHOUSE','PLOT','RETAIL_SHOP','STUDIO','TOWNHOUSE','VILLA') NOT NULL,
  `status` enum('AVAILABLE','OFF_MARKET','RENTED','SOLD','UNDER_OFFER') NOT NULL,
  `title` varchar(200) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `amenities` text,
  `available_from` varchar(100) DEFAULT NULL,
  `balconies` int DEFAULT NULL,
  `brokerage` varchar(100) DEFAULT NULL,
  `built_up_area` double DEFAULT NULL,
  `carpet_area` double DEFAULT NULL,
  `covered_parking` int DEFAULT NULL,
  `floor_no` varchar(30) DEFAULT NULL,
  `lock_in_period` varchar(100) DEFAULT NULL,
  `maintenance_charges` varchar(100) DEFAULT NULL,
  `open_parking` int DEFAULT NULL,
  `pet_friendly` bit(1) DEFAULT NULL,
  `preferred_tenant` varchar(50) DEFAULT NULL,
  `property_age` varchar(50) DEFAULT NULL,
  `property_category` varchar(50) DEFAULT NULL,
  `security_deposit` varchar(100) DEFAULT NULL,
  `society_name` varchar(200) DEFAULT NULL,
  `total_floors` int DEFAULT NULL,
  `furnishing_details` text,
  `bachelor_preference` varchar(50) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `transaction_type` varchar(50) DEFAULT NULL,
  `construction_status` varchar(50) DEFAULT NULL,
  `additional_info` text,
  `best_suited_for` varchar(100) DEFAULT NULL,
  `common_areas` text,
  `electricity_charges_per_month` double DEFAULT NULL,
  `manager_stays_at_property` bit(1) DEFAULT NULL,
  `meal_charges_per_month` double DEFAULT NULL,
  `meals_available` bit(1) DEFAULT NULL,
  `notice_period` varchar(50) DEFAULT NULL,
  `onetime_move_in_charges` double DEFAULT NULL,
  `pg_for` varchar(50) DEFAULT NULL,
  `pg_furnishings` text,
  `pg_name` varchar(200) DEFAULT NULL,
  `pg_rooms` text,
  `pg_rules` text,
  `pg_security_amenities` text,
  `pg_services` text,
  `pg_top_amenities` text,
  `property_managed_by` varchar(100) DEFAULT NULL,
  `total_beds` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_prop_city` (`city`),
  KEY `idx_prop_location` (`location`),
  KEY `idx_prop_price` (`price`),
  KEY `idx_prop_type` (`property_type`),
  KEY `idx_prop_listing_type` (`listing_type`),
  KEY `idx_prop_status` (`status`),
  KEY `idx_prop_created` (`created_at`),
  KEY `FKev1rvgy8cdnmwc94rub8go6fc` (`project_id`),
  KEY `idx_prop_slug` (`slug`),
  CONSTRAINT `FKev1rvgy8cdnmwc94rub8go6fc` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (3,2430,2,3,'Gurgaon ','2026-09-22 10:17:36.648485','Nice flat and nice location','SEMI_FURNISHED','RENT','Garden villas, Block C2, Dlf phase 4, Gurgaon ',125000.00,'INDEPENDENT_HOUSE','RENTED','3 BHK INDEPENDENT HOUSE for Rent in Garden villas, Block C2, Dlf phase 4, Gurgaon ','2026-09-22 10:17:36.648508',NULL,'[]','1 October 2026',2,'30 Days',2430,1750,1,'3','6 month','Separate: ₹3000/mo',1,_binary '\0','Family','1-5 Years','Residential','2 month','Garden villas, Block C2, Dlf phase 4',4,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-independent-house-for-rent-in-garden-villas-block-c2-dlf-phase-4-gurgaon-garden-villas-block-c2-dlf-phase-4-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,2500,3,3,'Gurgaon','2026-09-22 10:34:15.959149','Nice work for flat','SEMI_FURNISHED','RENT','Krisumi waterfall residences sector-36A, Dwarka Expressway, Gurgaon',120000.00,'APARTMENT','RENTED','APARTMENT for Rent in Krisumi waterfall residences sector-36A, Dwarka Expressway, Gurgaon','2026-09-23 08:03:44.683309',NULL,'[]','1 October 2026',1,'30 Days',2500,2200,1,'1','6 month','Include in rent',1,_binary '\0','Family, Bachelors, Company','0-1 Years','Residential','2 month','Krisumi waterfall residences sector-36A, Dwarka Expressway',27,'{\"counters\":{\"fan\":5,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":3,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}','Open for both','apartment-for-rent-in-krisumi-waterfall-residences-sector-36a-dwarka-expressway-gurgaon-krisumi-waterfall-residences-sector-36a-dwarka-expressway-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,2400,3,3,'Gurgaon ','2026-09-22 10:46:38.971516','Nice work for flat','SEMI_FURNISHED','RENT','Pioneer apartment ghata, sector 62,golf course Gurgaon, Gurgaon ',130000.00,'APARTMENT','RENTED','APARTMENT for Rent in Pioneer apartment ghata, sector 62,golf course Gurgaon, Gurgaon','2026-09-23 08:04:10.989720',NULL,'[]','1 October 2026',2,'30 Days',2400,1850,1,'12','6 month','Include in rent',1,_binary '\0','Family, Bachelors, Company','5-10 Years','Residential','2 month','Pioneer apartment ghata, sector 62,golf course Gurgaon',23,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}','Open for both','apartment-for-rent-in-pioneer-apartment-ghata-sector-62golf-course-gurgaon-gurgaon-pioneer-apartment-ghata-sector-62golf-course-gurgaon-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,1940,3,3,'Gurgaon ','2026-09-22 11:23:09.672119','Nice flat','FULLY_FURNISHED','RENT','Dlf golf course, sector- 42,gurgaon, Gurgaon ',125000.00,'INDEPENDENT_HOUSE','RENTED','3 BHK INDEPENDENT HOUSE for Rent in Dlf golf course, sector- 42,gurgaon, Gurgaon ','2026-09-22 11:23:09.672138',NULL,'[]','1 October 2026',2,'30 Days',1940,1800,1,'3','6 month','Include in rent',1,_binary '\0','Family, Bachelors, Company','1-5 Years','Residential','2 month','Dlf golf course, sector- 42,gurgaon',4,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":1,\"bed\":3,\"geyser\":2},\"toggles\":{\"chimney\":true,\"modularKitchen\":true,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}','Open for both','3-bhk-independent-house-for-rent-in-dlf-golf-course-sector-42gurgaon-gurgaon-dlf-golf-course-sector-42gurgaon-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,3000,3,3,'Gurgaon ','2026-09-22 11:32:35.558529','Nice flat','SEMI_FURNISHED','RENT','Dlf Beverly park 2,indian airlines pilots society, Gurgaon, Gurgaon ',125000.00,'APARTMENT','RENTED','APARTMENT for Rent in Dlf Beverly park 2,indian airlines pilots society, Gurgaon, Gurgaon','2026-09-23 07:08:58.066009',NULL,'[]','1 October 2026',3,'30 Days',3000,2650,1,'9','6 month','Separate: ₹15000/mo',1,_binary '\0','Family, Company','10+ Years','Residential','2 month','Dlf Beverly park 2,indian airlines pilots society, Gurgaon',14,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'apartment-for-rent-in-dlf-beverly-park-2indian-airlines-pilots-society-gurgaon-gurgaon-dlf-beverly-park-2indian-airlines-pilots-society-gurgaon-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,2700,2,3,'Gurgaon','2026-09-23 08:02:04.756856','Nice flat','SEMI_FURNISHED','RENT','Dlf phase 2,sector -25, Gurgaon',130000.00,'INDEPENDENT_HOUSE','RENTED','3 BHK INDEPENDENT HOUSE for Rent in Dlf phase 2,Dlf city sector- 25 , builder floor, Gurgaon, Gurgaon','2026-09-23 08:02:04.756879',NULL,'[]','2 oct 2026',2,'30 Days',2700,2200,1,'2','6 month','Include in rent',1,_binary '\0','Family','0-1 Years','Residential','2 month','Dlf phase 2,Dlf city sector- 25 , builder floor, Gurgaon',4,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-independent-house-for-rent-in-dlf-phase-2dlf-city-sector-25-builder-floor-gurgaon-gurgaon-dlf-phase-2sector-25-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,2300,3,3,'Gurgaon','2026-09-23 08:15:04.733908','Nice work for flat','SEMI_FURNISHED','RENT','Dlf phase 3,Dlf city gurgaon',150000.00,'INDEPENDENT_FLOOR','RENTED','3 BHK INDEPENDENT FLOOR for Rent in Builder floor, , Gurgaon','2026-09-23 08:15:04.733933',NULL,'[]','2 oct 2026',2,'30 Days',2300,2299,1,'4','6 month','Separate: ₹5000/mo',3,_binary '\0','Family, Bachelors','0-1 Years','Residential','2 month','Builder floor, ',4,'{\"counters\":{\"fan\":3,\"light\":3,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}','Open for both','3-bhk-independent-floor-for-rent-in-builder-floor-gurgaon-dlf-phase-3dlf-city-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,2260,3,3,'Gurgaon ','2026-09-24 07:37:34.268509','Nice flat','SEMI_FURNISHED','SALE','Krisumi waterside residence sector-36A, Dwarka Expressway, Gurgaon',47500000.00,'INDEPENDENT_FLOOR','AVAILABLE','3 BHK INDEPENDENT FLOOR for Sale in Krisumi waterside residence, Gurgaon ','2026-09-24 07:37:34.268540',NULL,'[]',NULL,2,'1%',2260,NULL,1,'1',NULL,'₹3000/mo',1,_binary '\0',NULL,'Under Construction','Residential',NULL,'Krisumi waterside residence',4,'{\"counters\":{\"fan\":3,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-independent-floor-for-sale-in-krisumi-waterside-residence-gurgaon-krisumi-waterside-residence-sector-36a-dwarka-expressway-gurgaon-gurgaon','New Booking','Under Construction',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,2000,3,4,'Gurgaon ','2026-09-24 07:47:44.377063','Nice flat and nice work','SEMI_FURNISHED','SALE','Dlf cyber city, Dlf phase 2 Dwarka Expressway ',39000000.00,'APARTMENT','AVAILABLE','4 BHK APARTMENT for Sale in Dlf belvedere park, Gurgaon','2026-09-24 07:48:40.049670',NULL,'[]',NULL,2,'1%',2000,NULL,1,'13',NULL,'₹3000/mo',1,_binary '\0',NULL,'10+ Years','Residential',NULL,'Dlf belvedere park',18,'{\"counters\":{\"fan\":5,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'4-bhk-apartment-for-sale-in-dlf-belvedere-park-gurgaon-dlf-cyber-city-dlf-phase-2-dwarka-expressway-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,2416,3,4,'Gurgaon ','2026-09-24 08:19:18.180565','Nice flat','FULLY_FURNISHED','SALE','Sector 67,gurgaon',40000000.00,'APARTMENT','AVAILABLE','4 BHK APARTMENT for Sale in Ireo the corridoes apartment sector 67,gurgaon, Gurgaon ','2026-09-24 08:19:18.180591',NULL,'[]',NULL,3,'1%',2416,NULL,2,'11',NULL,'₹3000/mo',1,_binary '\0',NULL,'1-5 Years','Residential',NULL,'Ireo the corridoes apartment sector 67,gurgaon',14,'',NULL,'4-bhk-apartment-for-sale-in-ireo-the-corridoes-apartment-sector-67gurgaon-gurgaon-sector-67gurgaon-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,1509,2,2,'Gurgaon ','2026-09-24 10:03:56.005628','Nice location and nice apartment','UNFURNISHED','SALE','Sector-62, golf course extension road, gurgaon',37000000.00,'APARTMENT','AVAILABLE','2 BHK APARTMENT for Sale in Emaar digi homes sector-62, golf course extension road gurgaon, Gurgaon ','2026-09-24 10:03:56.005656',NULL,'[]',NULL,2,'1%',1509,NULL,1,'13',NULL,'₹3000/mo',1,_binary '\0',NULL,'1-5 Years','Residential',NULL,'Emaar digi homes sector-62, golf course extension road gurgaon',30,'',NULL,'2-bhk-apartment-for-sale-in-emaar-digi-homes-sector-62-golf-course-extension-road-gurgaon-gurgaon-sector-62-golf-course-extension-road-gurgaon-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,3930,4,4,'Gurgaon','2026-09-24 10:13:22.068049','Luxury work bhi','SEMI_FURNISHED','SALE','Sector -48, sohna road gurgaon',155000000.00,'APARTMENT','AVAILABLE','4 BHK APARTMENT for Sale in Central Park resorts sector-48, sohna road, gurgaon, Gurgaon','2026-09-24 10:13:22.068073',NULL,'[]',NULL,3,'1%',3930,NULL,1,'6',NULL,'₹3000/mo',1,_binary '\0',NULL,'5-10 Years','Residential',NULL,'Central Park resorts sector-48, sohna road, gurgaon',17,'{\"counters\":{\"fan\":6,\"light\":5,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'4-bhk-apartment-for-sale-in-central-park-resorts-sector-48-sohna-road-gurgaon-gurgaon-sector-48-sohna-road-gurgaon-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,3750,5,5,'Gurgaon ','2026-09-24 10:23:02.299840','Nice flats','SEMI_FURNISHED','SALE','Sector-83, Dwarka Expressway',45000000.00,'APARTMENT','AVAILABLE','5 BHK APARTMENT for Sale in Emaar palm gardens, sector-83, Dwarka Expressway, Gurgaon ','2026-09-24 10:23:02.299855',NULL,'[]',NULL,5,'1%',3750,NULL,1,'12',NULL,'₹3000/mo',0,_binary '\0',NULL,'0-1 Years','Residential',NULL,'Emaar palm gardens, sector-83, Dwarka Expressway',16,'{\"counters\":{\"fan\":7,\"light\":6,\"ac\":0,\"wardrobe\":4,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'5-bhk-apartment-for-sale-in-emaar-palm-gardens-sector-83-dwarka-expressway-gurgaon-sector-83-dwarka-expressway-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,2882,3,3,'Gurgaon ','2026-09-24 10:30:56.307355','Nice work for flat','SEMI_FURNISHED','SALE','M3M golfestate Sector-65, golf course extension',72100000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in M3m golfestate, sector-65, golf course extension, Gurgaon ','2026-09-24 10:30:56.307381',NULL,'[]',NULL,3,'1%',2882,NULL,2,'22',NULL,'₹3000/mo',2,_binary '\0',NULL,'0-1 Years','Residential',NULL,'M3m golfestate, sector-65, golf course extension',40,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-sale-in-m3m-golfestate-sector-65-golf-course-extension-gurgaon-m3m-golfestate-sector-65-golf-course-extension-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,2800,3,4,'Gurgaon ','2026-09-26 09:53:34.560385','Nice flats and nice work','SEMI_FURNISHED','SALE','Sector-85, new gurgaon',36200000.00,'APARTMENT','AVAILABLE','4 BHK APARTMENT for Sale in Godrej Air apartment sector-85, new Gurgaon, Gurgaon ','2026-09-26 09:53:34.560406',NULL,'[]',NULL,3,'1%',2800,NULL,1,'20',NULL,'₹3000/mo',1,_binary '\0',NULL,'0-1 Years','Residential',NULL,'Godrej Air apartment sector-85, new Gurgaon',25,'{\"counters\":{\"fan\":4,\"light\":5,\"ac\":0,\"wardrobe\":4,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'4-bhk-apartment-for-sale-in-godrej-air-apartment-sector-85-new-gurgaon-gurgaon-sector-85-new-gurgaon-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,1765,2,3,'Gurgaon ','2026-09-26 10:03:58.399122','Nice apartment','SEMI_FURNISHED','SALE','Corona gracieux, sector-76, new gurgaon, gurgaon',35800000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in Corona gracieux, sector-76, nee gurgaon, gurgaon, Gurgaon ','2026-09-26 10:03:58.399144',NULL,'[]',NULL,2,'1%',1765,NULL,1,'8',NULL,'₹3000/mo',1,_binary '\0',NULL,'1-5 Years','Residential',NULL,'Corona gracieux, sector-76, nee gurgaon, gurgaon',15,'{\"counters\":{\"fan\":3,\"light\":5,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-sale-in-corona-gracieux-sector-76-nee-gurgaon-gurgaon-gurgaon-corona-gracieux-sector-76-new-gurgaon-gurgaon-gurgaon','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,2000,3,3,'Gurgaon ','2026-09-26 10:18:33.536892','Nice location','UNFURNISHED','SALE','N block, N5/67, Dlf phase 2,Dlf city, gurgaon',45000000.00,'INDEPENDENT_FLOOR','AVAILABLE','3 BHK INDEPENDENT FLOOR for Sale in Ashley estate floors-8, , Gurgaon ','2026-09-26 10:18:33.536905',NULL,'[]',NULL,2,'1%',2000,NULL,1,'3',NULL,'₹3000/mo',1,_binary '\0',NULL,'Under Construction','Residential',NULL,'Ashley estate floors-8, ',4,'',NULL,'3-bhk-independent-floor-for-sale-in-ashley-estate-floors-8-gurgaon-n-block-n567-dlf-phase-2dlf-city-gurgaon-gurgaon','New Booking','Under Construction',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,1900,3,3,'Gurgaon ','2026-09-26 11:02:25.714492','Nice flat','FULLY_FURNISHED','RENT','M3M skycity sector-65, golf course extension, gurgaon',100000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Rent in M3M skycity sector-65, golf course extension, gurgaon, Gurgaon ','2026-09-26 11:02:25.714513',NULL,'[]','1 October 2026',2,'15 Days',1900,1850,1,'40','6 month','Separate: ₹7000/mo',0,_binary '\0','Family, Bachelors, Company','1-5 Years','Residential','2 month','M3M skycity sector-65, golf course extension, gurgaon',47,'{\"counters\":{\"fan\":4,\"light\":6,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":2,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":true,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}','Open for both','3-bhk-apartment-for-rent-in-m3m-skycity-sector-65-golf-course-extension-gurgaon-gurgaon-m3m-skycity-sector-65-golf-course-extension-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,1350,4,3,'Gurgaon ','2026-09-26 11:17:26.376565','Nice flat, and parking charges included in rent','SEMI_FURNISHED','RENT','Sector-33 , sohna road, gurgaon',49500.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Rent in Unitech the residence sector-33, sohna road, gurgaon, Gurgaon ','2026-09-26 11:17:26.376581',NULL,'[]','2 oct 2026',3,'30 Days',1350,1150,1,'5','6 month','Separate: ₹7000/mo',1,_binary '\0','Family, Company','10+ Years','Residential','2 month','Unitech the residence sector-33, sohna road, gurgaon',14,'{\"counters\":{\"fan\":3,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-rent-in-unitech-the-residence-sector-33-sohna-road-gurgaon-gurgaon-sector-33-sohna-road-gurgaon-gurgaon',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,1000,3,3,'Delhi ','2026-09-29 11:23:28.399827','Nice society','UNFURNISHED','SALE','Mahavir vihar Sector- 1, Dwarka Delhi',16000000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in Dda apna niwas apartment, Delhi ','2026-09-29 11:23:28.399866',NULL,'[]',NULL,3,'1%',1000,NULL,1,'2',NULL,'₹2500/mo',1,_binary '\0',NULL,'10+ Years','Residential',NULL,'Dda apna niwas apartment',4,'',NULL,'3-bhk-apartment-for-sale-in-dda-apna-niwas-apartment-delhi-mahavir-vihar-sector-1-dwarka-delhi-delhi','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,1750,3,3,'Delhi','2026-09-29 11:43:44.791219','Nice flat and nice location','SEMI_FURNISHED','SALE','Pocket 1,sector-2, Dwarka South delhi',27600000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in Cghs celestial heights pocket 1,sector-2, Dwarka South delhi, Delhi','2026-09-29 11:43:44.791238',NULL,'[]',NULL,3,'1%',1750,NULL,1,'6',NULL,'₹3000/mo',1,_binary '\0',NULL,'10+ Years','Residential',NULL,'Cghs celestial heights pocket 1,sector-2, Dwarka South delhi',8,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-sale-in-cghs-celestial-heights-pocket-1sector-2-dwarka-south-delhi-delhi-pocket-1sector-2-dwarka-south-delhi-delhi','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(24,1600,2,3,'Delhi ','2026-09-29 12:33:36.903112','3bhk Nice flat available','SEMI_FURNISHED','SALE','Aastha kunj apartment sector-3, Dwarka, south west delhi',26500000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in Aastha kunj apartment sector-3, Delhi ','2026-09-29 12:33:36.903126',NULL,'[]',NULL,2,'1%',1600,NULL,1,'2',NULL,'₹3000/mo',1,_binary '\0',NULL,'10+ Years','Residential',NULL,'Aastha kunj apartment sector-3',7,'{\"counters\":{\"fan\":3,\"light\":5,\"ac\":0,\"wardrobe\":2,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-sale-in-aastha-kunj-apartment-sector-3-delhi-aastha-kunj-apartment-sector-3-dwarka-south-west-delhi-delhi','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(25,1600,3,3,'Delhi ','2026-09-29 12:48:49.634234','Semifurnised flat','SEMI_FURNISHED','SALE','Sector-4, Dwarka, south west delhi',32000000.00,'APARTMENT','AVAILABLE','3 BHK APARTMENT for Sale in Sarve satyam apartment sector-4, Delhi ','2026-09-29 12:48:49.634253',NULL,'[]',NULL,3,'1%',1600,NULL,1,'4',NULL,'₹3000/mo',1,_binary '\0',NULL,'10+ Years','Residential',NULL,'Sarve satyam apartment sector-4',10,'{\"counters\":{\"fan\":4,\"light\":4,\"ac\":0,\"wardrobe\":3,\"tv\":0,\"bed\":0,\"geyser\":0},\"toggles\":{\"chimney\":false,\"modularKitchen\":false,\"diningTable\":false,\"washingMachine\":false,\"cupboard\":false,\"sofa\":false,\"microwave\":false,\"stove\":false,\"fridge\":false,\"waterPurifier\":false,\"gasPipeline\":false,\"exhaustFan\":false,\"curtains\":false}}',NULL,'3-bhk-apartment-for-sale-in-sarve-satyam-apartment-sector-4-delhi-sector-4-dwarka-south-west-delhi-delhi','Resale','Ready to Move',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `is_primary` bit(1) NOT NULL,
  `property_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_img_property` (`property_id`),
  CONSTRAINT `FKemw5i1cysiorfaxfba7tgtpiu` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (15,'2026-09-22 10:17:40.740217','/uploads/properties/68ee49fd-9db0-4807-b946-c9a50502b686_1000661144.jpg',_binary '',3),(16,'2026-09-22 10:17:42.316691','/uploads/properties/b277a3c0-76c5-49ff-9c70-73f5b421eed0_1000661143.jpg',_binary '\0',3),(17,'2026-09-22 10:17:44.118305','/uploads/properties/a1d6540c-1c24-4e3e-89b5-ff72684d8275_1000661142.jpg',_binary '\0',3),(18,'2026-09-22 10:17:45.971995','/uploads/properties/e3bcec42-5225-4087-9d23-acd57a4edeb7_1000661141.jpg',_binary '\0',3),(19,'2026-09-22 10:17:47.632936','/uploads/properties/52c2cb7d-d74a-4c29-84da-968a213e631c_1000661140.jpg',_binary '\0',3),(20,'2026-09-22 10:17:49.245030','/uploads/properties/4b2e8bd1-6122-49d0-aaae-5c66aa090725_1000661139.jpg',_binary '\0',3),(21,'2026-09-22 10:34:19.140931','/uploads/properties/d481fdd1-a560-4896-869e-c62b7247f154_1000661164.jpg',_binary '',4),(22,'2026-09-22 10:34:20.599678','/uploads/properties/3f3daff5-30c7-44ff-9d3a-66de80eb5b3c_1000661161.jpg',_binary '\0',4),(23,'2026-09-22 10:34:22.141177','/uploads/properties/d82dce33-8a92-4e51-a21e-24f55c8966a9_1000661160.jpg',_binary '\0',4),(24,'2026-09-22 10:34:23.794730','/uploads/properties/b36ae149-aff7-41fe-a26e-c8cc56482d79_1000661159.jpg',_binary '\0',4),(25,'2026-09-22 10:34:25.465572','/uploads/properties/9ffbbe08-e0d0-4444-b329-4f651fda9dcc_1000661158.jpg',_binary '\0',4),(26,'2026-09-22 10:34:27.035678','/uploads/properties/679f80a7-c5a6-40ee-87be-8ea7e916d13f_1000661157.jpg',_binary '\0',4),(27,'2026-09-22 10:46:41.202665','/uploads/properties/8415d2d8-6954-4c7a-921b-196d06a500cf_1000661175.jpg',_binary '',5),(28,'2026-09-22 10:46:42.787428','/uploads/properties/95860011-c34c-4275-b3f1-3cb87c1962c0_1000661174.jpg',_binary '\0',5),(29,'2026-09-22 10:46:44.649005','/uploads/properties/7e8d76a6-9685-4f75-b0b4-a917587b2d5f_1000661173.jpg',_binary '\0',5),(30,'2026-09-22 11:23:12.921569','/uploads/properties/d4f3dc8f-4698-4856-88d6-c944fdee4c83_1000661202.jpg',_binary '',6),(31,'2026-09-22 11:23:14.564213','/uploads/properties/813ecf87-72f4-4eed-9585-1a90ae8175d7_1000661201.jpg',_binary '\0',6),(32,'2026-09-22 11:23:16.188911','/uploads/properties/70db055b-ed03-4fd3-9f65-619107871058_1000661200.jpg',_binary '\0',6),(33,'2026-09-22 11:23:17.853361','/uploads/properties/d7a8092c-3fc0-4c19-9c77-53078529f3e8_1000661199.jpg',_binary '\0',6),(34,'2026-09-22 11:32:37.964646','/uploads/properties/f1771b7b-2c51-4136-9367-6d608b675bf0_1000661215.jpg',_binary '',7),(35,'2026-09-22 11:32:39.794331','/uploads/properties/ba6b32b6-9f7b-4fcf-8199-846c78186491_1000661214.jpg',_binary '\0',7),(36,'2026-09-22 11:32:41.637611','/uploads/properties/81e45566-e2dd-429d-8f10-7299c5ea3519_1000661213.jpg',_binary '\0',7),(37,'2026-09-23 08:02:08.217685','/uploads/properties/0a02cdf9-1802-4727-bdf6-e28550fd9ff9_1000661637.jpg',_binary '',8),(38,'2026-09-23 08:02:09.716560','/uploads/properties/5f204d40-0f6d-4970-9d07-22cb33944e4f_1000661636.jpg',_binary '\0',8),(39,'2026-09-23 08:02:11.259320','/uploads/properties/3931aad6-913b-41b1-86bc-931966d97e44_1000661635.jpg',_binary '\0',8),(40,'2026-09-23 08:02:12.799628','/uploads/properties/40fe238a-f515-404b-bcc0-0cb98c61a9cc_1000661634.jpg',_binary '\0',8),(41,'2026-09-23 08:02:14.631715','/uploads/properties/206275e1-7d44-4f6b-adc7-5f101f903ee7_1000661633.jpg',_binary '\0',8),(42,'2026-09-23 08:02:16.437055','/uploads/properties/5c149894-3db5-409a-996a-630a472b79e5_1000661632.jpg',_binary '\0',8),(43,'2026-09-23 08:02:18.011621','/uploads/properties/5ea4a755-06c1-4b3e-bb07-1ed3344afa5d_1000661631.jpg',_binary '\0',8),(44,'2026-09-23 08:15:06.943549','/uploads/properties/615448c4-c578-413e-bf61-03b31800b024_1000661649.jpg',_binary '',9),(45,'2026-09-23 08:15:08.781011','/uploads/properties/1c07f9e9-2533-4567-a62c-dc4da77c254c_1000661648.jpg',_binary '\0',9),(46,'2026-09-23 08:15:10.521202','/uploads/properties/e50aa7c4-f47d-4a55-bf87-eee73137911c_1000661647.jpg',_binary '\0',9),(47,'2026-09-24 07:37:37.117029','/uploads/properties/66b7fae9-1a22-4013-9227-0a8d1c5bd535_1000661986.jpg',_binary '',10),(48,'2026-09-24 07:37:38.780535','/uploads/properties/c0e7d57c-e9ec-44f8-ab47-73b9b6882df7_1000661985.jpg',_binary '\0',10),(49,'2026-09-24 07:37:40.611285','/uploads/properties/2a44424c-5521-4aef-b4f4-d946202413c6_1000661984.jpg',_binary '\0',10),(50,'2026-09-24 07:37:42.114175','/uploads/properties/f68def97-ea9b-4061-84f6-ff8eb56eab2a_1000661983.jpg',_binary '\0',10),(51,'2026-09-24 07:37:43.637611','/uploads/properties/75e819fa-9e87-4958-8289-3e0d62377135_1000661982.jpg',_binary '\0',10),(57,'2026-09-24 07:48:42.318406','/uploads/properties/5420a09e-a892-4cf8-b1b1-4d1baa937b81_1000662001.jpg',_binary '',11),(58,'2026-09-24 07:48:44.358525','/uploads/properties/4b1a6e15-8604-4c62-b577-c503af5a8083_1000662000.jpg',_binary '\0',11),(59,'2026-09-24 07:48:46.186016','/uploads/properties/04829b4b-a5c6-4da1-87f7-95940646a6d4_1000661999.jpg',_binary '\0',11),(60,'2026-09-24 07:48:47.789516','/uploads/properties/b8f5d718-671d-41f2-963c-70f57bf21852_1000661998.jpg',_binary '\0',11),(61,'2026-09-24 07:48:49.340186','/uploads/properties/b5e43751-ffbe-467f-84cb-c7f11fadba7f_1000661997.jpg',_binary '\0',11),(62,'2026-09-24 08:19:21.130143','/uploads/properties/c3a1b590-f616-4b83-8fe1-7f816cbf37be_1000662030.jpg',_binary '',12),(63,'2026-09-24 08:19:22.653856','/uploads/properties/0c3ccfc6-8a40-4ac7-9ee4-7bb30aff3219_1000662029.jpg',_binary '\0',12),(64,'2026-09-24 10:03:58.214557','/uploads/properties/dc74a4f7-d731-4c60-a6ce-31abdcdb54fe_1000662073.jpg',_binary '',13),(65,'2026-09-24 10:03:59.769565','/uploads/properties/37b072c5-1da4-4df3-b361-4028b5489d57_1000662072.jpg',_binary '\0',13),(66,'2026-09-24 10:04:01.376237','/uploads/properties/fdca5232-4e07-4ddc-bec1-09d8481a8563_1000662071.jpg',_binary '\0',13),(67,'2026-09-24 10:04:02.947034','/uploads/properties/6ba0b8cf-e35d-4648-bacd-09726d50ed22_1000662070.jpg',_binary '\0',13),(68,'2026-09-24 10:04:04.858073','/uploads/properties/77ff3ad6-54f0-4af7-9b67-c193aece5650_1000662069.jpg',_binary '\0',13),(69,'2026-09-24 10:13:24.454502','/uploads/properties/26a6256d-529e-4a32-b375-3c6bbab1c8c0_1000662091.jpg',_binary '',14),(70,'2026-09-24 10:13:26.032619','/uploads/properties/b5c4259a-ac16-46b3-a227-6bf263a96d7c_1000662090.jpg',_binary '\0',14),(71,'2026-09-24 10:13:27.808015','/uploads/properties/f736baeb-ced3-47d3-be5b-cbe4eae0b6fc_1000662089.jpg',_binary '\0',14),(72,'2026-09-24 10:13:29.396068','/uploads/properties/503cc0fa-b231-4db3-be56-5f4bf2379f95_1000662088.jpg',_binary '\0',14),(73,'2026-09-24 10:13:30.962722','/uploads/properties/8e8e2197-863c-44f6-a531-3c737c8d45bc_1000662087.jpg',_binary '\0',14),(74,'2026-09-24 10:23:04.608667','/uploads/properties/7c86cda1-8434-40f4-b9e9-78856b19221c_1000662104.jpg',_binary '',15),(75,'2026-09-24 10:23:06.398835','/uploads/properties/baed66a4-2097-447e-8c1b-657595a316a4_1000662103.jpg',_binary '\0',15),(76,'2026-09-24 10:23:08.158021','/uploads/properties/870867e3-94d8-4d82-911e-4aa2177859d4_1000662102.jpg',_binary '\0',15),(77,'2026-09-24 10:30:58.452138','/uploads/properties/39b0dd17-9a3b-4074-9482-000e4170ac4e_1000662110.jpg',_binary '',16),(78,'2026-09-24 10:31:00.352401','/uploads/properties/546892d3-f7bb-4983-ad2e-71a322d823db_1000662109.jpg',_binary '\0',16),(79,'2026-09-26 09:53:37.774497','/uploads/properties/61a201b2-f914-4f84-a1be-5997e1762b11_1000663026.jpg',_binary '',17),(80,'2026-09-26 09:53:39.340621','/uploads/properties/f0f95ebd-c2ec-4d8d-b5fa-7c2662de54e1_1000663025.jpg',_binary '\0',17),(81,'2026-09-26 09:53:41.218676','/uploads/properties/fa767c84-100a-494f-9976-9e6654293f1e_1000663024.jpg',_binary '\0',17),(82,'2026-09-26 10:04:00.787929','/uploads/properties/01b63227-285b-4ecf-9562-1b3591d0dc69_1000663041.jpg',_binary '',18),(83,'2026-09-26 10:04:02.577324','/uploads/properties/2c287fbc-afea-4c23-a6e1-2d63f5309664_1000663040.jpg',_binary '\0',18),(84,'2026-09-26 10:04:04.443035','/uploads/properties/d0e52ded-e28d-4309-b78f-dab0bddc085e_1000663039.jpg',_binary '\0',18),(85,'2026-09-26 10:04:06.229921','/uploads/properties/4943ffcd-d68d-4175-a96e-7bf5da236b8e_1000663038.jpg',_binary '\0',18),(86,'2026-09-26 10:04:08.020882','/uploads/properties/fc7d46ee-a8ce-4cd2-925f-18132d463ad3_1000663037.jpg',_binary '\0',18),(87,'2026-09-26 10:18:36.059032','/uploads/properties/3b400dfb-e004-46e1-8166-52255867ae68_1000663056.jpg',_binary '',19),(88,'2026-09-26 10:18:37.913444','/uploads/properties/24b3ffad-d466-46ac-94c2-e7e6ac840870_1000663055.jpg',_binary '\0',19),(89,'2026-09-26 10:18:39.683257','/uploads/properties/96f90faf-c8c1-4bf6-a9d5-56a786edfc2f_1000663054.jpg',_binary '\0',19),(90,'2026-09-26 10:18:41.429032','/uploads/properties/d5211f46-0f32-4ebc-afa8-cf136b5213fb_1000663053.jpg',_binary '\0',19),(91,'2026-09-26 10:18:43.195894','/uploads/properties/93e29c60-c94c-49ad-ae45-c275f45d5684_1000663052.jpg',_binary '\0',19),(92,'2026-09-26 11:02:27.771640','/uploads/properties/2fbfa060-a7b4-450d-8e22-0e957b5b13a3_1000663067.jpg',_binary '',20),(93,'2026-09-26 11:02:29.323067','/uploads/properties/26db4449-52bb-4461-bbb7-a9bb1c32c593_1000663068.jpg',_binary '\0',20),(94,'2026-09-26 11:02:30.913024','/uploads/properties/dcce10ca-d555-4bd6-a53f-86be6b21534d_1000663066.jpg',_binary '\0',20),(95,'2026-09-26 11:02:32.502822','/uploads/properties/83f39492-7d5f-4ecd-a4ae-7e859f3b77ea_1000663065.jpg',_binary '\0',20),(96,'2026-09-26 11:17:28.645941','/uploads/properties/6c0acf21-2d9a-4f71-987b-c95abb43e572_1000663089.jpg',_binary '',21),(97,'2026-09-26 11:17:30.220950','/uploads/properties/ee9c3c83-711a-452c-a39c-239df7ed6e04_1000663088.jpg',_binary '\0',21),(98,'2026-09-26 11:17:31.585640','/uploads/properties/5acbb5ce-6f51-41e2-9c54-fbdb0f556ab7_1000663087.jpg',_binary '\0',21),(99,'2026-09-26 11:17:33.139294','/uploads/properties/0e2c4480-60fa-456f-a9be-97477aeca8f9_1000663086.jpg',_binary '\0',21),(100,'2026-09-26 11:17:34.965236','/uploads/properties/f2b41eb6-2a5b-49e6-acad-3d5dc944c3a8_1000663085.jpg',_binary '\0',21),(101,'2026-09-26 11:17:36.607708','/uploads/properties/250be6aa-1eeb-4201-8704-bafa3e004004_1000663084.jpg',_binary '\0',21),(102,'2026-09-26 11:17:38.458614','/uploads/properties/24e59671-e6cd-470e-83ac-22cb021e9448_1000663083.jpg',_binary '\0',21),(103,'2026-09-29 11:23:32.402042','/uploads/properties/eab04e16-d901-4e29-ba56-cd6861cb3f09_1000664595.jpg',_binary '',22),(104,'2026-09-29 11:23:34.219909','/uploads/properties/ab9f52e0-a4d8-4052-9ae9-a5af061089b0_1000664594.jpg',_binary '\0',22),(105,'2026-09-29 11:23:35.834230','/uploads/properties/29aded1f-bb4b-4049-9119-98521e7592da_1000664593.jpg',_binary '\0',22),(106,'2026-09-29 11:43:49.745173','/uploads/properties/5f74b15b-a77f-4009-b396-672257b0424e_1000664619.jpg',_binary '',23),(107,'2026-09-29 11:43:50.991487','/uploads/properties/8741c874-0802-4dc8-8402-358005bc2d04_1000664618.jpg',_binary '\0',23),(108,'2026-09-29 11:43:52.830144','/uploads/properties/07ac2426-7e8e-4488-b89b-dbeb7fb8986d_1000664617.jpg',_binary '\0',23),(109,'2026-09-29 11:43:54.691652','/uploads/properties/a36cbc80-1cb0-4eac-95b9-a1fe1774bb80_1000664615.jpg',_binary '\0',23),(110,'2026-09-29 11:43:56.259376','/uploads/properties/522c7fcf-b054-40de-b049-bfd11723b73e_1000664614.jpg',_binary '\0',23),(111,'2026-09-29 11:43:58.082812','/uploads/properties/b54d4dd2-cd71-4dc9-92ec-be9c9a4a5b75_1000664616.jpg',_binary '\0',23),(112,'2026-09-29 11:43:59.418076','/uploads/properties/a4bfc4c8-8243-453d-874d-cb2c00283042_1000664613.jpg',_binary '\0',23),(113,'2026-09-29 11:44:01.319594','/uploads/properties/493ab402-e7b0-4dad-995d-01a774e34707_1000664612.jpg',_binary '\0',23),(114,'2026-09-29 11:44:02.881613','/uploads/properties/9825c023-3435-4641-8ba6-04558ca9ad06_1000664595.jpg',_binary '\0',23),(115,'2026-09-29 12:33:41.057776','/uploads/properties/9724910b-3385-4014-8d90-197077004535_1000664644.jpg',_binary '',24),(116,'2026-09-29 12:33:42.725767','/uploads/properties/d0f90528-407e-4357-bb1e-23b9b5a842c7_1000664643.jpg',_binary '\0',24),(117,'2026-09-29 12:33:44.266743','/uploads/properties/79bd723f-6cbe-440b-a2a0-d2af1e0a5063_1000664642.jpg',_binary '\0',24),(118,'2026-09-29 12:33:45.815262','/uploads/properties/e687153b-186a-4e15-8898-67f9f88c2da2_1000664641.jpg',_binary '\0',24),(119,'2026-09-29 12:33:47.539788','/uploads/properties/96d7bcac-59cd-42ac-9f02-cf341ec94164_1000664640.jpg',_binary '\0',24),(120,'2026-09-29 12:48:53.831202','/uploads/properties/87131588-af60-44d0-abb6-e716f6aa6209_1000664662.jpg',_binary '',25),(121,'2026-09-29 12:48:55.406193','/uploads/properties/46015aae-db5c-4355-83e4-b1d8d3a01f48_1000664661.jpg',_binary '\0',25),(122,'2026-09-29 12:48:56.982567','/uploads/properties/49ba5fd7-ac74-4c82-bf69-2cd8c907a11c_1000664660.jpg',_binary '\0',25),(123,'2026-09-29 12:48:58.565866','/uploads/properties/b59feeb9-76a3-4ad2-bd9e-5bc678d759d3_1000664659.jpg',_binary '\0',25),(124,'2026-09-29 12:49:00.171714','/uploads/properties/d0466937-18b4-4633-affe-16b0734a2215_1000664658.jpg',_binary '\0',25),(125,'2026-09-29 12:49:01.911997','/uploads/properties/4e801477-49d5-4151-bf97-82c636497736_1000664657.jpg',_binary '\0',25);
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(120) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') NOT NULL,
  `status` enum('ACTIVE','INACTIVE','SUSPENDED') NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_email` (`email`),
  KEY `idx_user_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-09-14 08:35:09.976980','keystonexhelpdeskp@gmail.com','Keystone Executive Admin','$2a$10$qyoqT1V0xN96iObIWkGb/uMsBWjyDfrVgA9aS0RHUW9endaYDjJsG','9911956274','ROLE_ADMIN','ACTIVE','2026-09-14 08:35:09.977018');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-06 12:28:28
