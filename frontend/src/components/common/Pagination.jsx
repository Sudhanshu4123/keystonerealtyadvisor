import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  hasNext = false,
  hasPrevious = false
}) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}>
      <button
        type="button"
        className="btn btn-outline btn-sm"
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>

      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '0 0.75rem' }}>
        Page <strong>{currentPage + 1}</strong> of <strong>{totalPages}</strong>
      </span>

      <button
        type="button"
        className="btn btn-outline btn-sm"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
