import api from './api';

export const authService = {
  async register(data) {
    return api.post('/api/auth/register', data);
  },

  async login(data) {
    return api.post('/api/auth/login', data);
  },

  async getProfile() {
    return api.get('/api/users/profile');
  },

  async updateProfile(data) {
    return api.put('/api/users/profile', data);
  },

  async changePassword(data) {
    return api.put('/api/users/password', data);
  }
};
