import React, { useState, useEffect } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function ContactPage() {
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
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submitEnquiry(formData);
      setSubmitted(true);
      success('Thank you for contacting Keystone Realty Advisor. An advisor will be in touch shortly.');
      setFormData({
        name: user ? user.name : '',
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        message: '',
      });
    } catch (err) {
      error(err.message || 'Failed to dispatch your enquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '3.5rem 0 5rem' }}>
      <SEO
        title="Contact & Confidential Real Estate Consultation | Keystone Realty Advisor"
        description="Schedule a confidential consultation with Keystone Realty Advisor. Direct phone +91 9911956274 or submit an inquiry for verified property advice and site inspections."
        keywords="contact real estate advisor, property consultation, Keystone Realty Advisor phone, property enquiry, real estate help desk"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Keystone Realty Advisor',
          description: 'Get in touch with Keystone Realty Advisor for transparent real estate consultation across Gurgaon and Delhi NCR.',
          url: 'https://keystonerealtyadvisor.com/contact',
          mainEntity: {
            '@type': 'RealEstateAgent',
            name: 'Keystone Realty Advisor',
            telephone: '+919911956274',
            email: 'keystonerealtyhepldesk@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Golf Course Extension Road, Sector 58',
              addressLocality: 'Gurgaon',
              addressRegion: 'Haryana',
              postalCode: '122011',
              addressCountry: 'IN'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 28.4595,
              longitude: 77.0266
            },
            openingHours: 'Mo-Sa 09:30-19:00'
          }
        }}
      />
      <div className="container">
        <div style={{ maxWidth: '640px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="section-subtitle">Get in Touch</span>
          <h1 className="section-title">Advisory Desk & Consultations</h1>
          <p className="section-description">
            Schedule a confidential consultation or submit an inquiry regarding our properties, acquisitions, or commercial advisory services.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', maxWidth: '1020px', margin: '0 auto' }} className="contact-grid">
          {/* Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-success-bg)',
                    color: 'var(--color-success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  Enquiry Dispatched
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Your advisory request has been forwarded to our senior team at <strong>Keystone Realty Advisor</strong>. We will review your requirements and respond promptly.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn btn-outline-gold">
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Send an Advisory Enquiry
                </h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="contact-subgrid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      className="form-control"
                      placeholder="eleanor@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Advisory Requirements / Details *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    className="form-control"
                    placeholder="Describe the property types, locations, or advisory services you are interested in..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting} style={{ marginTop: '0.75rem' }}>
                  <Send size={16} />
                  <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Details Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                Corporate Advisory Office
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.9375rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={20} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Headquarters</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>Executive Suite, Financial District</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={20} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Direct Telephone</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>+91 9911956274</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={20} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Email</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>keystonerealtyhepldesk@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--color-dark-900)', color: '#FFFFFF', border: '1px solid #1E293B' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--color-gold-400)' }}>
                <ShieldCheck size={24} />
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FFFFFF' }}>Confidentiality & Compliance</h4>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6 }}>
                All consultations and investor communications with Keystone Realty Advisor are conducted under strict non-disclosure protocols.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
            }
            .contact-subgrid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
