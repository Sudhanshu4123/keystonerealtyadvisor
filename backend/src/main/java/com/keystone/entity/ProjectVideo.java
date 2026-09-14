package com.keystone.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "project_videos", indexes = {
    @Index(name = "idx_proj_video_proj_id", columnList = "project_id")
})
public class ProjectVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "video_url", nullable = false, length = 500)
    private String videoUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "video_type", length = 30)
    private VideoType videoType = VideoType.YOUTUBE;

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public ProjectVideo() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public VideoType getVideoType() { return videoType; }
    public void setVideoType(VideoType videoType) { this.videoType = videoType; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
