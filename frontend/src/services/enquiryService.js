import api from './api';

export const enquiryService = {
  async submitEnquiry(data) {
    return api.post('/api/enquiries', data);
  },

  async getUserEnquiries(page = 0, size = 10) {
    return api.get(`/api/enquiries/my?page=${page}&size=${size}`);
  },

  async getEnquiryById(id) {
    return api.get(`/api/enquiries/${id}`);
  }
};
