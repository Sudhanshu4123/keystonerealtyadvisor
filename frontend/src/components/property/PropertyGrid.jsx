import React from 'react';
import PropertyCard from './PropertyCard';
import { PropertyCardSkeleton } from '../common/LoadingSkeleton';
import EmptyState from '../common/EmptyState';

export default function PropertyGrid({
  properties = [],
  loading = false,
  emptyTitle = "No properties available at the moment.",
  emptyDescription = "New verified advisory listings will appear here once published by our advisory team.",
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
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
      />
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
