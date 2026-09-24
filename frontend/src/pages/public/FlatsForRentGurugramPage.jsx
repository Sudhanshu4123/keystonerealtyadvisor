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
  MessageSquare
} from 'lucide-react';

export default function FlatsForRentGurugramPage() {
  const [bhkFilter, setBhkFilter] = useState('');
  const [localityFilter, setLocalityFilter] = useState('');
  const [furnishedFilter, setFurnishedFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  const localities = [
    { name: 'All Localities', value: '' },
    { name: 'Golf Course Road', value: 'Golf Course Road' },
    { name: 'Cyber City / DLF', value: 'DLF' },
    { name: 'Golf Course Ext.', value: 'Golf Course Extension' },
    { name: 'Sohna Road', value: 'Sohna Road' },
    { name: 'Dwarka Expressway', value: 'Dwarka Expressway' },
    { name: 'Sector 57 / 56', value: 'Sector 57' },
    { name: 'MG Road', value: 'MG Road' },
  ];

  const bhkOptions = [
    { label: 'All BHKs', value: '' },
    { label: '1 BHK Flats', value: '1' },
    { label: '2 BHK Flats', value: '2' },
    { label: '3 BHK Flats', value: '3' },
    { label: '4+ BHK Luxury', value: '4' },
  ];

  useEffect(() => {
    async function fetchGurugramRentals() {
      setLoading(true);
      try {
        const queryParams = {
          city: 'Gurugram',
          listingType: 'RENT',
          propertyType: 'APARTMENT',
          size: 12,
        };

        if (bhkFilter) {
          queryParams.bedrooms = Number(bhkFilter);
        }
        if (localityFilter) {
          queryParams.location = localityFilter;
        }
        if (furnishedFilter) {
          queryParams.furnished = furnishedFilter;
        }
        if (maxPriceFilter) {
          queryParams.maxPrice = Number(maxPriceFilter);
        }

        const res = await propertyService.searchProperties(queryParams);
        if (res.success && res.data && res.data.content) {
          setProperties(res.data.content);
        } else {
          // If no specific rentals match yet in DB, fetch featured properties as fallback
          const fallbackRes = await propertyService.getFeaturedProperties();
          if (fallbackRes.success && fallbackRes.data) {
            setProperties(fallbackRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load flats for rent in Gurugram:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGurugramRentals();
  }, [bhkFilter, localityFilter, furnishedFilter, maxPriceFilter]);

  const faqs = [
    {
      q: 'What is the average monthly rent for flats in Gurugram (Gurgaon)?',
      a: 'Average rental rates in Gurugram range from ₹15,000 to ₹25,000 for 1 BHK flats, ₹25,000 to ₹45,000 for 2 BHK flats, and ₹45,000 to ₹1,20,000+ for luxury 3 BHK & 4 BHK apartments in prime localities such as Golf Course Road, Cyber City, and Sohna Road.',
    },
    {
      q: 'Which are the best localities to rent a flat in Gurugram for working professionals?',
      a: 'Top preferred localities include DLF Phase 1, 2, 3, 4 & 5 (near Cyber City), Golf Course Road (Sector 42, 43, 53, 54), Golf Course Extension Road (Sector 56, 57, 65, 66), and Sohna Road due to metro connectivity and corporate hub proximity.',
    },
    {
      q: 'What is the standard security deposit norm for rental flats in Gurugram?',
      a: 'In Gurugram, landlords typically ask for 1 to 2 months of monthly rent as a refundable security deposit along with 1 month advance rent, subject to standard rental agreement execution.',
    },
    {
      q: 'How does Keystone Realty Advisor assist tenants in renting verified flats?',
      a: 'Keystone Realty Advisor provides 100% verified listings, physical property visits, title & ownership validation, negotiation support, and smooth rental agreement drafting with complete transparency.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))' }}>
      <SEO
        title="Flats for Rent in Gurgaon | Apartments for Rent in Gurugram | Keystone Realty"
        description="Explore verified 1, 2, 3 & 4 BHK flats for rent in Gurugram (Gurgaon). Verified owner apartments, gated societies, Golf Course Road, DLF & Cyber City from ₹15,000/mo."
        keywords="flats for rent in gurgaon, flat for rent in gurugram, apartments for rent in gurgaon, 2 bhk flat for rent in gurgaon, 3 bhk for rent gurgaon, flat in gurgaon rent, no brokerage flats gurgaon, house for rent in gurugram"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Flats for Rent in Gurugram', path: '/flats-for-rent-in-gurugram' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': 'https://keystonerealtyadvisor.com/flats-for-rent-in-gurugram#webpage',
              url: 'https://keystonerealtyadvisor.com/flats-for-rent-in-gurugram',
              name: 'Flats for Rent in Gurugram | Verified Rental Apartments & Societies',
              description: 'Explore verified 1, 2, 3 & 4 BHK flats and luxury apartments for rent in Gurugram (Gurgaon).',
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://keystonerealtyadvisor.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://keystonerealtyadvisor.com/properties' },
                  { '@type': 'ListItem', position: 3, name: 'Flats for Rent in Gurugram', item: 'https://keystonerealtyadvisor.com/flats-for-rent-in-gurugram' }
                ]
              }
            },
            {
              '@type': 'FAQPage',
              '@id': 'https://keystonerealtyadvisor.com/flats-for-rent-in-gurugram#faq',
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
              { label: 'Flats for Rent in Gurugram' },
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
              <Sparkles size={14} /> Verified Rental Properties 2026
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
              Flats for Rent in Gurugram <span style={{ color: '#E5C058' }}>(Gurgaon)</span>
            </h1>

            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Discover verified 1 BHK, 2 BHK, 3 BHK & 4 BHK apartments, luxury high-rises, and gated builder floors for rent in Gurugram. Direct owner listings, authentic photographs, and dedicated advisory assistance.
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
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-sm)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) auto',
              gap: '1rem',
              alignItems: 'flex-end',
            }}
          >
            <div>
              <label className="form-label" style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                Locality / Area
              </label>
              <select
                className="form-control"
                value={localityFilter}
                onChange={(e) => setLocalityFilter(e.target.value)}
              >
                {localities.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                BHK Type
              </label>
              <select
                className="form-control"
                value={bhkFilter}
                onChange={(e) => setBhkFilter(e.target.value)}
              >
                {bhkOptions.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                Furnishing
              </label>
              <select
                className="form-control"
                value={furnishedFilter}
                onChange={(e) => setFurnishedFilter(e.target.value)}
              >
                <option value="">Any Furnishing</option>
                <option value="FULLY_FURNISHED">Fully Furnished</option>
                <option value="SEMI_FURNISHED">Semi Furnished</option>
                <option value="UNFURNISHED">Unfurnished</option>
              </select>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                Max Budget (₹/mo)
              </label>
              <select
                className="form-control"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(e.target.value)}
              >
                <option value="">Any Budget</option>
                <option value="25000">Up to ₹25,000</option>
                <option value="40000">Up to ₹40,000</option>
                <option value="60000">Up to ₹60,000</option>
                <option value="100000">Up to ₹1,00,000</option>
                <option value="200000">Up to ₹2,00,000</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => {
                setBhkFilter('');
                setLocalityFilter('');
                setFurnishedFilter('');
                setMaxPriceFilter('');
              }}
              className="btn btn-outline"
              style={{ padding: '0.625rem 1rem', fontSize: '0.875rem' }}
            >
              Reset Filters
            </button>
          </div>

          {/* Listings Grid */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>
                Verified Rental Flats in Gurugram
              </h2>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Showing <strong>{properties.length}</strong> available listings
              </span>
            </div>

            <PropertyGrid
              properties={properties}
              loading={loading}
              columns={3}
              emptyTitle="No exact matching flats right now."
              emptyDescription="Contact our advisors to explore off-market verified rental options across Golf Course Road, Cyber City, and Sohna Road."
            />
          </div>

          {/* Need Custom Flat Consultation Banner */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 2rem',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginBottom: '3.5rem',
            }}
          >
            <div style={{ maxWidth: '600px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-600)', letterSpacing: '0.08em' }}>
                Can't Find Your Ideal Flat?
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.375rem', marginBottom: '0.5rem' }}>
                Get Curated Rental Options Directly on WhatsApp
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', margin: 0, lineHeight: 1.6 }}>
                Tell us your preferred locality, BHK configuration, and move-in date. Our dedicated advisory team will share verified owner listings matching your budget.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919911956274?text=Hello%20Keystone%20Realty%2C%20I%20am%20looking%20for%20a%20Flat%20for%20Rent%20in%20Gurugram.%20Please%20share%20available%20options."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ gap: '0.5rem', padding: '0.75rem 1.5rem' }}
              >
                <MessageSquare size={16} /> Chat on WhatsApp
              </a>
              <Link to="/contact" className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>
                Contact Advisor
              </Link>
            </div>
          </div>

          {/* Rent Price Trend Table in Gurugram */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.25rem',
              border: '1px solid var(--border-color)',
              marginBottom: '3.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Average Rental Rates in Gurugram (2026 Overview)
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Rental values across Gurugram vary significantly by locality, society amenities, and proximity to major metro stations & IT corridors. Below is an overview of typical rental brackets:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Configuration</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Average Monthly Rent</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Popular Localities</th>
                    <th style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>Ideal For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>1 BHK / Studio Flat</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-primary-600)', fontWeight: 600 }}>₹15,000 - ₹28,000</td>
                    <td style={{ padding: '0.875rem 1rem' }}>DLF Phase 3, Sector 56, Sector 48, Sohna Road</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Single professionals & students</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>2 BHK Apartment</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-primary-600)', fontWeight: 600 }}>₹26,000 - ₹48,000</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Sector 57, Sector 67, Dwarka Expressway, Sohna Road</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Couples & small families</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>3 BHK Apartment</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-primary-600)', fontWeight: 600 }}>₹45,000 - ₹95,000</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Golf Course Ext. Road, Sector 65, DLF Phase 5, Nirvana Country</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Established families & corporate executives</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.875rem 1rem', fontWeight: 600 }}>4 BHK & Luxury Penthouse</td>
                    <td style={{ padding: '0.875rem 1rem', color: 'var(--color-primary-600)', fontWeight: 600 }}>₹1,00,000 - ₹3,50,000+</td>
                    <td style={{ padding: '0.875rem 1rem' }}>Golf Course Road (DLF Aralias/Magnolias/Crest), Central Park</td>
                    <td style={{ padding: '0.875rem 1rem' }}>CXOs, expatriates & luxury seekers</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Locality Guides */}
          <div style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Top Localities for Renting Flats in Gurugram
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                {
                  title: 'Golf Course Road',
                  desc: 'Gurugram\'s most prestigious corridor featuring luxury high-rises, Rapid Metro access, premium clubs, and Fortune 500 offices.',
                  types: '3 BHK, 4 BHK, Penthouses',
                  rent: '₹80k - ₹3L+/mo',
                },
                {
                  title: 'DLF Phase 1 - 5 & Cyber City',
                  desc: 'Direct proximity to Cyber Hub, DLF Horizon Center, and NH-48. High demand among tech and corporate professionals.',
                  types: '1 BHK, 2 BHK, 3 BHK, Floors',
                  rent: '₹30k - ₹1.2L/mo',
                },
                {
                  title: 'Golf Course Extension Road',
                  desc: 'Rapidly growing residential hub with modern gated societies by M3M, Emaar, and Pioneer. Excellent social infrastructure.',
                  types: '2 BHK, 3 BHK, 4 BHK',
                  rent: '₹35k - ₹90k/mo',
                },
                {
                  title: 'Sohna Road & SPR',
                  desc: 'Affordable luxury apartments with direct connection to Subhash Chowk, Rajiv Chowk, and commercial tech parks.',
                  types: '1 BHK, 2 BHK, 3 BHK',
                  rent: '₹22k - ₹55k/mo',
                },
              ].map((loc) => (
                <div
                  key={loc.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <MapPin size={18} color="var(--color-primary-600)" />
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: 0 }}>{loc.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {loc.desc}
                  </p>
                  <div style={{ fontSize: '0.8125rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Typical Types: <strong>{loc.types}</strong></span>
                    <span style={{ color: 'var(--color-primary-600)', fontWeight: 600 }}>{loc.rent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <HelpCircle size={20} color="var(--color-primary-600)" />
              <h2 style={{ fontSize: '1.375rem', fontWeight: 700, margin: 0 }}>
                Frequently Asked Questions — Flats for Rent in Gurugram
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
              Everything you need to know about finding and renting a home in Gurugram.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: openFaq === index ? 'var(--bg-secondary)' : '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: 'var(--text-primary)',
                      gap: '1rem',
                    }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === index && (
                    <div style={{ padding: '1rem 1.25rem', backgroundColor: '#FFFFFF', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid var(--border-color)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
