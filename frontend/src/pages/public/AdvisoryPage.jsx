import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Landmark, TrendingUp, CheckCircle, ArrowRight, Compass, Lock, MessageCircle, Phone, Award, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/common/SEO';

export default function AdvisoryPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      <SEO
        title="Real Estate Advisory & Consultancy | Keystone"
        description="Institutional real estate advisory in Delhi NCR: bespoke luxury acquisitions, corporate leasing strategy, asset valuation and transaction due diligence."
        canonicalUrl="/advisory"
        keywords="real estate advisory services, property consultancy, commercial leasing advisor, asset valuation, luxury home acquisition, Keystone Realty Advisor"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Advisory Services', path: '/advisory' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Keystone Realty Advisory Practice',
          description: 'Keystone Realty Advisor delivers institutional-grade property strategy, strategic acquisition guidance, and transaction execution.',
          url: 'https://keystonerealtyadvisor.com/advisory',
          telephone: '+919911956274',
          email: 'keystonexhelpdeskp@gmail.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN'
          },
          areaServed: {
            '@type': 'Country',
            name: 'India'
          }
        }}
      />
      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--color-dark-950)', color: '#FFFFFF', padding: '4.5rem 0', borderBottom: '1px solid #1E293B' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-subtitle">Core Advisory Practice</span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Institutional Real Estate Advisory & Consultancy
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#94A3B8', lineHeight: 1.65 }}>
            Keystone Realty Advisor delivers institutional-grade property strategy, strategic acquisition guidance, and end-to-end transaction governance for private individuals, family offices, and commercial enterprises.
          </p>
        </div>
      </section>

      {/* Advisory Service Offerings */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* 1. Property Acquisition */}
            <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-gold-50)',
                  color: 'var(--color-gold-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <Landmark size={24} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Bespoke Residential & Luxury Acquisition
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Targeted identification of verified and off-market premier residences, comprehensive legal title audits, price parity benchmarking, and confidential contract negotiation.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.75rem', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Curated luxury portfolio screening across <Link to="/properties-in-gurugram" style={{ color: 'var(--color-gold-700)', fontWeight: 600 }}>Gurugram Corridors</Link> & <Link to="/properties-in-delhi" style={{ color: 'var(--color-gold-700)', fontWeight: 600 }}>South Delhi</Link></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Rigorous title search & verified HRERA escrow audits</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Discreet buyer representation & price negotiation</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline-gold" style={{ alignSelf: 'flex-start' }}>
                Request Acquisition Advisory
              </Link>
            </div>

            {/* 2. Commercial Real Estate */}
            <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-gold-50)',
                  color: 'var(--color-gold-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Corporate Commercial Leasing & Representation
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Strategic spatial advisory for corporate occupiers and commercial landlords, encompassing Grade-A office parks, high-street retail flagships, and lease optimization across <Link to="/properties-in-noida" style={{ color: 'var(--color-gold-700)', fontWeight: 600 }}>Noida</Link> & <Link to="/properties-in-gurugram" style={{ color: 'var(--color-gold-700)', fontWeight: 600 }}>Gurugram</Link>.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.75rem', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Commercial tenancy optimization & space planning</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Structured lease negotiations & indexation reviews</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Net yield evaluation & cash-flow stability analysis</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline-gold" style={{ alignSelf: 'flex-start' }}>
                Enquire on Commercial Strategy
              </Link>
            </div>

            {/* 3. Valuation & NRI Feasibility */}
            <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-gold-50)',
                  color: 'var(--color-gold-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.375rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Asset Valuation, Due Diligence & NRI Desk
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Independent real estate asset appraisals, micro-market comparative assessments, and dedicated NRI FEMA / Tax Advisory support.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.75rem', paddingLeft: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>Independent market-value appraisals & land audits</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>NRI NRE/NRO banking & 195 TDS repatriation guidance</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
                  <span>RERA encumbrance & legal title litigation scrutiny</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline-gold" style={{ alignSelf: 'flex-start' }}>
                Request Asset Valuation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">Advisory Methodology</span>
            <h2 className="section-title">Structured Real Estate Advisory Process</h2>
            <p className="section-description">
              Our 4-stage advisory workflow guarantees clarity, compliance, and fiduciary alignment from initial consultation to final deed execution.
            </p>
          </div>

          <div className="grid-4">
            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>01</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Discovery & Mandate</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Confidential session to establish investment scope, spatial preferences, capital allocation parameters, and risk tolerance.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>02</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Underwriting & Audit</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Quantitative market assessment, comparable sales indexing, developer RERA scrutiny, and comprehensive title verification.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>03</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Structuring & Terms</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Contractual negotiation, terms optimization, tax & legal coordination, and transaction structuring for buyer protection.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>04</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', fontWeight: 600 }}>Execution & Handover</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Seamless closing, registration facilitation, handover documentation, and ongoing asset management advisory support.
              </p>
            </div>
          </div>

          {/* Contextual Link Weaving: Prime Portfolios & Hubs */}
          <div className="card" style={{ marginTop: '3.5rem', padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  Explore Real Estate Portfolios & Prime Hubs
                </h3>
                <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                  Browse verified listings, developer townships, and regional investment corridors across Delhi NCR.
                </p>
              </div>
              <Link to="/properties" className="btn btn-outline-gold" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.9rem' }}>
                View All Properties
              </Link>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
              <Link to="/properties-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Properties in Gurugram
              </Link>
              <Link to="/properties-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Properties in Delhi
              </Link>
              <Link to="/properties-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Properties in Noida
              </Link>
              <Link to="/flats-for-rent-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Flats for Rent Gurugram
              </Link>
              <Link to="/projects/conscient-parq-sector-80-gurgaon" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Conscient Parq Sector 80
              </Link>
              <Link to="/projects" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
                Featured Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Bottom Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-900)',
          color: '#FFFFFF',
          paddingTop: '4.5rem',
          paddingBottom: '4.5rem',
          borderTop: '1px solid #1E293B',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-400)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            <Lock size={14} />
            <span>Fiduciary Commitment</span>
          </span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
            Engage Keystone for Your Property Mandate
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>
            Speak directly with a senior partner regarding bespoke residential acquisitions, commercial portfolios, or valuation audits.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book Private Consultation
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=919911956274&text=Hello%20Keystone%20Realty%20Advisor%2C%20I%20would%20like%20to%20schedule%20a%20private%20advisory%20consultation."
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="btn btn-lg"
              style={{
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none'
              }}
            >
              <MessageCircle size={18} />
              <span>Instant WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
