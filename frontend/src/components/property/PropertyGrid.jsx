import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { PropertyCardSkeleton } from '../common/LoadingSkeleton';
import { Building2, Landmark, TrendingUp, Compass, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function PropertyGrid({
  properties = [],
  loading = false,
  emptyTitle = "Curated Real Estate Portfolio & Private Listings",
  emptyDescription = "New verified residential and commercial assets are being prepared by our research desk. Connect with our advisory team for off-market placement opportunities.",
  onFavoriteToggle,
  columns = 3
}) {
  if (loading) {
    return (
      <div className={`grid-${columns}`}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <PropertyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div
          className="card"
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-gold-50)',
              color: 'var(--color-gold-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            {emptyTitle}
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            {emptyDescription}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ gap: '0.5rem' }}>
              <MessageSquare size={16} />
              <span>Connect with Advisory Desk</span>
            </Link>
            <Link to="/projects" className="btn btn-outline-gold" style={{ gap: '0.5rem' }}>
              <span>Explore Development Projects</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Informational Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <Landmark size={18} />
              <span>100% Legal Title Screening</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Every property listing undergoes rigorous title verification, encumbrance check, and ownership record confirmation.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={18} />
              <span>Fair Market Valuation</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Comparative price indexing and micro-market analysis to guarantee transparent, benchmarked pricing.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <Compass size={18} />
              <span>Confidential Representation</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Discreet buyer representation for high-value residential acquisitions, commercial leases, and land investments.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid-${columns}`}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
}
