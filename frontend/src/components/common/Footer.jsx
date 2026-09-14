import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark-950)',
        color: '#E2E8F0',
        borderTop: '1px solid #1E293B',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Company Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/keystone-logo.png" alt="Keystone Realty Advisor Logo" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
                  KEYSTONE
                </div>
                <div style={{ fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold-400)' }}>
                  Realty Advisor
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Professional real estate advisory practice providing institutional property evaluation, residential acquisitions, and commercial leasing advisory.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.8125rem' }}>
              <ShieldCheck size={16} />
              <span>Certified Advisory Services</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Available Properties
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Real Estate Projects
                </Link>
              </li>
              <li>
                <Link to="/advisory" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Advisory Services
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Enquiries & Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: '#94A3B8' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Advisory Practice
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#94A3B8' }}>
              <li>Residential Property Acquisition</li>
              <li>Commercial Real Estate Leasing</li>
              <li>Real Estate Portfolio Advisory</li>
              <li>Asset Valuation & Feasibility</li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Keystone Direct
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem', color: '#94A3B8' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Mail size={16} color="var(--color-gold-400)" />
                <span>keystonerealtyhepldesk@gmail.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Phone size={16} color="var(--color-gold-400)" />
                <span>+91 9911956274</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <MapPin size={16} color="var(--color-gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Executive Office, Financial District</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid #1E293B',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#64748B',
          }}
        >
          <div>
            &copy; {currentYear} <strong>Keystone Realty Advisor</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Terms & Conditions
            </Link>
            <Link to="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Privacy Policy
            </Link>
            <span>Confidentiality Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
