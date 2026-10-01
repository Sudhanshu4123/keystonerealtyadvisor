import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#', // Placeholder - link will be updated later
      ariaLabel: 'Follow Keystone Realty on Facebook',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#', // Placeholder - link will be updated later
      ariaLabel: 'Follow Keystone Realty on Instagram',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#', // Placeholder - link will be updated later
      ariaLabel: 'Connect with Keystone Realty on LinkedIn',
    },
  ];

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
              <img
                src="/keystone-logo-sm.webp"
                alt="Keystone Realty Advisor Logo"
                width="42"
                height="42"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/keystone-logo.png';
                }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
                  KEYSTONE
                </div>
                <div style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E5C058' }}>
                  Realty Advisor
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Professional real estate advisory practice providing institutional property evaluation, residential acquisitions, and commercial leasing advisory.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E5C058', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
              <ShieldCheck size={16} />
              <span>Certified Advisory Services</span>
            </div>

            {/* Social Media Links */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '0.75rem' }}>
                Follow Us
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      title={social.name}
                      onClick={(e) => {
                        if (social.href === '#' || !social.href) {
                          e.preventDefault();
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#1E293B',
                        border: '1px solid #334155',
                        color: '#CBD5E1',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#E5C058';
                        e.currentTarget.style.borderColor = '#E5C058';
                        e.currentTarget.style.color = '#0F172A';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 192, 88, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#1E293B';
                        e.currentTarget.style.borderColor = '#334155';
                        e.currentTarget.style.color = '#CBD5E1';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Navigation
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Available Properties
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Real Estate Projects
                </Link>
              </li>
              <li>
                <Link to="/advisory" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Advisory Services
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Enquiries & Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Projects & Townships */}
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Featured Projects
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/projects/conscient-parq-sector-80-gurgaon" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Conscient Parq Sector 80
                </Link>
              </li>
              <li>
                <Link to="/projects" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  All Real Estate Projects
                </Link>
              </li>
              <li>
                <Link to="/advisory" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Residential Acquisition
                </Link>
              </li>
              <li>
                <Link to="/advisory" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Commercial Leasing Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Location Searches */}
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Popular Searches
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/properties-in-delhi" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Properties in Delhi
                </Link>
              </li>
              <li>
                <Link to="/properties-in-gurugram" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Properties in Gurugram
                </Link>
              </li>
              <li>
                <Link to="/properties-in-noida" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Properties in Noida
                </Link>
              </li>
              <li>
                <Link to="/flats-for-rent-in-gurugram" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Flats for Rent in Gurgaon
                </Link>
              </li>
              <li>
                <Link to="/properties" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Flats for Sale in Delhi NCR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
              Keystone Direct
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Mail size={16} color="#E5C058" />
                <span>keystonerealtyhepldesk@gmail.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Phone size={16} color="#E5C058" />
                <span>+91 9911956274</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                <MapPin size={16} color="#E5C058" style={{ flexShrink: 0, marginTop: '2px' }} />
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
            color: '#94A3B8',
          }}
        >
          <div>
            &copy; {currentYear} <strong style={{ color: '#E2E8F0' }}>Keystone Realty Advisor</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Terms & Conditions
            </Link>
            <Link to="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Privacy Policy
            </Link>
            <span style={{ color: '#CBD5E1' }}>Confidentiality Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
