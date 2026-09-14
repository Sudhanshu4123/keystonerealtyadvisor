import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, User, LogOut, LayoutDashboard, ShieldCheck, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <Link
          to="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <img src="/keystone-logo.png" alt="Keystone Realty Advisor Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1875rem',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: 'var(--color-dark-900)',
                lineHeight: 1.1,
              }}
            >
              KEYSTONE
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-500)',
              }}
            >
              Realty Advisor
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2rem',
          }}
          className="desktop-nav"
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-gold-500)' : 'var(--text-secondary)',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to="/properties"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-gold-500)' : 'var(--text-secondary)',
            })}
          >
            Properties
          </NavLink>
          <NavLink
            to="/projects"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-gold-500)' : 'var(--text-secondary)',
            })}
          >
            Projects
          </NavLink>
          <NavLink
            to="/advisory"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-gold-500)' : 'var(--text-secondary)',
            })}
          >
            Advisory Services
          </NavLink>
          <NavLink
            to="/contact"
            style={({ isActive }) => ({
              fontSize: '0.9375rem',
              fontWeight: 500,
              color: isActive ? 'var(--color-gold-500)' : 'var(--text-secondary)',
            })}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Action Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
              <Link
                to="/dashboard/favorites"
                className="btn btn-ghost btn-sm"
                title="Saved Properties"
                style={{ display: 'inline-flex', padding: '0.5rem' }}
              >
                <Heart size={18} />
              </Link>

              {/* User Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="btn btn-outline btn-sm"
                style={{ gap: '0.5rem' }}
              >
                <User size={16} />
                <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name?.split(' ')[0] || 'Account'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '220px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem 0',
                    zIndex: 200,
                  }}
                >
                  <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                  </div>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="btn-ghost"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem',
                        color: 'var(--color-gold-600)',
                        fontWeight: 600,
                      }}
                    >
                      <ShieldCheck size={16} />
                      Admin Console
                    </Link>
                  )}

                  <Link
                    to="/dashboard"
                    className="btn-ghost"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    <LayoutDashboard size={16} />
                    User Dashboard
                  </Link>

                  <Link
                    to="/dashboard/favorites"
                    className="btn-ghost"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1rem',
                      fontSize: '0.875rem',
                    }}
                  >
                    <Heart size={16} />
                    Saved Properties
                  </Link>

                  <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }} />

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1rem',
                      fontSize: '0.875rem',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: 'var(--color-danger)',
                      cursor: 'pointer',
                    }}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="btn btn-ghost btn-sm mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ padding: '0.5rem' }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 500, padding: '0.5rem 0' }}
          >
            Home
          </Link>
          <Link
            to="/properties"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 500, padding: '0.5rem 0' }}
          >
            Properties
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 500, padding: '0.5rem 0' }}
          >
            Projects
          </Link>
          <Link
            to="/advisory"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 500, padding: '0.5rem 0' }}
          >
            Advisory Services
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: 500, padding: '0.5rem 0' }}
          >
            Contact
          </Link>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
