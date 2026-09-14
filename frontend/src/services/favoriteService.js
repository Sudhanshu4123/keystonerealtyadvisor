import api from './api';

export const favoriteService = {
  async getUserFavorites(page = 0, size = 12) {
    return api.get(`/api/favorites?page=${page}&size=${size}`);
  },

  async addFavorite(propertyId) {
    return api.post(`/api/favorites/${propertyId}`);
  },

  async removeFavorite(propertyId) {
    return api.delete(`/api/favorites/${propertyId}`);
  }
};
