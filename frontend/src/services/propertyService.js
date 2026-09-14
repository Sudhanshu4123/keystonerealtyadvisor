import api from './api';

export const propertyService = {
  async searchProperties(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    return api.get(`/api/properties?${queryParams.toString()}`);
  },

  async getFeaturedProperties() {
    return api.get('/api/properties/featured');
  },

  async getPropertyById(id) {
    return api.get(`/api/properties/${id}`);
  },

  // Admin Methods
  async createProperty(data) {
    return api.post('/api/properties', data);
  },

  async updateProperty(id, data) {
    return api.put(`/api/properties/${id}`, data);
  },

  async deleteProperty(id) {
    return api.delete(`/api/properties/${id}`);
  },

  async uploadImages(propertyId, files) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return api.post(`/api/properties/${propertyId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async deleteImage(propertyId, imageId) {
    return api.delete(`/api/properties/${propertyId}/images/${imageId}`);
  },

  async setPrimaryImage(propertyId, imageId) {
    return api.put(`/api/properties/${propertyId}/images/${imageId}/primary`);
  },

  async updateStatus(id, status) {
    return api.patch(`/api/properties/${id}/status`, { status });
  }
};
