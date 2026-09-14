import api from './api';

export const projectService = {
  // Public & Discovery Methods
  async searchProjects(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    return api.get(`/api/projects?${queryParams.toString()}`);
  },

  async getFeaturedProjects() {
    return api.get('/api/projects/featured');
  },

  async getProjectById(id) {
    return api.get(`/api/projects/${id}`);
  },

  async getProjectBySlug(slug) {
    return api.get(`/api/projects/slug/${slug}`);
  },

  // Admin Project Management
  async getAdminProjects(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    return api.get(`/api/admin/projects?${queryParams.toString()}`);
  },

  async getAdminProjectById(id) {
    return api.get(`/api/admin/projects/${id}`);
  },

  async createProject(data) {
    return api.post('/api/admin/projects', data);
  },

  async updateProject(id, data) {
    return api.put(`/api/admin/projects/${id}`, data);
  },

  async deleteProject(id) {
    return api.delete(`/api/admin/projects/${id}`);
  },

  async updateProjectStatus(id, status) {
    return api.patch(`/api/admin/projects/${id}/status`, { status });
  },

  // Images & Media Management
  async uploadProjectImages(id, files, imageType = 'GALLERY', setFirstAsCover = false) {
    const formData = new FormData();
    if (files instanceof FormData) {
      return api.post(`/api/admin/projects/${id}/images`, files, {
        params: { imageType, setFirstAsCover },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    if (Array.isArray(files)) {
      files.forEach((file) => formData.append('files', file));
    } else {
      formData.append('files', files);
    }
    return api.post(`/api/admin/projects/${id}/images`, formData, {
      params: { imageType, setFirstAsCover },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async deleteProjectImage(imageId) {
    return api.delete(`/api/admin/projects/images/${imageId}`);
  },

  async setProjectCoverImage(projectId, imageId) {
    return api.patch(`/api/admin/projects/${projectId}/cover/${imageId}`);
  },

  // Documents Management
  async uploadProjectDocument(id, fileOrFormData, documentName, documentType, isPublic) {
    let payload = fileOrFormData;
    if (!(fileOrFormData instanceof FormData)) {
      payload = new FormData();
      payload.append('file', fileOrFormData);
      if (documentName) payload.append('documentName', documentName);
      if (documentType) payload.append('documentType', documentType);
      payload.append('isPublic', isPublic !== undefined ? isPublic : true);
    }
    return api.post(`/api/admin/projects/${id}/documents`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async deleteProjectDocument(documentId) {
    return api.delete(`/api/admin/projects/documents/${documentId}`);
  },

  // Unit Configurations
  async addConfiguration(projectId, data) {
    return api.post(`/api/admin/projects/${projectId}/configurations`, data);
  },

  async updateConfiguration(configId, data) {
    return api.put(`/api/admin/projects/configurations/${configId}`, data);
  },

  async deleteConfiguration(configId) {
    return api.delete(`/api/admin/projects/configurations/${configId}`);
  },

  // Amenities
  async addAmenity(projectId, data) {
    return api.post(`/api/admin/projects/${projectId}/amenities`, data);
  },

  async deleteAmenity(amenityId) {
    return api.delete(`/api/admin/projects/amenities/${amenityId}`);
  },

  // Specifications
  async addSpecification(projectId, data) {
    return api.post(`/api/admin/projects/${projectId}/specifications`, data);
  },

  async deleteSpecification(specId) {
    return api.delete(`/api/admin/projects/specifications/${specId}`);
  },

  // Highlights
  async addHighlight(projectId, data) {
    return api.post(`/api/admin/projects/${projectId}/highlights`, data);
  },

  async deleteHighlight(highlightId) {
    return api.delete(`/api/admin/projects/highlights/${highlightId}`);
  },

  // Floor Plans
  async addFloorPlan(projectId, dataOrFormData) {
    return api.post(`/api/admin/projects/${projectId}/floor-plans`, dataOrFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async deleteFloorPlan(floorPlanId) {
    return api.delete(`/api/admin/projects/floor-plans/${floorPlanId}`);
  },

  // Videos
  async addVideo(projectId, data) {
    return api.post(`/api/admin/projects/${projectId}/videos`, data);
  },

  async deleteVideo(videoId) {
    return api.delete(`/api/admin/projects/videos/${videoId}`);
  },
};

export default projectService;

