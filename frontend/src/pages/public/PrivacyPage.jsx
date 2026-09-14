import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title="Privacy Policy | Keystone Realty Advisor"
        description="Learn how Keystone Realty Advisor protects client confidentiality, secures personal information, and maintains institutional data privacy standards."
        keywords="privacy policy, data protection, client confidentiality, real estate privacy, Keystone Realty Advisor"
        canonicalUrl="https://keystonerealtyadvisor.com/privacy"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--color-dark-950)', color: '#FFFFFF', padding: '4rem 0 3.5rem', borderBottom: '1px solid #1E293B' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <ShieldCheck size={16} />
            <span>Trust & Data Protection</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Keystone Realty Advisor is committed to safeguarding client privacy, maintaining strict confidentiality, and ensuring institutional-grade data security across all advisory interactions.
          </p>
          <div style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: '#64748B' }}>
            Last Updated: September 2026
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ maxWidth: '920px', marginTop: '3rem' }}>
        <div className="card" style={{ padding: '3rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          
          {/* Section 1 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>1</span>
              Information We Collect
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              We collect information provided directly by you when submitting property enquiries, scheduling advisory consultations, creating a client account, or communicating with our advisory team.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              This may include your name, contact telephone number, email address, property preferences, preferred locations, and investment criteria.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 2 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>2</span>
              How We Use Your Information
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: 0, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>To respond promptly and professionally to your real estate enquiries and consultation requests.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>To deliver curated property options, verified project updates, and market intelligence matching your requirements.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>To ensure transparent transaction coordination, document verification, and legal due diligence facilitation.</span>
              </li>
            </ul>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 3 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>3</span>
              Strict Non-Disclosure Policy
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Keystone Realty Advisor enforces a zero-tolerance policy against sharing or selling client personal data to third-party telemarketers or advertisers. Your details are accessible solely by authorized Keystone advisors handling your account.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 4 */}
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>4</span>
              Privacy Inquiries
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              For any questions regarding your data privacy, to request data modifications or deletion, please reach out to our privacy officer:
            </p>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div><strong>Keystone Realty Advisor - Data Privacy Desk</strong></div>
              <div>Email: <a href="mailto:keystonerealtyhepldesk@gmail.com" style={{ color: 'var(--color-gold-600)', textDecoration: 'none', fontWeight: 500 }}>keystonerealtyhepldesk@gmail.com</a></div>
              <div>Phone: <a href="tel:+919911956274" style={{ color: 'var(--color-gold-600)', textDecoration: 'none', fontWeight: 500 }}>+91 9911956274</a></div>
            </div>
          </div>

        </div>

        {/* Back to Home CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Return to Homepage</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
