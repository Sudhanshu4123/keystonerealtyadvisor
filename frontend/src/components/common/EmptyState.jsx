import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  title = "No properties available at the moment.",
  description = "New listings and verified advisory portfolios are updated regularly. Please check back soon or contact our advisory team.",
  actionLabel,
  actionLink,
  onActionClick,
  icon
}) {
  const renderIcon = () => {
    if (!icon) {
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === 'function' || typeof icon === 'object') {
      const IconComponent = icon;
      return <IconComponent size={28} />;
    }
    return icon;
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {renderIcon()}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && (
        actionLink ? (
          <Link to={actionLink} className="btn btn-outline-gold btn-sm">
            {actionLabel}
          </Link>
        ) : (
          <button onClick={onActionClick} className="btn btn-outline-gold btn-sm">
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
