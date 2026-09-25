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

export default function PropertiesInGurugramPage() {
  const [listingTypeFilter, setListingTypeFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [bhkFilter, setBhkFilter] = useState('');
  const [localityFilter, setLocalityFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const localities = [
    { name: 'All Localities in Gurugram', value: '' },
    { name: 'Golf Course Road (DLF Phase 5 / Sec 42-54)', value: 'Golf Course Road' },
    { name: 'Cyber City / DLF Phase 1, 2, 3', value: 'DLF' },
    { name: 'Golf Course Extension Road (Sec 56-66)', value: 'Golf Course Extension' },
    { name: 'Dwarka Expressway (Sec 102-113)', value: 'Dwarka Expressway' },
    { name: 'Sohna Road / Southern Peripheral Road', value: 'Sohna Road' },
    { name: 'New Gurgaon (Sector 82-95)', value: 'New Gurgaon' },
    { name: 'MG Road / Sushant Lok', value: 'MG Road' },
  ];

  const bhkOptions = [
    { label: 'All BHKs', value: '' },
    { label: '1 BHK', value: '1' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4+ BHK Luxury', value: '4' },
  ];

  useEffect(() => {
    async function fetchGurugramProperties() {
      setLoading(true);
      try {
        const queryParams = {
          city: 'Gurugram',
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
          // Fallback to recent/featured listings if exact match in seed db is expanding
          const fallbackRes = await propertyService.getFeaturedProperties();
          if (fallbackRes.success && fallbackRes.data) {
            setProperties(fallbackRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load properties in Gurugram:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGurugramProperties();
  }, [listingTypeFilter, propertyTypeFilter, bhkFilter, localityFilter, maxPriceFilter]);

  const faqs = [
    {
      q: 'Which are the top investment zones for properties in Gurugram (Gurgaon)?',
      a: 'Prime investment corridors in Gurugram include Golf Course Extension Road, Dwarka Expressway (high appreciation corridor), Golf Course Road (ultra-luxury), SPR, and New Gurgaon sectors with direct expressway connectivity.',
    },
    {
      q: 'What is the starting price for luxury apartments in Gurugram?',
      a: 'Residential properties on Dwarka Expressway and New Gurgaon start from ₹1.1 Crore to ₹2.5 Crore for 2/3 BHK flats, while ultra-luxury residences on Golf Course Road range between ₹5 Crore and ₹35+ Crore.',
    },
    {
      q: 'Are properties in Gurugram RERA approved and title verified?',
      a: 'Yes, Keystone Realty Advisor performs a stringent 5-step due diligence process verifying Haryana RERA registration number, builder escrow compliance, non-encumbrance certificates, and physical handover status.',
    },
    {
      q: 'How does Keystone Realty Advisor assist property buyers in Gurugram?',
      a: 'We offer zero-bias advisory, private site visits, developer direct pricing negotiation, legal documentation verification, and institutional portfolio management.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      <SEO
        title="Properties in Gurugram | Luxury Flats, Villas & Commercial in Gurgaon"
        description="Search from verified properties in Gurugram (Gurgaon). Explore luxury 2, 3, 4 BHK apartments, penthouses, villas, and commercial real estate on Golf Course Road, Dwarka Expressway & DLF."
        keywords="properties in gurugram, properties in gurgaon, flats in gurugram, luxury apartments in gurugram, buy property in gurgaon, property for sale in gurgaon, real estate in gurgaon, villas in gurgaon, Keystone Realty Advisor"
        geoPlacename="Gurugram"
        geoRegion="IN-HR"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Properties in Gurugram', path: '/properties-in-gurugram' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-gurugram#webpage',
              url: 'https://keystonerealtyadvisor.com/properties-in-gurugram',
              name: 'Properties in Gurugram | Verified Real Estate Listings & Advisory',
              description: 'Explore verified residential and commercial properties for sale and rent in Gurugram (Gurgaon).',
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://keystonerealtyadvisor.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://keystonerealtyadvisor.com/properties' },
                  { '@type': 'ListItem', position: 3, name: 'Properties in Gurugram', item: 'https://keystonerealtyadvisor.com/properties-in-gurugram' }
                ]
              }
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-gurugram#faq',
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
              { label: 'Properties in Gurugram' },
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
              <Sparkles size={14} /> Verified Gurgaon Real Estate 2026
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
              Properties in Gurugram <span style={{ color: '#E5C058' }}>(Gurgaon)</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Explore verified luxury apartments, high-rise condominiums, gated villas, and Grade-A commercial spaces on Golf Course Road, Dwarka Expressway, DLF Cyber City, and Sohna Road.
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
                <option value="INDEPENDENT_FLOOR">Builder Floor</option>
                <option value="RETAIL_SHOP">Commercial / SCO</option>
                <option value="PLOT">Plot / Land</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Gurgaon Corridor
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
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="25000000">Up to ₹2.5 Crore</option>
                <option value="50000000">Up to ₹5 Crore</option>
                <option value="100000000">Up to ₹10 Crore</option>
                <option value="250000000">Up to ₹25 Crore+</option>
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
                Verified Properties in Gurugram (Gurgaon)
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                RERA registered projects and certified title listings
              </p>
            </div>
            <Link
              to="/properties?city=Gurugram"
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
              <p style={{ color: 'var(--text-secondary)' }}>Loading verified Gurugram properties...</p>
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
                Looking for exclusive properties in Gurugram?
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 1.5rem', fontSize: '0.9375rem' }}>
                Our portfolio features high-end luxury high-rises on Golf Course Road and new launches on Dwarka Expressway.
              </p>
              <a href="tel:+919911956274" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <Phone size={16} /> Contact Gurugram Desk: +91 9911956274
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
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>HRERA Compliant Projects</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Haryana RERA registration and clear statutory clearances guaranteed.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <TrendingUp size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>High Capital Appreciation</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Strategic micro-market selection on Dwarka Expressway and SPR for maximum ROI.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Direct Builder Deals</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Preferred advisory access with institutional pricing and zero hidden markups.
                </p>
              </div>
            </div>
          </div>

          {/* SEO FAQ Section */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-subtitle">Real Estate FAQs</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0 0' }}>
                Frequently Asked Questions About Properties in Gurugram
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
              Speak with a Senior Gurugram Real Estate Advisor
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '560px', margin: '0 auto 1.5rem', fontSize: '0.9375rem' }}>
              Looking for luxury penthouses, Golf Course Road apartments, or commercial office spaces in Gurugram?
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
