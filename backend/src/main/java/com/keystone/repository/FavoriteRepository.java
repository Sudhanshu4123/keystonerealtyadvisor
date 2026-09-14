package com.keystone.repository;

import com.keystone.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserIdAndPropertyId(Long userId, Long propertyId);
    boolean existsByUserIdAndPropertyId(Long userId, Long propertyId);
    Page<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    List<Favorite> findByUserId(Long userId);
    void deleteByUserIdAndPropertyId(Long userId, Long propertyId);
}
