import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
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
      href: 'https://www.linkedin.com/company/keyston-realty-advisor/',
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
      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
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
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.01em', marginBottom: '1.25rem' }}>
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
                <Link to="/insights" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  Insights & Guides
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
              <li>
                <Link to="/sitemap" style={{ color: '#CBD5E1' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  HTML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Projects & Townships */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.01em', marginBottom: '1.25rem' }}>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.01em', marginBottom: '1.25rem' }}>
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
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.01em', marginBottom: '1.25rem' }}>
              Keystone Direct
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Mail size={16} color="#E5C058" style={{ flexShrink: 0 }} />
                <a href="mailto:keystonexhelpdeskp@gmail.com" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  keystonexhelpdeskp@gmail.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <Phone size={16} color="#E5C058" style={{ flexShrink: 0 }} />
                <a href="tel:+919911956274" style={{ color: '#CBD5E1', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#FFFFFF')} onMouseLeave={(e) => (e.target.style.color = '#CBD5E1')}>
                  +91 9911956274
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Secondary Sitemap Bar */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.8125rem',
            color: '#94A3B8',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} Keystone Realty Advisor. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Terms
            </Link>
            <Link to="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              Privacy
            </Link>
            <Link to="/sitemap" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              HTML Sitemap
            </Link>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', textDecoration: 'none' }} onMouseEnter={(e) => (e.target.style.color = '#E5C058')} onMouseLeave={(e) => (e.target.style.color = '#94A3B8')}>
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
