import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'var(--color-gold-500)', bgColor = 'var(--color-gold-50)' }) {
  return (
    <div
      className="card"
      style={{
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginTop: '0.25rem', lineHeight: 1.1 }}>
          {value !== undefined ? value : 0}
        </div>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      {Icon && (
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: bgColor,
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={22} />
        </div>
      )}
    </div>
  );
}
