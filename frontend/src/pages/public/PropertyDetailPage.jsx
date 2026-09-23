import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { favoriteService } from '../../services/favoriteService';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { formatPrice, formatDate } from '../../utils/formatters';
import ImageGallery from '../../components/property/ImageGallery';
import PropertyEnquiryModal from '../../components/property/PropertyEnquiryModal';
import Badge from '../../components/common/Badge';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SEO from '../../components/common/SEO';
import { getPropertySlug } from '../../utils/slugify';
import {
  Bed,
  Bath,
  Square,
  Move,
  MapPin,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Check,
  X,
  ShieldCheck,
  MessageCircle,
  Users,
  Shield,
  Lock,
  Fingerprint,
  Camera,
  Tv,
  Coffee,
  Utensils,
  Shirt,
  Sparkles,
  Dumbbell,
  ArrowUpDown,
  Droplets,
  Waves,
  Zap,
  BatteryCharging,
  Car,
  Home,
  Layers,
  Sliders,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function PropertyDetailPage() {
  const { id: routeParam } = useParams();
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id');
  const identifier = routeParam || queryId;

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
        const res = await propertyService.getPropertyById(identifier);
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
    if (identifier) {
      loadProperty();
    }
  }, [identifier]);

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

  const propertySlug = getPropertySlug(property);
  const canonicalPath = `/properties/${propertySlug}`;

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
        canonicalUrl={canonicalPath}
        ogImage={property.images?.[0]?.url || property.imageUrl || '/keystone-logo.png'}
        geoPlacename={property.location && property.city ? `${property.location}, ${property.city}, India` : (property.city ? `${property.city}, India` : (property.location ? `${property.location}, India` : null))}
        locality={property.city || property.location || null}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: property.title, path: canonicalPath },
        ]}
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
            addressLocality: property.location || property.city || '',
            addressRegion: property.city || '',
            addressCountry: 'IN'
          }
        }}
      />
      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Properties', path: '/properties' },
            { label: property.title },
          ]}
        />

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
            {property.listingType === 'PG_CO_LIVING' ? (
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
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Total Beds</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Bed size={18} color="var(--color-gold-500)" />
                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.totalBeds ? `${property.totalBeds} Beds` : 'Co-Living'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>PG Is For</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Users size={18} color="var(--color-gold-500)" />
                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.pgFor || 'Open for all'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Best Suited For</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <CheckCircle2 size={18} color="var(--color-gold-500)" />
                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>{property.bestSuitedFor || 'Students & Working'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>Meals Available</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <Utensils size={18} color="var(--color-gold-500)" />
                    <span style={{ fontSize: '1.125rem', fontWeight: 600, color: property.mealsAvailable ? '#16A34A' : 'var(--text-primary)' }}>
                      {property.mealsAvailable ? 'Yes (Included)' : 'No Meals'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
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
            )}

            {/* PG SPECIFIC SECTIONS */}
            {property.listingType === 'PG_CO_LIVING' && (
              <>
                {/* ROOM DETAILS SECTION */}
                {(() => {
                  let rooms = [];
                  if (property.pgRooms) {
                    try {
                      rooms = typeof property.pgRooms === 'string' ? JSON.parse(property.pgRooms) : property.pgRooms;
                    } catch (e) {
                      rooms = [];
                    }
                  }
                  if (!Array.isArray(rooms) || rooms.length === 0) return null;

                  return (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, margin: 0 }}>
                          Room Options & Sharing Types
                        </h3>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold-600)', backgroundColor: '#FDF8EA', padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)' }}>
                          {rooms.length} Room Category{rooms.length > 1 ? 'ies' : 'y'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {rooms.map((room, idx) => (
                          <div
                            key={room.id || idx}
                            style={{
                              padding: '1.25rem',
                              border: '1px solid #E2E8F0',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: '#F8FAFC',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.875rem'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                              <div>
                                <h4 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-navy-900)', margin: '0 0 0.25rem' }}>
                                  {room.roomType || `Room ${idx + 1}`}
                                </h4>
                                {room.totalBeds && (
                                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                    {room.totalBeds} Bed{Number(room.totalBeds) > 1 ? 's' : ''} in room
                                  </span>
                                )}
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold-700)' }}>
                                  {room.rent ? `₹${Number(room.rent).toLocaleString('en-IN')}` : 'Contact for Rent'}
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}> / month</span>
                                </div>
                                {room.securityDeposit && (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Deposit: ₹{Number(room.securityDeposit).toLocaleString('en-IN')}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Facilities in room */}
                            {Array.isArray(room.facilities) && room.facilities.length > 0 && (
                              <div>
                                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>
                                  Room Facilities Included:
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                  {room.facilities.map((fac, fIdx) => (
                                    <span
                                      key={fIdx}
                                      style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.375rem',
                                        padding: '0.25rem 0.625rem',
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #CBD5E1',
                                        borderRadius: '4px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                        color: '#334155'
                                      }}
                                    >
                                      <Check size={12} color="var(--color-gold-600)" strokeWidth={3} />
                                      <span>{fac}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* PG HOUSE RULES SECTION */}
                {(() => {
                  let rules = null;
                  if (property.pgRules) {
                    try {
                      rules = typeof property.pgRules === 'string' ? JSON.parse(property.pgRules) : property.pgRules;
                    } catch (e) {
                      rules = null;
                    }
                  }
                  if (!rules || Object.keys(rules).length === 0) return null;

                  const ruleList = [
                    { key: 'nonVegAllowed', label: 'Non-Veg Food' },
                    { key: 'oppositeSexAllowed', label: 'Opposite Sex Allowed' },
                    { key: 'anyTimeAllowed', label: 'Late Entry / 24x7 Entry' },
                    { key: 'visitorsAllowed', label: 'Visitors Allowed' },
                    { key: 'guardianAllowed', label: 'Guardian / Parent Stay' },
                    { key: 'drinkingAllowed', label: 'Drinking / Alcohol' },
                    { key: 'smokingAllowed', label: 'Smoking' },
                  ];

                  return (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        PG House Rules & Code of Conduct
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {ruleList.map((rule) => {
                          const isAllowed = Boolean(rules[rule.key]);
                          return (
                            <div
                              key={rule.key}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.625rem 0.875rem',
                                backgroundColor: isAllowed ? '#F0FDF4' : '#FEF2F2',
                                border: isAllowed ? '1px solid #BBF7D0' : '1px solid #FECACA',
                                borderRadius: 'var(--radius-sm)',
                                fontSize: '0.8125rem'
                              }}
                            >
                              <span style={{ fontWeight: 600, color: isAllowed ? '#166534' : '#991B1B' }}>
                                {rule.label}
                              </span>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  color: isAllowed ? '#15803D' : '#DC2626'
                                }}
                              >
                                {isAllowed ? (
                                  <>
                                    <Check size={14} strokeWidth={3} />
                                    <span>Allowed</span>
                                  </>
                                ) : (
                                  <>
                                    <X size={14} strokeWidth={3} />
                                    <span>Not Allowed</span>
                                  </>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* COMMON AREAS & CARETAKER DETAILS */}
                {(() => {
                  let areas = [];
                  if (property.commonAreas) {
                    try {
                      areas = typeof property.commonAreas === 'string' ? JSON.parse(property.commonAreas) : property.commonAreas;
                    } catch (e) {
                      areas = [];
                    }
                  }

                  return (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                      <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        Common Areas & Caretaker Services
                      </h3>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Property Managed By
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                            {property.propertyManagedBy || 'Landlord / Resident Caretaker'}
                          </strong>
                        </div>

                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Caretaker Stays at Property
                          </span>
                          <strong style={{ fontSize: '0.9375rem', color: property.managerStaysAtProperty ? '#16A34A' : 'var(--text-primary)' }}>
                            {property.managerStaysAtProperty ? 'Yes (24x7 Assistance)' : 'No'}
                          </strong>
                        </div>
                      </div>

                      {Array.isArray(areas) && areas.length > 0 && (
                        <div>
                          <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
                            Shared Common Areas
                          </span>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {areas.map((area, aIdx) => (
                              <span
                                key={aIdx}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.375rem',
                                  padding: '0.375rem 0.75rem',
                                  backgroundColor: '#F1F5F9',
                                  border: '1px solid #CBD5E1',
                                  borderRadius: 'var(--radius-sm)',
                                  fontSize: '0.8125rem',
                                  fontWeight: 600,
                                  color: '#1E293B'
                                }}
                              >
                                <CheckCircle2 size={14} color="var(--color-gold-600)" />
                                <span>{area}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* PG AMENITIES & SERVICES (Images 3 & 4) */}
                {(() => {
                  const parseArray = (val) => {
                    if (!val) return [];
                    if (Array.isArray(val)) return val;
                    try { return JSON.parse(val); } catch (e) { return []; }
                  };

                  const sec = parseArray(property.pgSecurityAmenities);
                  const furn = parseArray(property.pgFurnishings);
                  const serv = parseArray(property.pgServices);
                  const topA = parseArray(property.pgTopAmenities);

                  const totalItems = sec.length + furn.length + serv.length + topA.length;
                  if (totalItems === 0) return null;

                  return (
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, margin: 0 }}>
                          PG Amenities, Furnishings & Services
                        </h3>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gold-600)', backgroundColor: '#FDF8EA', padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-full)' }}>
                          {totalItems} Amenities
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {sec.length > 0 && (
                          <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                              Security & Safety
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {sec.map((item, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                  <Shield size={13} color="var(--color-gold-600)" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {furn.length > 0 && (
                          <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                              Furnishings & Appliances in Property
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {furn.map((item, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                  <Check size={13} color="var(--color-gold-600)" strokeWidth={3} />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {serv.length > 0 && (
                          <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                              Included Services
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {serv.map((item, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                  <Sparkles size={13} color="var(--color-gold-600)" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {topA.length > 0 && (
                          <div>
                            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                              Top Amenities & Campus Facilities
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                              {topA.map((item, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                  <CheckCircle2 size={13} color="var(--color-gold-600)" />
                                  <span>{item}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* PG CHARGES & POLICIES (Image 5) */}
                <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                    Charges & Policy Terms
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem 1.5rem', fontSize: '0.875rem' }}>
                    {property.noticePeriod && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Notice Period</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.noticePeriod} Days</strong>
                      </div>
                    )}

                    {property.lockInPeriod && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Lock-in Period</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.lockInPeriod}</strong>
                      </div>
                    )}

                    {property.onetimeMoveInCharges && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Onetime Move-in Charges</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>₹{Number(property.onetimeMoveInCharges).toLocaleString('en-IN')}</strong>
                      </div>
                    )}

                    {property.mealChargesPerMonth && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Monthly Meal Charges</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>₹{Number(property.mealChargesPerMonth).toLocaleString('en-IN')} / mo</strong>
                      </div>
                    )}

                    {property.electricityChargesPerMonth && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Electricity Charges</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>₹{Number(property.electricityChargesPerMonth).toLocaleString('en-IN')} / mo</strong>
                      </div>
                    )}

                    {property.maintenanceCharges && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Maintenance</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.maintenanceCharges}</strong>
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

                {/* Additional PG Information */}
                {property.additionalInfo && (
                  <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                      Additional PG Information & Guidelines
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>
                      {property.additionalInfo}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Detailed Property Specifications Grid (Residential & Commercial) */}
            {property.listingType !== 'PG_CO_LIVING' && (
              <>
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

                    {property.transactionType && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Transaction Type</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.transactionType}</strong>
                      </div>
                    )}

                    {property.constructionStatus && (
                      <div>
                        <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Construction Status</span>
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{property.constructionStatus}</strong>
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
                        <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                          {property.preferredTenant.includes('Bachelors') && property.bachelorPreference && property.bachelorPreference !== 'Open for both'
                            ? property.preferredTenant.replace('Bachelors', `Bachelors (${property.bachelorPreference})`)
                            : property.preferredTenant}
                        </strong>
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
              </>
            )}

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
                  href={`https://wa.me/919911956274?text=${encodeURIComponent(`Hello Keystone Realty Advisor, I am interested in: ${property.title} (Ref #${property.id})${property.location || property.city ? ` located in ${property.location ? `${property.location}, ` : ''}${property.city || ''}` : ''}. Please share verified details.`)}`}
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
