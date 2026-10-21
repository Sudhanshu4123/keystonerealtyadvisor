import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Guards
import { ProtectedRoute, AdminRoute } from './components/auth/RouteGuards';

// Public Pages (Eager for Fast Initial Paint & SEO Crawlers)
import HomePage from './pages/public/HomePage';
import PropertiesPage from './pages/public/PropertiesPage';
import PropertyDetailPage from './pages/public/PropertyDetailPage';
import ProjectsPage from './pages/public/ProjectsPage';
import ProjectDetailPage from './pages/public/ProjectDetailPage';
import AdvisoryPage from './pages/public/AdvisoryPage';
import ContactPage from './pages/public/ContactPage';
import NotFoundPage from './pages/public/NotFoundPage';
import FlatsForRentGurugramPage from './pages/public/FlatsForRentGurugramPage';
import PropertiesInDelhiPage from './pages/public/PropertiesInDelhiPage';
import PropertiesInGurugramPage from './pages/public/PropertiesInGurugramPage';
import PropertiesInNoidaPage from './pages/public/PropertiesInNoidaPage';

// Programmatic SEO Master Landing Page
import ProgrammaticLandingPage from './pages/public/ProgrammaticLandingPage';
import { PROGRAMMATIC_PAGES, PROGRAMMATIC_ALIASES, CITY_PAGE_ALIASES } from './utils/programmaticSeoConfig';

// Lazy Secondary Public & Legal Pages
const TermsPage = lazy(() => import('./pages/public/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage'));
const SitemapPage = lazy(() => import('./pages/public/SitemapPage'));
const EntityMapPage = lazy(() => import('./pages/public/EntityMapPage'));

// Lazy Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));

// Lazy User Dashboard Pages
const UserDashboardPage = lazy(() => import('./pages/user/UserDashboardPage'));
const UserFavoritesPage = lazy(() => import('./pages/user/UserFavoritesPage'));
const UserEnquiriesPage = lazy(() => import('./pages/user/UserEnquiriesPage'));
const UserProfilePage = lazy(() => import('./pages/user/UserProfilePage'));

// Lazy Admin Console Pages (heavy forms, tables, icons)
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProjectsPage = lazy(() => import('./pages/admin/AdminProjectsPage'));
const AdminProjectFormPage = lazy(() => import('./pages/admin/AdminProjectFormPage'));
const AdminPropertiesPage = lazy(() => import('./pages/admin/AdminPropertiesPage'));
const AdminPropertyFormPage = lazy(() => import('./pages/admin/AdminPropertyFormPage'));
const AdminEnquiriesPage = lazy(() => import('./pages/admin/AdminEnquiriesPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));

// Minimal loading spinner for lazy-loaded route transitions
function RouteLoadingSpinner() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid rgba(200, 169, 106, 0.2)',
        borderTopColor: '#c8a96a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
    </div>
  );
}

// /properties/slug/:slug and /projects/slug/:slug are legacy duplicates of /properties/:slug and /projects/:slug.
function LegacySlugRedirect({ base }) {
  const { slug } = useParams();
  return <Navigate to={`${base}/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Suspense fallback={<RouteLoadingSpinner />}>
            <Routes>
              {/* Public Layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                
                {/* City hub pages (primary URLs) */}
                <Route path="/properties-in-delhi" element={<PropertiesInDelhiPage />} />
                <Route path="/properties-in-gurugram" element={<PropertiesInGurugramPage />} />
                <Route path="/properties-in-noida" element={<PropertiesInNoidaPage />} />
                <Route path="/flats-for-rent-in-gurugram" element={<FlatsForRentGurugramPage />} />

                {/* Programmatic landing pages: generated from PROGRAMMATIC_PAGES (single source of truth) */}
                {PROGRAMMATIC_PAGES.map((slug) => (
                  <Route key={slug} path={`/${slug}`} element={<ProgrammaticLandingPage presetSlug={slug} />} />
                ))}

                {/* Duplicate spellings redirect to their primary URL (nginx also sends a real 301 in production) */}
                {Object.entries({ ...CITY_PAGE_ALIASES, ...PROGRAMMATIC_ALIASES }).map(([from, to]) => (
                  <Route key={from} path={`/${from}`} element={<Navigate to={`/${to}`} replace />} />
                ))}

                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/properties/slug/:slug" element={<LegacySlugRedirect base="/properties" />} />
                <Route path="/property" element={<PropertyDetailPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
                <Route path="/projects/slug/:slug" element={<LegacySlugRedirect base="/projects" />} />
                <Route path="/advisory" element={<AdvisoryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/sitemap" element={<SitemapPage />} />
                <Route path="/entity-map" element={<EntityMapPage />} />
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
          </Suspense>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
