package com.keystone.dto.request;

import com.keystone.entity.VideoType;
import jakarta.validation.constraints.NotBlank;

public class ProjectVideoRequest {

    @NotBlank(message = "Video title is required")
    private String title;

    @NotBlank(message = "Video URL is required")
    private String videoUrl;

    private VideoType videoType = VideoType.YOUTUBE;
    private Integer displayOrder = 0;

    public ProjectVideoRequest() {}

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public VideoType getVideoType() { return videoType; }
    public void setVideoType(VideoType videoType) { this.videoType = videoType; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
