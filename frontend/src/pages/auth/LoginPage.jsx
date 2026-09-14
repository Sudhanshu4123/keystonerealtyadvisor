import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { LogIn, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      error('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(formData);
      success(`Welcome back, ${user.name}!`);

      if (user.role === 'ROLE_ADMIN' && from === '/dashboard') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      error(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Client & Advisor Sign In
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Access your saved portfolios and advisory communications
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-email"
                type="email"
                required
                className="form-control"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Mail size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="login-password"
                type="password"
                required
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ marginTop: '1.25rem' }}
          >
            <LogIn size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have a portfolio account?{' '}
          <Link to="/register" style={{ color: 'var(--color-gold-600)', fontWeight: 600 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
