import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, Lock, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', paddingBottom: '5rem' }}>
      <SEO
        title="Terms & Conditions | Keystone Realty Advisor"
        description="Read the official Terms and Conditions of Keystone Realty Advisor governing our real estate consultancy, property representations, verification processes, and client advisory engagements."
        keywords="terms and conditions, real estate advisory agreement, property consultancy terms, Keystone Realty Advisor terms"
        canonicalUrl="https://keystonerealtyadvisor.com/terms"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--color-dark-950)', color: '#FFFFFF', padding: '4rem 0 3.5rem', borderBottom: '1px solid #1E293B' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-400)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Scale size={16} />
            <span>Legal & Governance</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Terms & Conditions
          </h1>
          <p style={{ fontSize: '1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Please read these terms and conditions carefully before utilizing the property advisory, acquisition, and consulting services of Keystone Realty Advisor.
          </p>
          <div style={{ marginTop: '1.25rem', fontSize: '0.8125rem', color: '#64748B' }}>
            Last Updated: September 2026 | Effective for all client engagements
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
              Advisory Scope & Nature of Services
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              Keystone Realty Advisor operates as an independent, professional real estate advisory and consultancy practice. Our services include strategic property portfolio assessment, acquisition guidance, asset valuation analysis, commercial leasing consultation, and transaction coordination.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our advisory recommendations are structured to assist clients in making informed property decisions based on market intelligence, comparative assessments, and verified developer data.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 2 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>2</span>
              Property Information & Due Diligence
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              While Keystone Realty Advisor conducts thorough pre-screening and verification of property listings, projects, RERA registrations, and developer records, all prospective buyers, tenants, and investors are advised to perform independent legal due diligence and physical inspections prior to executing binding agreements.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', paddingLeft: 0, marginTop: '1rem', fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Project specifications, master plans, and floor layouts are sourced directly from registered developers and regulatory filings.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>Prices, availability, payment plans, and promotional offers are subject to change as per developer/seller discretion.</span>
              </li>
            </ul>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 3 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>3</span>
              Client Confidentiality & Data Protection
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              We treat all client discussions, financial preferences, investment thresholds, and enquiry details with strict confidentiality. Keystone Realty Advisor never sells, trades, or disseminates client contact information to unauthorized third-party marketing entities.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 4 */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>4</span>
              Intellectual Property & Website Usage
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              All original content, branding, logo assets, curated property analysis, and website structure published on this platform remain the exclusive intellectual property of Keystone Realty Advisor. Unauthorized scraping, reproduction, or commercial re-publication is strictly prohibited.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

          {/* Section 5 */}
          <div>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-gold-50)', color: 'var(--color-gold-600)', fontSize: '0.875rem' }}>5</span>
              Contact & Grievance Redressal
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              If you have any questions, clarifications, or feedback regarding these terms, our advisory practices, or a specific transaction engagement, please contact our legal and compliance desk:
            </p>
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <div><strong>Keystone Realty Advisor - Compliance Desk</strong></div>
              <div>Email: <a href="mailto:keystonerealtyhepldesk@gmail.com" style={{ color: 'var(--color-gold-600)', textDecoration: 'none', fontWeight: 500 }}>keystonerealtyhepldesk@gmail.com</a></div>
              <div>Phone: <a href="tel:+919911956274" style={{ color: 'var(--color-gold-600)', textDecoration: 'none', fontWeight: 500 }}>+91 9911956274</a></div>
              <div>Address: Executive Office, Financial District</div>
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
