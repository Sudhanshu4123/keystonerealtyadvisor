package com.keystone.repository;

import com.keystone.entity.Project;
import com.keystone.entity.ProjectStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {

    Optional<Project> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);

    Page<Project> findByStatus(ProjectStatus status, Pageable pageable);

    List<Project> findTop6ByStatusAndIsFeaturedTrueOrderByCreatedAtDesc(ProjectStatus status);

    long countByStatus(ProjectStatus status);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.configurations LEFT JOIN FETCH p.amenities WHERE p.id = :id")
    Optional<Project> findByIdWithDetails(@Param("id") Long id);

    @Query("SELECT p FROM Project p LEFT JOIN FETCH p.configurations LEFT JOIN FETCH p.amenities WHERE p.slug = :slug")
    Optional<Project> findBySlugWithDetails(@Param("slug") String slug);
}
