package com.keystone.repository;

import com.keystone.entity.ProjectSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectSpecificationRepository extends JpaRepository<ProjectSpecification, Long> {
    List<ProjectSpecification> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);
}
