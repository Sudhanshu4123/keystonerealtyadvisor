import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import SEO from '../components/common/SEO';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO
        title="Admin Management Console | Keystone Realty Advisor"
        description="Keystone Realty Advisor internal management console."
        noIndex={true}
      />
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 15, 25, 0.65)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            zIndex: 105,
          }}
        />
      )}

      {/* Main Admin Wrapper */}
      <div
        className="admin-main-wrapper"
        style={{
          flex: 1,
          marginLeft: 'var(--admin-sidebar-width)',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="admin-main-content" style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open {
            transform: translateX(0);
          }
          .admin-main-wrapper {
            margin-left: 0 !important;
          }
        }
        @media (max-width: 640px) {
          .admin-main-content {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
