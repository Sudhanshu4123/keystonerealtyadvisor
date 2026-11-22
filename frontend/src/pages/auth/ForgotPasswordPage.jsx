import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useToast } from '../../hooks/useToast';
import { Mail, ArrowLeft, CheckCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function ForgotPasswordPage() {
  const { error } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      error('Please enter your email address.');
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      const msg = err.message || 'Unable to process your request. Please try again.';
      setErrorMessage(msg);
      error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <SEO
        title="Forgot Password | Keystone Realty"
        description="Reset your Keystone Realty account password securely."
        noIndex={true}
      />
      <div className="card auth-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem' }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Reset Password
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Enter your email to receive recovery instructions
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#16a34a'
            }}>
              <CheckCircle size={32} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Check Your Inbox
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              If an account is associated with <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>, we have sent a secure password reset link. Please check your inbox and follow the instructions.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-primary btn-block">
                Back to Sign In
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn btn-secondary btn-block"
                style={{ fontSize: '0.875rem' }}
              >
                Try Another Email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                color: '#ef4444',
                fontSize: '0.875rem',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className="form-group">
              <label className="form-label" htmlFor="forgot-email">Registered Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="forgot-email"
                  type="email"
                  autoFocus
                  required
                  className="form-control"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '2.25rem' }}
                />
                <Mail size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading}
              style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending Instructions...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Reset Link</span>
                </>
              )}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <Link to="/login" style={{ color: 'var(--color-gold-600)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontWeight: 600 }}>
            <ArrowLeft size={14} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
