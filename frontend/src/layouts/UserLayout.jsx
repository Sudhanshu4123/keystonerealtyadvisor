import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../hooks/useAuth';
import { LayoutDashboard, Heart, MessageSquare, User, LogOut } from 'lucide-react';

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-secondary)' }}>
      <Navbar />
      <div className="container" style={{ flex: 1, paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem' }} className="dashboard-grid">
          {/* Dashboard Sidebar */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              height: 'fit-content',
            }}
          >
            <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-600)', fontWeight: 600 }}>
                Client Portal
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginTop: '0.25rem' }}>{user?.name}</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{user?.email}</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <NavLink
                to="/dashboard"
                end
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-600)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-gold-50)' : 'transparent',
                })}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/dashboard/favorites"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-600)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-gold-50)' : 'transparent',
                })}
              >
                <Heart size={18} />
                <span>Saved Properties</span>
              </NavLink>

              <NavLink
                to="/dashboard/enquiries"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-600)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-gold-50)' : 'transparent',
                })}
              >
                <MessageSquare size={18} />
                <span>My Enquiries</span>
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-600)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-gold-50)' : 'transparent',
                })}
              >
                <User size={18} />
                <span>Account Profile</span>
              </NavLink>

              <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.75rem 0' }} />

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  color: 'var(--color-danger)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .dashboard-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
