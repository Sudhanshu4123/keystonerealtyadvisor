import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useSearchParams } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { parseProgrammaticSlug } from '../../utils/programmaticSeoConfig';
import { ShieldCheck, MapPin, Building2, CheckCircle2, ChevronDown, ChevronUp, Landmark, Sparkles, ArrowRight } from 'lucide-react';

export default function ProgrammaticLandingPage({ presetSlug }) {
  const params = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activePath = presetSlug || params.slug || location.pathname.replace(/^\/+|\/+$/g, '');
  const config = parseProgrammaticSlug(activePath);

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: config.city,
    location: searchParams.get('location') || '',
    propertyType: config.propertyType || searchParams.get('propertyType') || '',
    listingType: config.listingType || searchParams.get('listingType') || '',
    bedrooms: config.bedrooms || searchParams.get('bedrooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    furnished: searchParams.get('furnished') || '',
    status: searchParams.get('status') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortDirection: searchParams.get('sortDirection') || 'DESC',
    page: Number(searchParams.get('page')) || 0,
    size: 12,
  }));

  const [properties, setProperties] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const queryPayload = {
          ...filters,
          city: config.city,
          ...(config.propertyType ? { propertyType: config.propertyType } : {}),
          ...(config.listingType ? { listingType: config.listingType } : {}),
          ...(config.bedrooms ? { bedrooms: Number(config.bedrooms) } : {}),
        };

        const res = await propertyService.searchProperties(queryPayload);
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // City matching filter
          const filtered = res.data.content.filter((p) => {
            const pCity = (p.city || '').toLowerCase();
            const pLoc = (p.location || '').toLowerCase();
            const targetCityLower = config.city.toLowerCase();
            const isMatch = pCity.includes(targetCityLower) || pLoc.includes(targetCityLower) || (targetCityLower === 'gurugram' && (pCity.includes('gurgaon') || pLoc.includes('gurgaon')));
            return isMatch;
          });

          setProperties(filtered);
          setPageInfo({
            totalPages: res.data.totalPages || 0,
            totalElements: filtered.length,
            hasNext: res.data.hasNext || false,
            hasPrevious: res.data.hasPrevious || false,
          });
        } else {
          setProperties([]);
          setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
        }
      } catch (err) {
        console.error('Failed to load programmatic properties:', err);
        setProperties([]);
        setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [filters, config.city, config.propertyType, config.listingType, config.bedrooms]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, city: config.city }));
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      city: config.city,
      location: '',
      propertyType: config.propertyType || '',
      listingType: config.listingType || '',
      bedrooms: config.bedrooms || '',
      minPrice: '',
      maxPrice: '',
      furnished: '',
      status: '',
      sortBy: 'createdAt',
      sortDirection: 'DESC',
      page: 0,
      size: 12,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic FAQs for this programmatic combination
  const dynamicFaqs = [
    {
      q: `What is the average price for ${config.headingTitle.toLowerCase()}?`,
      a: `Pricing for ${config.headingTitle.toLowerCase()} varies by prime micro-markets, society brand, and built-up area. On average, ready-to-move luxury properties in prime sectors command transparent market valuations with institutional title due diligence by Keystone Realty Advisor.`
    },
    {
      q: `Are all listings on this page RERA approved and title-verified?`,
      a: `Yes. Every property represented by Keystone Realty Advisor undergoes complete 100% legal title verification, encumbrance search, and builder track-record audit before public listing.`
    },
    {
      q: `How do I schedule a physical site visit or private consultation?`,
      a: `You can directly click "Request Consultation" on any property, call our senior advisor desk at +91 9911956274, or connect instantly on WhatsApp for confidential guidance.`
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '2.5rem 0 5rem' }}>
      <SEO
        title={config.pageTitle}
        description={config.pageDescription}
        keywords={`${config.headingTitle}, ${config.city} real estate, buy flat in ${config.city}, luxury apartments ${config.city}, Keystone Realty Advisor`}
        canonicalUrl={`/${config.canonicalSlug}`}
        geoPlacename={config.city}
        geoRegion={config.cityRegion}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: `Properties in ${config.city}`, path: `/properties-in-${config.city.toLowerCase()}` },
          { name: config.headingTitle, path: `/${config.canonicalSlug}` },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `https://keystonerealtyadvisor.com/${config.canonicalSlug}#collection`,
              name: config.headingTitle,
              description: config.pageDescription,
              url: `https://keystonerealtyadvisor.com/${config.canonicalSlug}`,
              isPartOf: {
                '@type': 'WebSite',
                '@id': 'https://keystonerealtyadvisor.com/#website',
                name: 'Keystone Realty Advisor',
                url: 'https://keystonerealtyadvisor.com'
              }
            },
            {
              '@type': 'FAQPage',
              '@id': `https://keystonerealtyadvisor.com/${config.canonicalSlug}#faq`,
              mainEntity: dynamicFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a
                }
              }))
            }
          ]
        }}
      />

      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Properties', path: '/properties' },
            { label: `Properties in ${config.city}`, path: `/properties-in-${config.city.toLowerCase()}` },
            { label: config.headingTitle },
          ]}
        />

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-600)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
            <Building2 size={16} />
            <span>Verified {config.city} Portfolio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>{config.headingTitle}</h1>
            <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{pageInfo.totalElements}</strong> {pageInfo.totalElements === 1 ? 'verified listing' : 'verified listings'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {config.cityData.overview} Browse verified listings below with transparent price breakdowns and complete due diligence.
          </p>
        </div>

        {/* Locality Fast Filter Chips */}
        {config.cityData.localities && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Prime Localities:</span>
            {config.cityData.localities.map((loc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFilters({ ...filters, query: loc, page: 0 })}
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: filters.query === loc ? 'var(--color-gold-50)' : '#FFFFFF',
                  color: filters.query === loc ? 'var(--color-gold-700)' : 'var(--text-primary)',
                  fontWeight: filters.query === loc ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {loc}
              </button>
            ))}
          </div>
        )}

        {/* Filter Control Box */}
        <PropertyFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Results Grid */}
        <PropertyGrid
          properties={properties}
          loading={loading}
          emptyTitle={`No ${config.headingTitle.toLowerCase()} match your active filters.`}
          emptyDescription={`Try resetting or broadening your search parameters to view all active listings in ${config.city}.`}
          columns={3}
        />

        {/* Pagination */}
        {pageInfo.totalPages > 1 && (
          <Pagination
            currentPage={filters.page}
            totalPages={pageInfo.totalPages}
            hasNext={pageInfo.hasNext}
            hasPrevious={pageInfo.hasPrevious}
            onPageChange={handlePageChange}
          />
        )}

        {/* Local Area Market Intelligence Section */}
        <section className="card" style={{ marginTop: '3.5rem', padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-600)', marginBottom: '0.75rem' }}>
            <Landmark size={20} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Market Insights & Advisory for {config.city}
            </h2>
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Acquiring or leasing <strong>{config.headingTitle.toLowerCase()}</strong> requires institutional due diligence. Keystone Realty Advisor provides comprehensive property evaluation, including comparative market analysis (CMA), circle rate benchmarks, RERA registration reviews, and clear title search verifications across all prime sectors in {config.city}.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.875rem', display: 'block', color: 'var(--text-primary)' }}>100% Title Checked</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pre-screened approvals & encumbrance checks</span>
              </div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <ShieldCheck size={18} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.875rem', display: 'block', color: 'var(--text-primary)' }}>Direct Desk Representation</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Confidential negotiation with senior advisors</span>
              </div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <Sparkles size={18} color="var(--color-gold-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.875rem', display: 'block', color: 'var(--text-primary)' }}>Transparent Valuation</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Data-driven pricing with zero hidden markups</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ Section */}
        <section className="card" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Frequently Asked Questions ({config.city} Real Estate)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dynamicFaqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === index ? <ChevronUp size={18} color="var(--color-gold-600)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>
                {openFaqIndex === index && (
                  <div style={{ padding: '0 1.25rem 1rem 1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Programmatic Cross-Link Exploration Matrix */}
        <div className="card" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Corridor Research & Real Estate Guides
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Understand micro-market price trajectories, infrastructure catalysts, and RERA compliance before investing.
              </p>
            </div>
            <Link to="/insights" className="btn btn-outline-gold" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.9rem' }}>
              All Research Guides
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <Link to="/insights/dwarka-expressway-investment-guide" className="btn btn-secondary btn-sm">
              Dwarka Expressway Guide
            </Link>
            <Link to="/insights/golf-course-extension-road-luxury-hub" className="btn btn-secondary btn-sm">
              Golf Course Ext Road Hub
            </Link>
            <Link to="/insights/south-delhi-vs-gurgaon-luxury-living" className="btn btn-secondary btn-sm">
              South Delhi vs Gurgaon Condos
            </Link>
            <Link to="/insights/noida-expressway-vs-yamuna-expressway-investment" className="btn btn-secondary btn-sm">
              Noida vs Yamuna Expressway
            </Link>
            <Link to="/insights/hrera-gurugram-property-verification-guide" className="btn btn-secondary btn-sm">
              HRERA Verification Guide
            </Link>
            <Link to="/insights/nri-real-estate-investment-india-fema-tax" className="btn btn-secondary btn-sm">
              NRI Real Estate Guide
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            <Link to="/flats-for-rent-in-gurugram" className="btn btn-secondary btn-sm">
              Flats for Rent in Gurugram
            </Link>
            <Link to="/properties-in-gurugram" className="btn btn-secondary btn-sm">
              Properties in Gurugram
            </Link>
            <Link to="/properties-in-delhi" className="btn btn-secondary btn-sm">
              Properties in Delhi
            </Link>
            <Link to="/properties-in-noida" className="btn btn-secondary btn-sm">
              Properties in Noida
            </Link>
            <Link to="/3-bhk-flats-in-gurgaon" className="btn btn-secondary btn-sm">
              3 BHK Flats in Gurgaon
            </Link>
            <Link to="/2-bhk-flats-in-gurgaon" className="btn btn-secondary btn-sm">
              2 BHK Flats in Gurgaon
            </Link>
            <Link to="/luxury-villas-in-gurgaon" className="btn btn-secondary btn-sm">
              Villas in Gurgaon
            </Link>
            <Link to="/builder-floors-in-delhi" className="btn btn-secondary btn-sm">
              Builder Floors in Delhi
            </Link>
            <Link to="/projects/conscient-parq-sector-80-gurgaon" className="btn btn-secondary btn-sm">
              Conscient Parq Sector 80
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-sm">
              New Launch Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
