import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Reusable SEO-friendly Breadcrumbs component
 * @param {Array<{ label: string, path?: string }>} items - List of breadcrumb items
 */
export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" style={{ margin: '0 0 1.25rem 0' }}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.375rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '0.8125rem',
          color: 'var(--text-muted)',
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
            }}
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <ChevronRight size={13} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              {item.path && !isLast ? (
                <Link
                  to={item.path}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isLast ? 600 : 400,
                    maxWidth: '280px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
