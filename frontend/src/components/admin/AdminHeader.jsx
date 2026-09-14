import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Menu, User, Shield } from 'lucide-react';

export default function AdminHeader({ onToggleSidebar, title = 'Administration' }) {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 90,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="btn btn-ghost btn-sm admin-hamburger"
          style={{ padding: '0.375rem' }}
          aria-label="Toggle admin sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold-50)',
              color: 'var(--color-gold-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Shield size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user?.name}</span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-gold-600)', fontWeight: 600, textTransform: 'uppercase' }}>
              System Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
