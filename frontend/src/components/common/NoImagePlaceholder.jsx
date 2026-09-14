import React from 'react';

export default function NoImagePlaceholder({ height = '220px', className = '' }) {
  return (
    <div
      className={`no-image-placeholder ${className}`}
      style={{
        width: '100%',
        height,
        backgroundColor: '#0F172A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94A3B8',
        padding: '1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid #1E293B',
      }}
    >
      {/* Subtle blueprint grid watermark */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <pattern id="grid-blueprint" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#C29B38" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid-blueprint)" />
      </svg>

      {/* Architectural Icon */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#1E293B',
          border: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
          zIndex: 1,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C29B38" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
        </svg>
      </div>

      <span
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#E2E8F0',
          zIndex: 1,
        }}
      >
        No Image Available
      </span>
      <span
        style={{
          fontSize: '0.75rem',
          color: '#64748B',
          marginTop: '0.25rem',
          zIndex: 1,
        }}
      >
        Keystone Realty Advisor
      </span>
    </div>
  );
}
