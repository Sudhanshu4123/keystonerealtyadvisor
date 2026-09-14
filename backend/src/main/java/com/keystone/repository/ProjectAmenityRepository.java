package com.keystone.repository;

import com.keystone.entity.ProjectAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectAmenityRepository extends JpaRepository<ProjectAmenity, Long> {
    List<ProjectAmenity> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);
}
