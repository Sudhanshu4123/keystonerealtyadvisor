import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import { useToast } from '../../hooks/useToast';
import { Lock, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound, Loader2, Check, X, Shield } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { success, error } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Password strength evaluation criteria
  const strengthChecks = useMemo(() => {
    return {
      hasMinLength: password.length >= 8,
      hasUpperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  }, [password]);

  const strengthScore = useMemo(() => {
    let score = 0;
    if (strengthChecks.hasMinLength) score++;
    if (strengthChecks.hasUpperLower) score++;
    if (strengthChecks.hasNumber) score++;
    if (strengthChecks.hasSpecial) score++;
    return score;
  }, [strengthChecks]);

  const strengthLabel = useMemo(() => {
    if (!password) return { text: '', color: 'transparent' };
    switch (strengthScore) {
      case 1:
        return { text: 'Weak', color: '#ef4444' };
      case 2:
        return { text: 'Fair', color: '#f97316' };
      case 3:
        return { text: 'Good', color: '#eab308' };
      case 4:
        return { text: 'Strong', color: '#22c55e' };
      default:
        return { text: 'Too short', color: '#ef4444' };
    }
  }, [password, strengthScore]);

  const passwordsMatch = useMemo(() => {
    if (!confirmPassword) return null;
    return password === confirmPassword;
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      error('Invalid or missing password reset token.');
      return;
    }

    if (!password || password.length < 6) {
      error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      error('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setIsDone(true);
      success('Password reset successfully!');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2500);
    } catch (err) {
      error(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
      <SEO
        title="Set New Password | Keystone Realty"
        description="Create a new password for your Keystone Realty account."
        noIndex={true}
      />
      <div className="card auth-card" style={{ maxWidth: '460px', width: '100%', padding: '2.5rem' }}>
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '0.75rem' }}>
            <img src="/keystone-logo.png" alt="Keystone Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Choose New Password
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Enter a secure new password for your account
          </p>
        </div>

        {!token ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
              color: '#ef4444'
            }}>
              <AlertTriangle size={30} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Missing Reset Token
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This password reset link is invalid or incomplete. Please request a fresh reset link from the forgot password page.
            </p>
            <Link to="/forgot-password" className="btn btn-primary btn-block">
              Request New Link
            </Link>
          </div>
        ) : isDone ? (
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
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Password Updated!
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your password has been changed successfully. Redirecting you to sign in...
            </p>
            <Link to="/login" className="btn btn-primary btn-block">
              Go to Sign In Now
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reset-new-password">New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reset-new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  minLength={6}
                  className="form-control"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '2.25rem', paddingRight: '2.25rem' }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0 }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div style={{ marginTop: '0.625rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Shield size={12} /> Password Strength:
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: strengthLabel.color }}>
                      {strengthLabel.text}
                    </span>
                  </div>

                  {/* Segmented Strength Bar */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', height: '4px', borderRadius: '2px', overflow: 'hidden' }}>
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        style={{
                          height: '100%',
                          backgroundColor: step <= strengthScore ? strengthLabel.color : 'rgba(0,0,0,0.08)',
                          borderRadius: '2px',
                          transition: 'background-color 0.25s ease'
                        }}
                      />
                    ))}
                  </div>

                  {/* Checklist criteria */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.25rem 0.75rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: strengthChecks.hasMinLength ? '#16a34a' : 'var(--text-secondary)' }}>
                      {strengthChecks.hasMinLength ? <Check size={12} /> : <span style={{ width: '12px', textAlign: 'center' }}>•</span>}
                      <span>8+ characters</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: strengthChecks.hasUpperLower ? '#16a34a' : 'var(--text-secondary)' }}>
                      {strengthChecks.hasUpperLower ? <Check size={12} /> : <span style={{ width: '12px', textAlign: 'center' }}>•</span>}
                      <span>Upper & lower case</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: strengthChecks.hasNumber ? '#16a34a' : 'var(--text-secondary)' }}>
                      {strengthChecks.hasNumber ? <Check size={12} /> : <span style={{ width: '12px', textAlign: 'center' }}>•</span>}
                      <span>At least one number</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: strengthChecks.hasSpecial ? '#16a34a' : 'var(--text-secondary)' }}>
                      {strengthChecks.hasSpecial ? <Check size={12} /> : <span style={{ width: '12px', textAlign: 'center' }}>•</span>}
                      <span>Special symbol (!@#$)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label" htmlFor="reset-confirm-password">Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reset-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  className="form-control"
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    paddingLeft: '2.25rem',
                    paddingRight: '2.25rem',
                    borderColor: passwordsMatch === false ? '#ef4444' : passwordsMatch === true ? '#22c55e' : undefined
                  }}
                />
                <Lock size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0 }}
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password match feedback */}
              {passwordsMatch !== null && (
                <div style={{ marginTop: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: passwordsMatch ? '#16a34a' : '#ef4444' }}>
                  {passwordsMatch ? <Check size={12} /> : <X size={12} />}
                  <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              disabled={loading || (passwordsMatch === false)}
              style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <KeyRound size={16} />
                  <span>Save New Password</span>
                </>
              )}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Remember your password?{' '}
          <Link to="/login" style={{ color: 'var(--color-gold-600)', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
