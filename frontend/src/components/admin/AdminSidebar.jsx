import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  MessageSquare,
  Users,
  ExternalLink,
  LogOut,
  Shield
} from 'lucide-react';

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`admin-sidebar ${isOpen ? 'open' : ''}`}
      style={{
        width: 'var(--admin-sidebar-width)',
        backgroundColor: 'var(--color-dark-950)',
        borderRight: '1px solid #1E293B',
        color: '#E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 110,
        transition: 'transform var(--transition-normal)',
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
            KEYSTONE
          </div>
          <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Shield size={10} />
            <span>Admin Console</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: 600, padding: '0.5rem 0.75rem' }}>
          Management
        </div>

        <NavLink
          to="/admin"
          end
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/projects"
          end
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <Building size={18} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/admin/projects/new"
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <PlusCircle size={18} />
          <span>Add Project</span>
        </NavLink>

        <NavLink
          to="/admin/properties"
          end
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <Building size={18} />
          <span>Properties</span>
        </NavLink>

        <NavLink
          to="/admin/properties/new"
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <PlusCircle size={18} />
          <span>Add Property</span>
        </NavLink>

        <NavLink
          to="/admin/enquiries"
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <MessageSquare size={18} />
          <span>Enquiries</span>
        </NavLink>

        <NavLink
          to="/admin/users"
          onClick={onClose}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: isActive ? '#FFFFFF' : '#94A3B8',
            backgroundColor: isActive ? '#1E293B' : 'transparent',
            borderLeft: isActive ? '3px solid var(--color-gold-500)' : '3px solid transparent',
          })}
        >
          <Users size={18} />
          <span>User Accounts</span>
        </NavLink>

        <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: 600, padding: '1rem 0.75rem 0.5rem' }}>
          Portal
        </div>

        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.875rem',
            color: '#94A3B8',
          }}
        >
          <ExternalLink size={18} />
          <span>View Live Site</span>
        </Link>
      </nav>

      {/* Footer / Sign Out */}
      <div style={{ padding: '1rem', borderTop: '1px solid #1E293B' }}>
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
            color: '#F43F5E',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <LogOut size={18} />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
}
