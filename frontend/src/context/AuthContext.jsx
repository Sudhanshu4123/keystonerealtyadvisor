import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('keystone_user');
      return (saved && saved !== 'undefined') ? JSON.parse(saved) : null;
    } catch (e) {
      console.warn('Failed to parse saved user in AuthProvider:', e);
      return null;
    }
  });
  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem('keystone_token');
      return (savedToken && savedToken !== 'undefined') ? savedToken : null;
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const saveAuth = useCallback((tokenValue, userDetails) => {
    setToken(tokenValue);
    setUser(userDetails);
    localStorage.setItem('keystone_token', tokenValue);
    localStorage.setItem('keystone_user', JSON.stringify(userDetails));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('keystone_token');
    localStorage.removeItem('keystone_user');
  }, []);

  // Fetch updated profile on refresh if token exists
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.success && res.data) {
            setUser((prev) => {
              const updated = { ...prev, ...res.data };
              localStorage.setItem('keystone_user', JSON.stringify(updated));
              return updated;
            });
          }
        } catch (err) {
          // If token expired or user suspended, clear state
          if (err.status === 401 || err.status === 403) {
            logout();
          }
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token, logout]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res.success && res.data) {
      const { token: jwt, ...userInfo } = res.data;
      saveAuth(jwt, userInfo);
      return userInfo;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res.success && res.data) {
      const { token: jwt, ...userInfo } = res.data;
      saveAuth(jwt, userInfo);
      return userInfo;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem('keystone_user', JSON.stringify(updated));
      return updated;
    });
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
