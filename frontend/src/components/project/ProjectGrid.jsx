import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import LoadingSkeleton from '../common/LoadingSkeleton';
import { Building2, ShieldCheck, Landmark, TrendingUp, Compass, ArrowRight, MessageSquare } from 'lucide-react';

export default function ProjectGrid({ projects, loading }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card" style={{ height: '380px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <LoadingSkeleton height="200px" />
            <LoadingSkeleton height="24px" width="60%" />
            <LoadingSkeleton height="18px" width="85%" />
            <LoadingSkeleton height="16px" width="40%" />
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
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
            <Building2 size={28} />
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Curated Real Estate Developments & Private Placements
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            Keystone Realty Advisor works directly with tier-1 developers and institutional promoters. New residential townships, commercial business towers, and gated villa communities undergo rigorous RERA audit before representation.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ gap: '0.5rem' }}>
              <MessageSquare size={16} />
              <span>Request Upcoming Project Brochures</span>
            </Link>
            <Link to="/properties" className="btn btn-outline-gold" style={{ gap: '0.5rem' }}>
              <span>Browse Ready-to-Move Properties</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Informative Sector Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <Landmark size={18} />
              <span>Luxury Residential High-Rises</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Architectural landmark residences with modern lifestyle clubhouses, verified RERA certificates, and master layouts.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <TrendingUp size={18} />
              <span>Grade-A Commercial Hubs</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Institutional office towers and high-street retail flagships offering high rental yields and long-term lease governance.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-main)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-600)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <Compass size={18} />
              <span>Plotted Townships & Villas</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              Gated plotted developments with clear registry titles, underground utility infrastructure, and premium amenities.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
