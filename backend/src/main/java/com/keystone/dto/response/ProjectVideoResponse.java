package com.keystone.dto.response;

import com.keystone.entity.VideoType;

public class ProjectVideoResponse {

    private Long id;
    private String title;
    private String videoUrl;
    private VideoType videoType;
    private Integer displayOrder;

    public ProjectVideoResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public VideoType getVideoType() { return videoType; }
    public void setVideoType(VideoType videoType) { this.videoType = videoType; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
