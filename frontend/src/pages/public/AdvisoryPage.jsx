import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Landmark, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function AdvisoryPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      {/* Header Banner */}
      <section style={{ backgroundColor: 'var(--color-dark-950)', color: '#FFFFFF', padding: '4.5rem 0', borderBottom: '1px solid #1E293B' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '760px' }}>
          <span className="section-subtitle">Core Advisory Services</span>
          <h1 style={{ fontSize: '2.75rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>
            Real Estate Advisory Practice
          </h1>
          <p style={{ fontSize: '1.0625rem', color: '#94A3B8' }}>
            Keystone Realty Advisor delivers institutional-grade property strategy, strategic acquisition guidance, and transaction execution for individuals, family offices, and commercial enterprises.
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
                Residential & Luxury Acquisition
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Targeted identification of off-market and premier residential assets, comprehensive valuation audits, legal due diligence coordination, and contract negotiation.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Off-market portfolio screening</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Fair market valuation assessments</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Discreet client representation</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                Enquire on Acquisition
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
                Commercial Real Estate & Leasing
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Strategic advisory for corporate tenants and asset owners, encompassing office space, retail flagships, industrial facilities, and lease restructuring.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Commercial tenancy optimization</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Lease negotiations & extensions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Yield and cashflow evaluation</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                Enquire on Commercial
              </Link>
            </div>

            {/* 3. Valuation & Advisory */}
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
                Portfolio Advisory & Valuation
              </h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Independent real estate asset valuations, portfolio rebalancing strategies, and disposal advice tailored to market cycles.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: 'auto', marginBottom: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Independent asset appraisals</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Exit strategy & divestment</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} color="var(--color-gold-500)" />
                  <span>Market risk analysis</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>
                Enquire on Valuation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">The Advisory Methodology</span>
            <h2 className="section-title">Structured Real Estate Advisory</h2>
          </div>

          <div className="grid-4">
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>01</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Discovery</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Consultation to define investment targets, spatial requirements, and financial parameters.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>02</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Underwriting</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Quantitative market assessment, comparable sales indexing, and spatial valuation.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>03</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Structuring</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Contractual negotiation, term optimization, and transaction governance.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-500)', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>04</div>
              <h4 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Execution</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Seamless closing coordination and ongoing portfolio advisory support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
