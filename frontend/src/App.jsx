import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Guards
import { ProtectedRoute, AdminRoute } from './components/auth/RouteGuards';

// Public Pages
import HomePage from './pages/public/HomePage';
import PropertiesPage from './pages/public/PropertiesPage';
import PropertyDetailPage from './pages/public/PropertyDetailPage';
import ProjectsPage from './pages/public/ProjectsPage';
import ProjectDetailPage from './pages/public/ProjectDetailPage';
import AdvisoryPage from './pages/public/AdvisoryPage';
import ContactPage from './pages/public/ContactPage';
import TermsPage from './pages/public/TermsPage';
import PrivacyPage from './pages/public/PrivacyPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// User Dashboard Pages
import UserDashboardPage from './pages/user/UserDashboardPage';
import UserFavoritesPage from './pages/user/UserFavoritesPage';
import UserEnquiriesPage from './pages/user/UserEnquiriesPage';
import UserProfilePage from './pages/user/UserProfilePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminProjectFormPage from './pages/admin/AdminProjectFormPage';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage';
import AdminPropertyFormPage from './pages/admin/AdminPropertyFormPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:id" element={<PropertyDetailPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/projects/slug/:slug" element={<ProjectDetailPage />} />
              <Route path="/advisory" element={<AdvisoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* User Dashboard Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserLayout />}>
                <Route index element={<UserDashboardPage />} />
                <Route path="favorites" element={<UserFavoritesPage />} />
                <Route path="enquiries" element={<UserEnquiriesPage />} />
                <Route path="profile" element={<UserProfilePage />} />
              </Route>
            </Route>

            {/* Admin Console Protected Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="projects/new" element={<AdminProjectFormPage />} />
                <Route path="projects/edit/:id" element={<AdminProjectFormPage />} />
                <Route path="properties" element={<AdminPropertiesPage />} />
                <Route path="properties/new" element={<AdminPropertyFormPage />} />
                <Route path="properties/edit/:id" element={<AdminPropertyFormPage />} />
                <Route path="enquiries" element={<AdminEnquiriesPage />} />
                <Route path="users" element={<AdminUsersPage />} />
              </Route>
            </Route>

            {/* 404 Catch-all */}
            <Route element={<MainLayout />}>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
