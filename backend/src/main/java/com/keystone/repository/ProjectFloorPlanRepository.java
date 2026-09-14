package com.keystone.repository;

import com.keystone.entity.ProjectFloorPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectFloorPlanRepository extends JpaRepository<ProjectFloorPlan, Long> {
    List<ProjectFloorPlan> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);
}
