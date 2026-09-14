import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState';
import SEO from '../../components/common/SEO';

export default function NotFoundPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0' }}>
      <SEO
        title="Page Not Found (404) | Keystone Realty Advisor"
        description="The page you are looking for could not be found. Return to Keystone Realty Advisor homepage."
        noIndex={true}
      />
      <div className="container" style={{ maxWidth: '540px' }}>
        <EmptyState
          title="Page Not Found (404)"
          description="The requested page could not be located. Please verify the URL or return to our homepage."
          actionLabel="Return to Homepage"
          actionLink="/"
        />
      </div>
    </div>
  );
}
