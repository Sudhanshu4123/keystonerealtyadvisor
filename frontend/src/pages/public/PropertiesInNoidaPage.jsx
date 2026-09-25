import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyGrid from '../../components/property/PropertyGrid';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Search,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Landmark
} from 'lucide-react';

export default function PropertiesInNoidaPage() {
  const [listingTypeFilter, setListingTypeFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [bhkFilter, setBhkFilter] = useState('');
  const [localityFilter, setLocalityFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const localities = [
    { name: 'All Localities in Noida', value: '' },
    { name: 'Noida Expressway (Sector 128, 137, 143, 150)', value: 'Noida Expressway' },
    { name: 'Central Noida (Sector 50, 75, 76, 78)', value: 'Central Noida' },
    { name: 'Greater Noida West / Noida Extension', value: 'Greater Noida West' },
    { name: 'Sector 62 / Sector 63 (Commercial Hub)', value: 'Sector 62' },
    { name: 'Yamuna Expressway (Near Jewar Airport)', value: 'Yamuna Expressway' },
  ];

  const bhkOptions = [
    { label: 'All BHKs', value: '' },
    { label: '1 BHK', value: '1' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4+ BHK Luxury', value: '4' },
  ];

  useEffect(() => {
    async function fetchNoidaProperties() {
      setLoading(true);
      try {
        const queryParams = {
          city: 'Noida',
          size: 12,
        };

        if (listingTypeFilter) {
          queryParams.listingType = listingTypeFilter;
        }
        if (propertyTypeFilter) {
          queryParams.propertyType = propertyTypeFilter;
        }
        if (bhkFilter) {
          queryParams.bedrooms = Number(bhkFilter);
        }
        if (localityFilter) {
          queryParams.location = localityFilter;
        }
        if (maxPriceFilter) {
          queryParams.maxPrice = Number(maxPriceFilter);
        }

        const res = await propertyService.searchProperties(queryParams);
        if (res.success && res.data && res.data.content && res.data.content.length > 0) {
          setProperties(res.data.content);
        } else {
          // Fallback to recent/featured listings
          const fallbackRes = await propertyService.getFeaturedProperties();
          if (fallbackRes.success && fallbackRes.data) {
            setProperties(fallbackRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load properties in Noida:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNoidaProperties();
  }, [listingTypeFilter, propertyTypeFilter, bhkFilter, localityFilter, maxPriceFilter]);

  const faqs = [
    {
      q: 'Which are the best sectors to invest in Noida & Greater Noida?',
      a: 'Top investment sectors include Sector 150 (sports city green corridor), Sector 128 (expressway luxury), Sector 137/143 (metro corridor), and Yamuna Expressway due to proximity to the upcoming Jewar International Airport.',
    },
    {
      q: 'What is the price range of flats and apartments in Noida?',
      a: 'In Greater Noida West and Noida Extension, 2/3 BHK flats start around ₹55 Lakh to ₹1.2 Crore. On Noida Expressway and Sector 150 luxury societies, prices range from ₹1.5 Crore to ₹8+ Crore.',
    },
    {
      q: 'Are properties in Noida registered under UP RERA?',
      a: 'Yes, all projects and properties promoted by Keystone Realty Advisor are 100% verified under UP RERA regulations with verified occupancy / completion certificates.',
    },
    {
      q: 'How can I connect with an advisor for Noida real estate?',
      a: 'Call our direct helpline at +91 9911956274 or submit an inquiry on any listing to receive customized property brochures, site tour bookings, and valuation analysis.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      <SEO
        title="Properties in Noida | Luxury Flats, Villas & Commercial Real Estate"
        description="Search from verified properties in Noida & Greater Noida. Explore luxury 2, 3, 4 BHK apartments, villas, and commercial real estate on Noida Expressway, Sector 150, and Greater Noida West."
        keywords="properties in noida, flats in noida, buy property in noida, flats in greater noida west, noida expressway apartments, property for sale in noida, commercial property noida, Keystone Realty Advisor"
        geoPlacename="Noida"
        geoRegion="IN-UP"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Properties in Noida', path: '/properties-in-noida' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-noida#webpage',
              url: 'https://keystonerealtyadvisor.com/properties-in-noida',
              name: 'Properties in Noida | Verified Real Estate Listings & Advisory',
              description: 'Explore verified residential and commercial properties for sale and rent in Noida and Greater Noida.',
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://keystonerealtyadvisor.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://keystonerealtyadvisor.com/properties' },
                  { '@type': 'ListItem', position: 3, name: 'Properties in Noida', item: 'https://keystonerealtyadvisor.com/properties-in-noida' }
                ]
              }
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-noida#faq',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            }
          ]
        }}
      />

      {/* Hero Header Section */}
      <section
        style={{
          backgroundColor: 'var(--color-dark-950)',
          color: '#FFFFFF',
          paddingTop: '3.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid #1E293B',
        }}
      >
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Properties', href: '/properties' },
              { label: 'Properties in Noida' },
            ]}
          />

          <div style={{ maxWidth: '880px', marginTop: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'rgba(229, 192, 88, 0.12)',
                color: '#E5C058',
                padding: '0.375rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                marginBottom: '1rem',
                border: '1px solid rgba(229, 192, 88, 0.25)',
              }}
            >
              <Sparkles size={14} /> Verified Noida Real Estate 2026
            </span>

            <h1
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              Properties in Noida <span style={{ color: '#E5C058' }}>& Greater Noida</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Explore verified residential apartments, luxury villas, and commercial real estate on Noida-Greater Noida Expressway, Sector 150, Central Noida, and Yamuna Expressway.
            </p>

            {/* Quick BHK & Locality Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: '#94A3B8', fontWeight: 500, marginRight: '0.25rem' }}>
                Quick Filter:
              </span>
              {bhkOptions.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBhkFilter(b.value)}
                  style={{
                    backgroundColor: bhkFilter === b.value ? 'var(--color-primary-600)' : 'rgba(255, 255, 255, 0.08)',
                    color: bhkFilter === b.value ? '#FFFFFF' : '#E2E8F0',
                    border: bhkFilter === b.value ? '1px solid var(--color-primary-600)' : '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '0.35rem 0.875rem',
                    borderRadius: '9999px',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Listings Section */}
      <section style={{ padding: '2.5rem 0 4rem' }}>
        <div className="container">
          {/* Filter Bar Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '1.25rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Listing Intent
              </label>
              <select
                className="form-control"
                value={listingTypeFilter}
                onChange={(e) => setListingTypeFilter(e.target.value)}
                style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
              >
                <option value="">Buy & Rent (All)</option>
                <option value="SALE">For Sale / Buy</option>
                <option value="RENT">For Rent</option>
                <option value="LEASE">Commercial Lease</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Property Type
              </label>
              <select
                className="form-control"
                value={propertyTypeFilter}
                onChange={(e) => setPropertyTypeFilter(e.target.value)}
                style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
              >
                <option value="">All Property Types</option>
                <option value="APARTMENT">Apartment</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="VILLA">Villa / Kothi</option>
                <option value="RETAIL_SHOP">Commercial / Retail</option>
                <option value="PLOT">Plot / Land</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Noida Locality
              </label>
              <select
                className="form-control"
                value={localityFilter}
                onChange={(e) => setLocalityFilter(e.target.value)}
                style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
              >
                {localities.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Max Budget
              </label>
              <select
                className="form-control"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
                style={{ fontSize: '0.875rem', padding: '0.5rem 0.75rem' }}
              >
                <option value="">Any Budget</option>
                <option value="5000000">Up to ₹50 Lakh</option>
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="20000000">Up to ₹2 Crore</option>
                <option value="50000000">Up to ₹5 Crore</option>
                <option value="100000000">Up to ₹10 Crore+</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setListingTypeFilter('');
                  setPropertyTypeFilter('');
                  setBhkFilter('');
                  setLocalityFilter('');
                  setMaxPriceFilter('');
                }}
                style={{ width: '100%', padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Listings Header info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Verified Properties in Noida & Greater Noida
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                UP RERA verified developments and certified title residential listings
              </p>
            </div>
            <Link
              to="/properties?city=Noida"
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.8125rem', gap: '0.375rem' }}
            >
              <Filter size={14} /> Full Search Matrix
            </Link>
          </div>

          {/* Grid of Properties */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
              <p style={{ color: 'var(--text-secondary)' }}>Loading verified Noida properties...</p>
            </div>
          ) : properties && properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
              }}
            >
              <Building2 size={48} color="var(--color-gold-500)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Looking for specific properties in Noida?
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.9375rem' }}>
                Our portfolio features high-appreciation residential communities along Noida Expressway and Sector 150.
              </p>
              <a href="tel:+919911956274" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <Phone size={16} /> Contact Noida Desk: +91 9911956274
              </a>
            </div>
          )}

          {/* Trust Highlights Section */}
          <div
            style={{
              marginTop: '3.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              border: '1px solid var(--border-color)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>UP RERA Approved</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Statutory approvals and legal verification confirmed on each society.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <TrendingUp size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Jewar Airport Growth Corridor</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  High-growth investment zones along Expressway and Yamuna Corridor.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Transparent Pricing</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Direct developer advisory with absolute clarity and authentic payment plans.
                </p>
              </div>
            </div>
          </div>

          {/* SEO FAQ Section */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-subtitle">Real Estate FAQs</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0 0' }}>
                Frequently Asked Questions About Properties in Noida
              </h2>
            </div>

            <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.125rem 1.25rem',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="var(--color-gold-600)" /> : <ChevronDown size={18} color="#94A3B8" />}
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 1.25rem 1.125rem',
                          color: 'var(--text-secondary)',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '0.75rem',
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Consultation Banner */}
          <div
            style={{
              marginTop: '4rem',
              backgroundColor: 'var(--color-dark-950)',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
              Speak with a Senior Noida Real Estate Advisor
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '560px', margin: '0 auto 1.5rem', fontSize: '0.9375rem' }}>
              Looking for luxury apartments on Noida Expressway or investment plots in Greater Noida?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:+919911956274" className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.75rem 1.75rem' }}>
                <Phone size={16} /> Call +91 9911956274
              </a>
              <Link to="/contact" className="btn btn-secondary" style={{ padding: '0.75rem 1.75rem' }}>
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
