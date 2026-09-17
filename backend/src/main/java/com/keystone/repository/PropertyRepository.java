package com.keystone.repository;

import com.keystone.entity.ListingType;
import com.keystone.entity.Property;
import com.keystone.entity.PropertyStatus;
import com.keystone.entity.PropertyType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    
    Optional<Property> findBySlug(String slug);
    
    long countByStatus(PropertyStatus status);
    
    long countByListingType(ListingType listingType);
    
    long countByPropertyType(PropertyType propertyType);
    
    Page<Property> findByStatus(PropertyStatus status, Pageable pageable);
    
    List<Property> findTop6ByStatusOrderByCreatedAtDesc(PropertyStatus status);
}
