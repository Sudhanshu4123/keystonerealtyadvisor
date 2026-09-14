package com.keystone.dto.response;

import com.keystone.entity.ProjectImageType;

public class ProjectImageResponse {

    private Long id;
    private String imageUrl;
    private String caption;
    private ProjectImageType imageType;
    private Boolean isCover;
    private Integer displayOrder;

    public ProjectImageResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }

    public ProjectImageType getImageType() { return imageType; }
    public void setImageType(ProjectImageType imageType) { this.imageType = imageType; }

    public Boolean getIsCover() { return isCover; }
    public void setIsCover(Boolean isCover) { this.isCover = isCover; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
