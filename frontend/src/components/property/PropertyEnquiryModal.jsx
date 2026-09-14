import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { enquiryService } from '../../services/enquiryService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Send, CheckCircle2 } from 'lucide-react';

export default function PropertyEnquiryModal({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
    if (property) {
      setFormData((prev) => ({
        ...prev,
        message: `Hello, I would like more information and advisory consultation regarding "${property.title}" (Ref #${property.id}) located in ${property.location}, ${property.city}.`,
      }));
    }
    setSubmitted(false);
  }, [user, property, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submitEnquiry({
        propertyId: property?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      success('Your enquiry has been dispatched to Keystone Realty Advisory.');
    } catch (err) {
      error(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={submitted ? "Enquiry Received" : `Enquire: ${property?.title || 'Property'}`}
      maxWidth="560px"
    >
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <CheckCircle2 size={32} />
          </div>
          <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Thank You for Reaching Out</h4>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            A senior real estate advisor from <strong>Keystone Realty Advisor</strong> will review your request and connect with you via email or phone within 24 hours.
          </p>
          <button type="button" onClick={onClose} className="btn btn-primary">
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="enquiry-name">Full Name *</label>
            <input
              id="enquiry-name"
              type="text"
              required
              className="form-control"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alexander Vance"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="enquiry-email">Email Address *</label>
              <input
                id="enquiry-email"
                type="email"
                required
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="enquiry-phone">Phone Number</label>
              <input
                id="enquiry-phone"
                type="tel"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="enquiry-message">Advisory Message / Questions *</label>
            <textarea
              id="enquiry-message"
              required
              rows={4}
              className="form-control"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn btn-ghost" disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Send size={15} />
              <span>{submitting ? 'Sending Request...' : 'Send Enquiry'}</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
