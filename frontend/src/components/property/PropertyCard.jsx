import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, Move, MapPin, Heart } from 'lucide-react';
import Badge from '../common/Badge';
import { formatPrice } from '../../utils/formatters';
import { favoriteService } from '../../services/favoriteService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { getPropertySlug } from '../../utils/slugify';

export default function PropertyCard({ property, onFavoriteToggle }) {
  const { isAuthenticated } = useAuth();
  const { success, info } = useToast();
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);
  const [loadingFav, setLoadingFav] = useState(false);

  const propertySlug = getPropertySlug(property);
  const propertyUrl = `/properties/${propertySlug}`;

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      info('Please log in to save properties to your favorites.');
      return;
    }

    setLoadingFav(true);
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(property.id);
        setIsFavorite(false);
        success('Property removed from favorites');
      } else {
        await favoriteService.addFavorite(property.id);
        setIsFavorite(true);
        success('Property saved to favorites');
      }
      if (onFavoriteToggle) {
        onFavoriteToggle(property.id, !isFavorite);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setLoadingFav(false);
    }
  };

  let statusBadgeVariant = 'primary';
  if (property.status === 'UNDER_OFFER') statusBadgeVariant = 'warning';
  if (property.status === 'SOLD' || property.status === 'RENTED') statusBadgeVariant = 'danger';

  return (
    <div className="card property-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* Media Box */}
      {(() => {
        const imageSource = property.primaryImageUrl || property.imageUrl || property.coverImageUrl || property.images?.[0]?.imagePath || property.images?.[0]?.imageUrl || property.images?.[0]?.url;
        if (!imageSource) return null;
        return (
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#0B0F19' }}>
            <Link to={propertyUrl} style={{ display: 'block', width: '100%', height: '100%' }}>
              <img
                src={imageSource}
                alt={property.title}
                loading="lazy"
                decoding="async"
                width="400"
                height="220"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 300ms ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>

            {/* Top Badges */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2 }}>
              <Badge variant={statusBadgeVariant}>
                {property.status?.replace('_', ' ')}
              </Badge>
              <Badge variant="dark">
                {property.listingType}
              </Badge>
            </div>

            {/* Favorite Action Button */}
            <button
              type="button"
              onClick={handleFavoriteClick}
              disabled={loadingFav}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isFavorite ? '#F43F5E' : '#FFFFFF',
                transition: 'transform 150ms ease',
                zIndex: 2,
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            >
              <Heart size={18} fill={isFavorite ? '#F43F5E' : 'none'} />
            </button>
          </div>
        );
      })()}

      {/* Property Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem' }}>
        {/* Price & Type */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
            {formatPrice(property.price, property.listingType)}
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {property.propertyType}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.35 }}>
          <Link to={propertyUrl} style={{ color: 'var(--text-primary)' }}>
            {property.title}
          </Link>
        </h3>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
          <MapPin size={14} color="var(--color-gold-500)" style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {property.societyName ? `${property.societyName}, ${property.city}` : property.location ? (property.location.includes(property.city) ? property.location : `${property.location}, ${property.city}`) : property.city}
          </span>
        </div>

        {/* Specs Grid */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.875rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8125rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Bedrooms">
            <Bed size={15} color="var(--color-dark-500)" />
            <span><strong>{property.bedrooms}</strong> Beds</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Bathrooms">
            <Bath size={15} color="var(--color-dark-500)" />
            <span><strong>{property.bathrooms}</strong> Baths</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} title="Area">
            <Square size={14} color="var(--color-dark-500)" />
            <span><strong>{property.area}</strong> sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}
