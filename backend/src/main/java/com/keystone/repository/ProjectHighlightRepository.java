package com.keystone.repository;

import com.keystone.entity.ProjectHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectHighlightRepository extends JpaRepository<ProjectHighlight, Long> {
    List<ProjectHighlight> findByProjectIdOrderByDisplayOrderAscIdAsc(Long projectId);
}
