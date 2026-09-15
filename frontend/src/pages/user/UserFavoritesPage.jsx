import React, { useState, useEffect } from 'react';
import { favoriteService } from '../../services/favoriteService';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import { Heart } from 'lucide-react';

export default function UserFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);
      try {
        const res = await favoriteService.getUserFavorites(page, 12);
        if (res.success && res.data) {
          setFavorites(res.data.content || []);
          setPageInfo({
            totalPages: res.data.totalPages,
            hasNext: res.data.hasNext,
            hasPrevious: res.data.hasPrevious,
          });
        }
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFavorites();
  }, [page]);

  const handleFavoriteToggle = (propertyId, isNowFavorite) => {
    if (!isNowFavorite) {
      setFavorites((prev) => prev.filter((p) => p.id !== propertyId));
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
      <SEO title="Saved Portfolio Properties" noIndex={true} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <Heart size={22} color="var(--color-gold-500)" />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Saved Properties</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Your curated portfolio shortlist of properties for review and comparison
          </p>
        </div>
      </div>

      <PropertyGrid
        properties={favorites}
        loading={loading}
        emptyTitle="No saved properties found."
        emptyDescription="Explore our listings and click the heart icon to save properties to your shortlist."
        onFavoriteToggle={handleFavoriteToggle}
        columns={3}
      />

      <Pagination
        currentPage={page}
        totalPages={pageInfo.totalPages}
        hasNext={pageInfo.hasNext}
        hasPrevious={pageInfo.hasPrevious}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
