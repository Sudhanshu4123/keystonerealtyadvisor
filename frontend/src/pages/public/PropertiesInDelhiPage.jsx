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

export default function PropertiesInDelhiPage() {
  const [listingTypeFilter, setListingTypeFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [bhkFilter, setBhkFilter] = useState('');
  const [localityFilter, setLocalityFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const localities = [
    { name: 'All Localities in Delhi', value: '' },
    { name: 'South Delhi (GK / Saket / Defence Colony)', value: 'South Delhi' },
    { name: 'Dwarka', value: 'Dwarka' },
    { name: 'Vasant Vihar / Chanakyapuri', value: 'Vasant Vihar' },
    { name: 'Rohini / North Delhi', value: 'Rohini' },
    { name: 'Central Delhi / Connaught Place', value: 'Central Delhi' },
    { name: 'Chattarpur / Mehrauli', value: 'Chattarpur' },
    { name: 'West Delhi (Janakpuri / Punjabi Bagh)', value: 'West Delhi' },
  ];

  const bhkOptions = [
    { label: 'All BHKs', value: '' },
    { label: '1 BHK', value: '1' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4+ BHK Luxury', value: '4' },
  ];

  useEffect(() => {
    async function fetchDelhiProperties() {
      setLoading(true);
      try {
        const queryParams = {
          city: 'Delhi',
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
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // Strict city filter: only keep properties belonging to Delhi
          const delhiProps = res.data.content.filter((p) => {
            const city = (p.city || '').toLowerCase();
            const loc = (p.location || '').toLowerCase();
            return city.includes('delhi') || loc.includes('delhi');
          });
          setProperties(delhiProps);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error('Failed to load properties in Delhi:', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDelhiProperties();
  }, [listingTypeFilter, propertyTypeFilter, bhkFilter, localityFilter, maxPriceFilter]);

  const faqs = [
    {
      q: 'What are the best residential areas to buy or rent property in Delhi?',
      a: 'Top preferred residential zones in Delhi include South Delhi (Greater Kailash, Defence Colony, Vasant Vihar, Hauz Khas), Dwarka (planned sectors with metro connectivity), Rohini, and Chanakyapuri for luxury and diplomats.',
    },
    {
      q: 'What is the average price of flats and builder floors in Delhi?',
      a: 'Property rates in Delhi range from ₹60 Lakh to ₹1.5 Crore in Dwarka/Rohini, and ₹2.5 Crore to ₹15+ Crore for luxury builder floors and apartments in South Delhi and Central Delhi.',
    },
    {
      q: 'Are all properties in Delhi verified by Keystone Realty Advisor?',
      a: 'Yes, every listing in Delhi on Keystone Realty Advisor undergoes strict legal title verification, land registry checks, municipal approvals (MCD/DDA), and on-site physical auditing.',
    },
    {
      q: 'How can I schedule a site visit or consultation for Delhi properties?',
      a: 'You can directly call our dedicated Delhi NCR advisory desk at +91 9911956274 or submit an inquiry on any listing to schedule a private property walkthrough.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      <SEO
        title="Properties in Delhi | Luxury Flats, Builder Floors & Commercial Real Estate"
        description="Search from verified properties in Delhi. Explore luxury apartments, builder floors, independent houses, and commercial spaces in South Delhi, Dwarka, and Central Delhi."
        keywords="properties in delhi, flats in delhi, buy property in delhi, builder floors in south delhi, luxury apartments delhi, real estate in delhi, property for sale in delhi, flats for rent in delhi, Keystone Realty Advisor"
        geoPlacename="Delhi"
        geoRegion="IN-DL"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Properties in Delhi', path: '/properties-in-delhi' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-delhi#webpage',
              url: 'https://keystonerealtyadvisor.com/properties-in-delhi',
              name: 'Properties in Delhi | Verified Real Estate Listings & Advisory',
              description: 'Explore verified residential and commercial properties for sale and rent in Delhi.',
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://keystonerealtyadvisor.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://keystonerealtyadvisor.com/properties' },
                  { '@type': 'ListItem', position: 3, name: 'Properties in Delhi', item: 'https://keystonerealtyadvisor.com/properties-in-delhi' }
                ]
              }
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://keystonerealtyadvisor.com/properties-in-delhi#faq',
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
              { label: 'Properties in Delhi' },
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
              <Sparkles size={14} /> Verified Real Estate Listings 2026
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
              Properties in Delhi <span style={{ color: '#E5C058' }}>(Verified Listings)</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Explore verified luxury apartments, builder floors, villas, and commercial real estate across South Delhi, Dwarka, Vasant Vihar, and Central Delhi with complete title verification and transparent pricing.
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
                <option value="INDEPENDENT_FLOOR">Builder Floor</option>
                <option value="VILLA">Villa / Kothi</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="RETAIL_SHOP">Commercial / Retail</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                Delhi Locality
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
                <option value="25000000">Up to ₹2.5 Crore</option>
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
                Verified Properties in Delhi
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Showing verified title listings with authentic photographic inspection
              </p>
            </div>
            <Link
              to="/properties?city=Delhi"
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
              <p style={{ color: 'var(--text-secondary)' }}>Loading verified Delhi properties...</p>
            </div>
          ) : properties && properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '3.5rem 2rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Building2 size={48} color="var(--color-gold-500)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                No Active Listings in Delhi Right Now
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                We are currently reviewing and verifying new properties in Delhi. Any new Delhi property listed in the system will automatically appear on this page.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/properties" className="btn btn-secondary" style={{ padding: '0.625rem 1.25rem' }}>
                  Browse All Properties
                </Link>
                <a href="tel:+919911956274" className="btn btn-primary" style={{ gap: '0.5rem', padding: '0.625rem 1.25rem' }}>
                  <Phone size={16} /> Contact Delhi Desk: +91 9911956274
                </a>
              </div>
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
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>100% Legal Title Checked</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Every Delhi property is cross-checked against municipal records and encumbrance certificates.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <Landmark size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Prime Delhi Localities</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Curated listings in South Delhi, Dwarka, Vasant Vihar, and prime commercial districts.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--color-gold-600)', flexShrink: 0 }}>
                <CheckCircle2 size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, margin: '0 0 0.25rem' }}>End-to-End Governance</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: 0 }}>
                  From site inspections to registry execution, our senior advisors manage the full transaction.
                </p>
              </div>
            </div>
          </div>

          {/* SEO FAQ Section */}
          <div style={{ marginTop: '3.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="section-subtitle">Real Estate FAQs</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0.25rem 0 0' }}>
                Frequently Asked Questions About Properties in Delhi
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
                      {isOpen ? <ChevronUp size={18} color="var(--color-gold-600)" /> : <ChevronDown size={18} color="#94A3B8 motion" />}
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
              Speak with a Senior Delhi Real Estate Advisor
            </h3>
            <p style={{ color: '#94A3B8', maxWidth: '560px', margin: '0 auto 1.5rem', fontSize: '0.9375rem' }}>
              Looking for off-market properties, high-yield commercial shops, or builder floors in Delhi? Get in touch today.
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
