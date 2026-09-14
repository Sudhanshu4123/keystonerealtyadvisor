import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { favoriteService } from '../../services/favoriteService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import ImageGallery from '../../components/property/ImageGallery';
import PropertyEnquiryModal from '../../components/property/PropertyEnquiryModal';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  MessageSquare,
  Phone,
  ArrowLeft,
  Calendar,
  Check,
  ShieldCheck
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { success, error, info } = useToast();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        const res = await propertyService.getPropertyById(id);
        if (res.success && res.data) {
          setProperty(res.data);
          setIsFavorite(res.data.isFavorite || false);
        }
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadProperty();
    }
  }, [id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      info('Please sign in to save properties to your favorites.');
      return;
    }
    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(property.id);
        setIsFavorite(false);
        success('Property removed from favorites.');
      } else {
        await favoriteService.addFavorite(property.id);
        setIsFavorite(true);
        success('Property added to favorites.');
      }
    } catch (err) {
      error('Failed to update favorite status.');
    }
  };

  const formatPrice = (val, listingType) => {
    if (!val) return 'Price on Enquiry';
    const num = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
    return listingType === 'RENT' ? `${num}/mo` : num;
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading property information...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container" style={{ padding: '5rem 0' }}>
        <EmptyState
          title="Property Not Found"
          description="The requested listing may have been unlisted, sold, or moved."
          actionLabel="Browse Available Properties"
          actionLink="/properties"
        />
      </div>
    );
  }

  let statusBadgeVariant = 'gold';
  if (property.status === 'AVAILABLE') statusBadgeVariant = 'success';
  if (property.status === 'UNDER_OFFER') statusBadgeVariant = 'warning';
  if (property.status === 'SOLD' || property.status === 'RENTED') statusBadgeVariant = 'danger';

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '2.5rem 0 5rem' }}>
      <div className="container">
        {/* Back navigation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Link to="/properties" className="btn btn-ghost btn-sm" style={{ paddingLeft: 0, gap: '0.375rem' }}>
            <ArrowLeft size={16} />
            <span>Back to all properties</span>
          </Link>
        </div>

        {/* Title & Status Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Badge variant={statusBadgeVariant}>
                {property.status?.replace('_', ' ')}
              </Badge>
              <Badge variant="dark">
                {property.listingType}
              </Badge>
              <Badge variant="gold">
                {property.propertyType}
              </Badge>
            </div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {property.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              <MapPin size={16} color="var(--color-gold-500)" />
              <span>{property.location}, {property.city}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {formatPrice(property.price, property.listingType)}
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Property Ref: #{property.id}
            </span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2.5rem' }} className="property-detail-grid">
          {/* Left Column: Gallery & Details */}
          <div>
            {/* Gallery */}
            <div style={{ marginBottom: '2.5rem' }}>
              <ImageGallery images={property.images} title={property.title} />
            </div>

            {/* Core Specifications Bar */}
            <div
              className="card"
              style={{
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Bedrooms</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <Bed size={18} color="var(--color-gold-500)" />
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.bedrooms} Beds</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Bathrooms</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <Bath size={18} color="var(--color-gold-500)" />
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.bathrooms} Baths</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Area</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <Square size={18} color="var(--color-gold-500)" />
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.area} sqft</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Furnishing</span>
                <div style={{ marginTop: '0.25rem', fontSize: '1.0625rem', fontWeight: 600 }}>
                  {property.furnished?.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Property Description */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                Property Description
              </h3>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>
                {property.description || 'No extended description provided for this listing.'}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Box */}
          <div>
            <div
              className="card"
              style={{
                padding: '2rem',
                position: 'sticky',
                top: 'calc(var(--header-height) + 1.5rem)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <img src="/keystone-logo.svg" alt="Keystone" style={{ width: '32px', height: '32px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.1 }}>KEYSTONE REALTY ADVISOR</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--color-gold-600)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Advisory Representation
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Interested in this property or need advisory representation? Our senior advisors provide confidential consultations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEnquiryModalOpen(true)}
                  className="btn btn-primary btn-block btn-lg"
                >
                  <MessageSquare size={18} />
                  <span>Enquire on this Property</span>
                </button>

                <button
                  type="button"
                  onClick={handleFavoriteToggle}
                  className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline'} btn-block`}
                >
                  <Heart size={16} fill={isFavorite ? '#FFFFFF' : 'none'} />
                  <span>{isFavorite ? 'Saved in Portfolio' : 'Save to Favorites'}</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={16} color="var(--color-gold-500)" />
                  <span>Direct Advisor Contact</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} color="var(--color-gold-500)" />
                  <span>+91 9911956274</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .property-detail-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>

      {/* Enquiry Modal */}
      <PropertyEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        property={property}
      />
    </div>
  );
}
