import React from 'react';

export default function LoadingSkeleton({ width = '100%', height = '20px', borderRadius = '4px', style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
      <div className="skeleton" style={{ height: '220px', width: '100%' }} />
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        <div className="skeleton" style={{ height: '24px', width: '70%' }} />
        <div className="skeleton" style={{ height: '16px', width: '45%' }} />
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton" style={{ height: '20px', width: '35%' }} />
          <div className="skeleton" style={{ height: '20px', width: '25%' }} />
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card" style={{ height: '380px', display: 'flex', flexDirection: 'column' }}>
      <div className="skeleton" style={{ height: '220px', width: '100%' }} />
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flex: 1 }}>
        <div className="skeleton" style={{ height: '22px', width: '50%' }} />
        <div className="skeleton" style={{ height: '26px', width: '75%' }} />
        <div className="skeleton" style={{ height: '16px', width: '60%' }} />
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem' }}>
          <div className="skeleton" style={{ height: '18px', width: '40%' }} />
          <div className="skeleton" style={{ height: '18px', width: '20%' }} />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, idx) => (
        <td key={idx}>
          <div className="skeleton" style={{ height: '18px', width: '80%' }} />
        </td>
      ))}
    </tr>
  );
}
