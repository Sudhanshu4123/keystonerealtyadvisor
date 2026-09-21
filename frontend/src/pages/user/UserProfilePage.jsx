import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { authService } from '../../services/authService';
import SEO from '../../components/common/SEO';
import { User, Lock, Save, Shield } from 'lucide-react';

export default function UserProfilePage() {
  const { user, updateUser } = useAuth();
  const { success, error } = useToast();

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    try {
      const res = await authService.updateProfile(profileData);
      if (res.success && res.data) {
        updateUser(res.data);
        success('Profile updated successfully.');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      error('New passwords do not match.');
      return;
    }

    setUpdatingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      success('Password changed successfully.');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (err) {
      error(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <SEO title="Account Security & Profile" noIndex={true} />
      {/* Profile Details Form */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <User size={22} color="var(--color-gold-500)" />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Account Profile</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage your personal and contact details
            </p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} style={{ maxWidth: '480px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="user-email">Email Address</label>
            <input
              id="user-email"
              type="email"
              disabled
              className="form-control"
              value={user?.email || ''}
              style={{ backgroundColor: 'var(--bg-secondary)', cursor: 'not-allowed' }}
            />
            <span className="form-hint">Email address cannot be modified once registered.</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="user-name">Full Name *</label>
            <input
              id="user-name"
              type="text"
              required
              className="form-control"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="user-phone">Phone Number</label>
            <input
              id="user-phone"
              type="tel"
              className="form-control"
              placeholder="+1 (555) 000-0000"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={updatingProfile} style={{ marginTop: '0.5rem' }}>
            <Save size={16} />
            <span>{updatingProfile ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>

      {/* Security & Password Form */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <Lock size={22} color="var(--color-gold-500)" />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Security & Password</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Update your password to keep your portfolio account secure
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '480px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="current-pwd">Current Password *</label>
            <input
              id="current-pwd"
              type="password"
              required
              className="form-control"
              placeholder="Enter current password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="new-pwd">New Password *</label>
            <input
              id="new-pwd"
              type="password"
              required
              className="form-control"
              placeholder="Minimum 6 characters"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirm-new-pwd">Confirm New Password *</label>
            <input
              id="confirm-new-pwd"
              type="password"
              required
              className="form-control"
              placeholder="Confirm new password"
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-outline-gold" disabled={updatingPassword} style={{ marginTop: '0.5rem' }}>
            <Lock size={16} />
            <span>{updatingPassword ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
