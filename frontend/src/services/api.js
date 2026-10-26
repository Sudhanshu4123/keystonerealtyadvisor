import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('keystone_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: standard unwrap & handle 401
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid/expired token from localStorage
      localStorage.removeItem('keystone_token');
      localStorage.removeItem('keystone_user');
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') || currentPath.startsWith('/dashboard')) {
        window.location.href = '/login';
      }
    }
    const errorData = error.response?.data || { message: error.message || 'An error occurred' };
    if (error.response?.status) {
      errorData.status = error.response.status;
    }
    return Promise.reject(errorData);
  }
);

export default api;
