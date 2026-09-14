import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
        <main style={{ padding: '2rem', flex: 1 }}>
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
      `}</style>
    </div>
  );
}
