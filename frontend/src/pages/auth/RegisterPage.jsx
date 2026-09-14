import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function RegisterPage() {
  const { register } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      error('Please fill in all required fields.');
      return;
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    try {
      const user = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      success(`Welcome to Keystone Realty Advisor, ${user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <SEO
        title="Create a Client Account | Keystone Realty Advisor"
        description="Register with Keystone Realty Advisor to save preferred luxury properties, track advisory requests, and gain direct access to verified real estate opportunities."
        noIndex={false}
      />
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem' }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Create Client Account
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Join Keystone Realty Advisor to manage saved listings & advisory requests
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="register-name">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="register-name"
                type="text"
                required
                className="form-control"
                placeholder="e.g. Johnathan Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ paddingLeft: '2.25rem' }}
              />
              <User size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-email">Email Address *</label>
            <div style={{ position: 'relative' }}>
              <input
                id="register-email"
                type="email"
                required
                className="form-control"
                placeholder="johnathan@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Mail size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="register-phone">Phone Number</label>
            <div style={{ position: 'relative' }}>
              <input
                id="register-phone"
                type="tel"
                className="form-control"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ paddingLeft: '2.25rem' }}
              />
              <Phone size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="auth-pwd-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="register-password">Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="register-password"
                  type="password"
                  required
                  className="form-control"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ paddingLeft: '2.25rem' }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-confirm-password">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="register-confirm-password"
                  type="password"
                  required
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ paddingLeft: '2.25rem' }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ marginTop: '1.25rem' }}
          >
            <UserPlus size={16} />
            <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-gold-600)', fontWeight: 600 }}>
            Sign In here
          </Link>
        </div>

        <style>{`
          @media (max-width: 480px) {
            .auth-pwd-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
