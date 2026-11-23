import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { UserPlus, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function RegisterPage() {
  const { register, googleLogin } = useAuth();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      error('Google registration failed. No token received.');
      return;
    }
    setLoading(true);
    try {
      const user = await googleLogin(credentialResponse.credential);
      success(`Welcome to Keystone Realty Advisor, ${user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      error(err.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <SEO
        title="Create Account | Keystone Realty"
        description="Create your Keystone Realty Advisor account to save verified luxury properties, schedule private property viewings, and connect with advisors."
        noIndex={true}
      />
      <div className="card auth-card" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem' }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Create an Account
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Sign up to save properties, schedule viewings, and connect with advisors
          </p>
        </div>

        {/* Google Sign Up */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => error('Google Sign-In was unsuccessful. Please try again.')}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
            width="400"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
          <span style={{ padding: '0 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>or register with email</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-color)' }} />
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
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="form-control"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.25rem' }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0, display: 'flex', alignItems: 'center' }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="register-confirm-password">Confirm Password *</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="form-control"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.25rem' }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0, display: 'flex', alignItems: 'center' }}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
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
