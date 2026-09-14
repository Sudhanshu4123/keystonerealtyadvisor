package com.keystone.repository;

import com.keystone.entity.Enquiry;
import com.keystone.entity.EnquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    Page<Enquiry> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    Page<Enquiry> findByPropertyIdOrderByCreatedAtDesc(Long propertyId, Pageable pageable);
    Page<Enquiry> findByStatusOrderByCreatedAtDesc(EnquiryStatus status, Pageable pageable);
    long countByStatus(EnquiryStatus status);
    List<Enquiry> findTop5ByOrderByCreatedAtDesc();
}
