package com.keystone.repository;

import com.keystone.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    List<ProjectImage> findByProjectIdOrderByDisplayOrderAsc(Long projectId);
    void deleteByProjectId(Long projectId);
}
