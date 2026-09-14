import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, Layers, ShieldCheck } from 'lucide-react';
import NoImagePlaceholder from '../common/NoImagePlaceholder';
import Badge from '../common/Badge';

export default function ProjectCard({ project }) {
  const formatPrice = (min, max, priceType) => {
    if (!min && !max) return 'Price on Request';
    
    const formatValue = (num) => {
      if (!num) return '';
      if (num >= 10000000) {
        return `₹${(num / 10000000).toFixed(2)} Cr`;
      } else if (num >= 100000) {
        return `₹${(num / 100000).toFixed(2)} L`;
      }
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);
    };

    if (min && max && min !== max) {
      return `${formatValue(min)} - ${formatValue(max)}`;
    }
    if (min) return `From ${formatValue(min)}`;
    if (max) return `Up to ${formatValue(max)}`;
    return priceType || 'Price on Request';
  };

  // Status mapping
  let statusBadgeVariant = 'gold';
  if (project.status === 'READY_TO_MOVE' || project.status === 'COMPLETED') statusBadgeVariant = 'success';
  if (project.status === 'UNDER_CONSTRUCTION') statusBadgeVariant = 'warning';
  if (project.status === 'SOLD_OUT') statusBadgeVariant = 'danger';

  return (
    <div className="card project-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Media Box */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#0B0F19' }}>
        <Link to={`/projects/${project.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
          {project.coverImageUrl ? (
            <img
              src={project.coverImageUrl}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 300ms ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<div class="no-img-fallback" style="height:100%"></div>';
              }}
            />
          ) : (
            <NoImagePlaceholder height="100%" />
          )}
        </Link>

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2, flexWrap: 'wrap' }}>
          <Badge variant={statusBadgeVariant}>
            {project.status?.replace(/_/g, ' ')}
          </Badge>
          <Badge variant="dark">
            {project.projectType?.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* RERA Badge if available */}
        {project.reraNumber && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              padding: '3px 8px',
              backgroundColor: 'rgba(11, 15, 25, 0.85)',
              backdropFilter: 'blur(4px)',
              borderRadius: '4px',
              border: '1px solid rgba(194, 155, 56, 0.4)',
              color: 'var(--color-gold-400)',
              fontSize: '0.6875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              zIndex: 2,
            }}
            title={`RERA Registration: ${project.reraNumber}`}
          >
            <ShieldCheck size={12} color="var(--color-gold-400)" />
            <span>RERA Registered</span>
          </div>
        )}
      </div>

      {/* Project Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.625rem' }}>
        {/* Builder & Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold-600)', fontFamily: 'var(--font-display)' }}>
            {formatPrice(project.minPrice, project.maxPrice, project.priceType)}
          </div>
          {project.builderName && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              By {project.builderName}
            </span>
          )}
        </div>

        {/* Project Name */}
        <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.35, margin: 0 }}>
          <Link to={`/projects/${project.id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            {project.name}
          </Link>
        </h3>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
          <MapPin size={14} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {project.locality}, {project.city}
          </span>
        </div>

        {/* Configurations Pills */}
        {project.configurationNames && project.configurationNames.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', margin: '2px 0' }}>
            <Layers size={13} color="var(--color-dark-400)" style={{ flexShrink: 0 }} />
            {project.configurationNames.slice(0, 3).map((name, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.71875rem',
                  padding: '2px 6px',
                  backgroundColor: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '3px',
                  color: 'var(--text-secondary)',
                }}
              >
                {name}
              </span>
            ))}
            {project.configurationNames.length > 3 && (
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                +{project.configurationNames.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Specs: Possession & Info */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.78125rem',
            color: 'var(--text-secondary)',
          }}
        >
          {project.possessionDate ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Possession">
              <Calendar size={13} color="var(--color-dark-500)" />
              <span>Possession: <strong>{project.possessionDate}</strong></span>
            </div>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>Under Keystone Advisory</span>
          )}

          <Link
            to={`/projects/${project.id}`}
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-gold-600)',
              textDecoration: 'none',
            }}
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
