import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  hasNext,
  hasPrevious,
}) {
  const activeBtnRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Compute disabled states with fallback to currentPage boundary checks
  const canGoPrevious = hasPrevious !== undefined ? hasPrevious : currentPage > 0;
  const canGoNext = hasNext !== undefined ? hasNext : currentPage < totalPages - 1;

  // Auto-scroll the active page into center of swipe container
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeBtn = activeBtnRef.current;
      const scrollLeft =
        activeBtn.offsetLeft -
        container.offsetWidth / 2 +
        activeBtn.offsetWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [currentPage]);

  if (totalPages <= 1) return null;

  // Generate page numbers array with sliding window & smart dots
  const getPageItems = () => {
    // If 10 or fewer pages, display all numbers directly
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const current1Based = currentPage + 1;

    // When near the beginning
    if (current1Based <= 4) {
      return [1, 2, 3, 4, 5, 'dots-right', totalPages];
    }

    // When near the end
    if (current1Based >= totalPages - 3) {
      return [
        1,
        'dots-left',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // When in the middle
    return [
      1,
      'dots-left',
      current1Based - 1,
      current1Based,
      current1Based + 1,
      'dots-right',
      totalPages,
    ];
  };

  const pageItems = getPageItems();

  return (
    <nav
      className="pagination-root"
      aria-label="Pagination Navigation"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '2.5rem',
        padding: '0.5rem 0',
        width: '100%',
      }}
    >
      {/* Previous Button */}
      <button
        type="button"
        className="pagination-nav-btn"
        disabled={!canGoPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="pagination-nav-text">Previous</span>
      </button>

      {/* Swipeable / Scrollable Page Numbers Container */}
      <div
        ref={scrollContainerRef}
        className="pagination-numbers-scroll"
        role="group"
        aria-label="Page selection"
      >
        {pageItems.map((item, index) => {
          if (item === 'dots-left') {
            return (
              <button
                key={`dots-left-${index}`}
                type="button"
                className="pagination-dots-btn"
                onClick={() => onPageChange(Math.max(0, currentPage - 5))}
                title="Jump 5 pages backward"
                aria-label="Jump 5 pages backward"
              >
                &hellip;
              </button>
            );
          }

          if (item === 'dots-right') {
            return (
              <button
                key={`dots-right-${index}`}
                type="button"
                className="pagination-dots-btn"
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 5))}
                title="Jump 5 pages forward"
                aria-label="Jump 5 pages forward"
              >
                &hellip;
              </button>
            );
          }

          const pageNumber = item;
          const pageIndex = pageNumber - 1;
          const isActive = pageIndex === currentPage;

          return (
            <button
              key={`page-${pageNumber}`}
              ref={isActive ? activeBtnRef : null}
              type="button"
              className={`pagination-num-btn ${isActive ? 'active' : ''}`}
              onClick={() => onPageChange(pageIndex)}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        className="pagination-nav-btn"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
      >
        <span className="pagination-nav-text">Next</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>

      <style>{`
        .pagination-root {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          user-select: none;
        }

        .pagination-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 38px;
          padding: 0 0.85rem;
          border-radius: var(--radius-md, 6px);
          background-color: #FFFFFF;
          color: var(--text-primary, #0F172A);
          border: 1px solid var(--border-color, #E2E8F0);
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .pagination-nav-btn:hover:not(:disabled) {
          border-color: #D4AF37;
          color: #B8860B;
          background-color: #FDFBF5;
        }

        .pagination-nav-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          background-color: #F8FAFC;
        }

        .pagination-numbers-scroll {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          max-width: clamp(200px, 60vw, 480px);
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.25rem 0.2rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .pagination-numbers-scroll::-webkit-scrollbar {
          display: none;
        }

        .pagination-num-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          padding: 0 0.45rem;
          border-radius: var(--radius-md, 6px);
          background-color: #FFFFFF;
          color: var(--text-primary, #1E293B);
          border: 1px solid var(--border-color, #E2E8F0);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .pagination-num-btn:hover:not(.active) {
          border-color: #D4AF37;
          color: #B8860B;
          background-color: #FDFBF5;
        }

        .pagination-num-btn.active {
          background-color: #D4AF37;
          color: #070A11;
          border-color: #D4AF37;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.35);
        }

        .pagination-dots-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          height: 36px;
          background: transparent;
          border: 1px dashed transparent;
          color: var(--text-secondary, #64748B);
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: var(--radius-md, 6px);
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .pagination-dots-btn:hover {
          border-color: #D4AF37;
          color: #B8860B;
          background-color: #FDFBF5;
        }

        @media (max-width: 540px) {
          .pagination-nav-btn {
            height: 36px;
            padding: 0 0.6rem;
          }
          .pagination-num-btn {
            min-width: 34px;
            height: 34px;
            font-size: 0.8125rem;
          }
          .pagination-dots-btn {
            min-width: 26px;
            height: 34px;
          }
        }
      `}</style>
    </nav>
  );
}
