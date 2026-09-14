package com.keystone.repository;

import com.keystone.entity.ProjectConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectConfigurationRepository extends JpaRepository<ProjectConfiguration, Long> {
    List<ProjectConfiguration> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);
}
