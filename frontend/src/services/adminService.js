import api from './api';

export const adminService = {
  async getDashboardStats() {
    return api.get('/api/admin/stats');
  },

  async getUsers(page = 0, size = 15) {
    return api.get(`/api/admin/users?page=${page}&size=${size}`);
  },

  async updateUserStatus(userId, status) {
    return api.patch(`/api/admin/users/${userId}/status`, { status });
  },

  async getEnquiries(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append('status', params.status);
    queryParams.append('page', params.page || 0);
    queryParams.append('size', params.size || 15);
    return api.get(`/api/admin/enquiries?${queryParams.toString()}`);
  },

  async updateEnquiryStatus(enquiryId, status) {
    return api.patch(`/api/admin/enquiries/${enquiryId}/status`, { status });
  },

  async deleteEnquiry(enquiryId) {
    return api.delete(`/api/admin/enquiries/${enquiryId}`);
  }
};
