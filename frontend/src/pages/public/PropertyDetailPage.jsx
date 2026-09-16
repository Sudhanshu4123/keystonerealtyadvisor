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
import SEO from '../../components/common/SEO';
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
  ShieldCheck,
  MessageCircle
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
    const num = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
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
      <SEO
        title={`${property.title}${property.city ? ` in ${property.city}` : ''} | Keystone Realty Advisor`}
        description={
          property.description
            ? `${property.description.slice(0, 150)}... Contact Keystone Realty Advisor for verified details and site visits.`
            : `${property.bedrooms ? `${property.bedrooms} BHK ` : ''}${property.propertyType || 'Property'} for ${property.listingType === 'RENT' ? 'rent' : 'sale'} in ${property.location || property.city || 'prime location'}. Clear titles & verified property documentation.`
        }
        keywords={`${property.title}, ${property.propertyType || 'Property'}, ${property.city || ''}, ${property.location || ''}, buy property, real estate advisor`}
        ogImage={property.images?.[0]?.url || property.imageUrl || '/keystone-logo.png'}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: property.title,
          description: property.description || property.title,
          url: window.location.href,
          image: property.images?.[0]?.imagePath || property.images?.[0]?.imageUrl || 'https://keystonerealtyadvisor.com/keystone-logo.png',
          offers: {
            '@type': 'Offer',
            price: property.price || 0,
            priceCurrency: 'INR',
            availability: property.status === 'AVAILABLE' ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
            validFrom: property.createdAt || undefined,
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: property.location || property.city || 'Delhi NCR',
            addressRegion: property.city || 'Delhi',
            addressCountry: 'IN'
          }
        }}
      />
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
              <span>{property.societyName ? `${property.societyName}, ${property.city}` : property.location ? (property.location.includes(property.city) ? property.location : `${property.location}, ${property.city}`) : property.city}</span>
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
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.bedrooms} BHK</span>
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
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Built-Up Area</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <Square size={18} color="var(--color-gold-500)" />
                  <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.builtUpArea || property.area} sqft</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Furnishing</span>
                <div style={{ marginTop: '0.25rem', fontSize: '1.0625rem', fontWeight: 600 }}>
                  {property.furnished?.replace('_', ' ')}
                </div>
              </div>
            </div>

            {/* Detailed Property Specifications Grid */}
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 600, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                Property Specifications & Lease Details
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                {property.societyName && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Building / Society</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.societyName}</strong>
                  </div>
                )}

                {property.carpetArea && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Carpet Area</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.carpetArea} sq ft</strong>
                  </div>
                )}

                {property.floorNo && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Floor Number</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                      Floor {property.floorNo} {property.totalFloors ? `of ${property.totalFloors} floors` : ''}
                    </strong>
                  </div>
                )}

                {(property.coveredParking > 0 || property.openParking > 0) && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Parking</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                      {[
                        property.coveredParking > 0 ? `${property.coveredParking} Covered` : null,
                        property.openParking > 0 ? `${property.openParking} Open` : null
                      ].filter(Boolean).join(', ')}
                    </strong>
                  </div>
                )}

                {property.balconies !== undefined && property.balconies !== null && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Balconies</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.balconies} Balconies</strong>
                  </div>
                )}

                {property.propertyAge && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Age of Property</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.propertyAge}</strong>
                  </div>
                )}

                {property.availableFrom && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Available From</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.availableFrom}</strong>
                  </div>
                )}

                {property.maintenanceCharges && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Maintenance</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.maintenanceCharges}</strong>
                  </div>
                )}

                {property.securityDeposit && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Security Deposit</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.securityDeposit}</strong>
                  </div>
                )}

                {property.lockInPeriod && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Lock-in Period</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.lockInPeriod}</strong>
                  </div>
                )}

                {property.preferredTenant && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Preferred Tenant</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.preferredTenant}</strong>
                  </div>
                )}

                {property.petFriendly !== undefined && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Pet Friendly</span>
                    <strong style={{ fontSize: '0.9375rem', color: property.petFriendly ? '#16A34A' : 'var(--text-primary)' }}>
                      {property.petFriendly ? 'Yes' : 'No'}
                    </strong>
                  </div>
                )}

                {property.brokerage && (
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Brokerage</span>
                    <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.brokerage}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Flat Furnishings Section */}
            {(() => {
              let parsedFurnishing = null;
              if (property.furnishingDetails) {
                try {
                  parsedFurnishing = typeof property.furnishingDetails === 'object'
                    ? property.furnishingDetails
                    : JSON.parse(property.furnishingDetails);
                } catch (e) {
                  parsedFurnishing = null;
                }
              }

              if (!parsedFurnishing) return null;

              const activeCounters = Object.entries(parsedFurnishing.counters || {}).filter(([k, v]) => Number(v) > 0);
              const activeToggles = Object.entries(parsedFurnishing.toggles || {}).filter(([k, v]) => Boolean(v));

              if (activeCounters.length === 0 && activeToggles.length === 0) return null;

              const formatLabel = (key) => {
                if (key.toLowerCase() === 'ac') return 'AC';
                if (key.toLowerCase() === 'tv') return 'TV';
                return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
              };

              return (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 600, margin: 0 }}>
                      Flat Furnishings & Appliances
                    </h3>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold-600)', backgroundColor: '#FDF8EA', padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)' }}>
                      {activeCounters.length + activeToggles.length} Items Included
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {activeCounters.map(([itemKey, count], idx) => (
                      <div
                        key={`c-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#F8FAFC',
                          padding: '0.625rem 0.875rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Check size={14} color="var(--color-gold-500)" strokeWidth={3} />
                          <span>{formatLabel(itemKey)}</span>
                        </div>
                        <span style={{ fontWeight: 700, color: 'var(--color-gold-700)', backgroundColor: '#FEF3C7', padding: '1px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>
                          {count}x
                        </span>
                      </div>
                    ))}

                    {activeToggles.map(([itemKey], idx) => (
                      <div
                        key={`t-${idx}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: '#F8FAFC',
                          padding: '0.625rem 0.875rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        <Check size={14} color="var(--color-gold-500)" strokeWidth={3} />
                        <span>{formatLabel(itemKey)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Society Amenities Section */}
            {(() => {
              let parsedAmenities = [];
              if (property.amenities) {
                try {
                  parsedAmenities = JSON.parse(property.amenities);
                } catch (e) {
                  parsedAmenities = property.amenities.split(',').map((s) => s.trim()).filter(Boolean);
                }
              }
              if (!Array.isArray(parsedAmenities) || parsedAmenities.length === 0) return null;

              return (
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1875rem', fontWeight: 600, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    Society Amenities & Features
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {parsedAmenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: '#F8FAFC',
                          padding: '0.5rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                        }}
                      >
                        <Check size={14} color="var(--color-gold-500)" strokeWidth={3} />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

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

                <a
                  href={`https://wa.me/919911956274?text=${encodeURIComponent(`Hello Keystone Realty Advisor, I am interested in: ${property.title} (Ref #${property.id}) located in ${property.location || property.city || 'Delhi'}. Please share verified details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-block"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 600,
                    gap: '0.5rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Chat on WhatsApp</span>
                </a>

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
                <a
                  href="tel:+919911956274"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}
                >
                  <Phone size={16} color="var(--color-gold-500)" />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>+91 9911956274</span>
                </a>
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
