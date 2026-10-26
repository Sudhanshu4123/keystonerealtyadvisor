import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import LocationGuide, { getGuidance } from '../../components/common/LocationGuide';
import NotFoundPage from './NotFoundPage';
import { parseProgrammaticSlug, PROGRAMMATIC_PAGES } from '../../utils/programmaticSeoConfig';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Only slugs listed in PROGRAMMATIC_PAGES render a landing page. Anything else gets the 404 page
 * (previously any slug rendered a Gurugram-defaulted page with a canonical pointing at a URL that did not exist).
 */
export default function ProgrammaticLandingPage({ presetSlug }) {
  const config = parseProgrammaticSlug(presetSlug || '');
  if (!config) return <NotFoundPage />;
  return <ProgrammaticLandingContent config={config} />;
}

function ProgrammaticLandingContent({ config }) {
  const [searchParams, setSearchParams] = useSearchParams();

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
  // True only after the API answered successfully with zero listings; used to keep empty pages out of the index.
  const [confirmedEmpty, setConfirmedEmpty] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const queryPayload = {
          ...filters,
          city: config.city,
          ...(config.location ? { location: config.location } : {}),
          ...(config.propertyType ? { propertyType: config.propertyType } : {}),
          ...(config.listingType ? { listingType: config.listingType } : {}),
          ...(config.bedrooms ? { bedrooms: Number(config.bedrooms) } : {}),
        };

        const res = await propertyService.searchProperties(queryPayload);
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // City & Location matching filter
          const filtered = res.data.content.filter((p) => {
            const pCity = (p.city || '').toLowerCase();
            const pLoc = (p.location || '').toLowerCase();
            const pTitle = (p.title || '').toLowerCase();
            if (config.location) {
              const targetLocLower = config.location.toLowerCase();
              return pLoc.includes(targetLocLower) || pTitle.includes(targetLocLower);
            }
            const targetCityLower = config.city.toLowerCase();
            const isMatch = pCity.includes(targetCityLower) || pLoc.includes(targetCityLower) || (targetCityLower === 'gurugram' && (pCity.includes('gurgaon') || pLoc.includes('gurgaon')));
            return isMatch;
          });

          setProperties(filtered);
          setConfirmedEmpty(filtered.length === 0 && res.data.totalElements === 0);
          setPageInfo({
            totalPages: res.data.totalPages || 0,
            totalElements: filtered.length,
            hasNext: res.data.hasNext || false,
            hasPrevious: res.data.hasPrevious || false,
          });
        } else {
          setProperties([]);
          setConfirmedEmpty(false);
          setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
        }
      } catch (err) {
        console.error('Failed to load programmatic properties:', err);
        setConfirmedEmpty(false);
        setProperties([]);
        setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [filters, config.city, config.location, config.propertyType, config.listingType, config.bedrooms]);

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

  // FAQs are general guidance (no claims about Keystone's own verification or inventory). They are shown on the
  // page only; no FAQPage structured data is emitted for these templated answers.
  const guidance = getGuidance(config.cityKey, config.listingType, config.propertyType);
  const dynamicFaqs = [
    {
      q: `What should I check before choosing ${config.headingTitle.toLowerCase()}?`,
      a: guidance.items.slice(0, 3).join(' '),
    },
    {
      q: 'How is the price on a listing decided?',
      a: 'Each listing shows the price set by the owner or developer. Compare it with similar listings on the same area measure, and ask the advisor which charges (maintenance, parking, taxes) are extra.',
    },
    {
      q: 'How do I arrange a site visit or consultation?',
      a: 'Use the enquiry option on a listing, call +91 9911956274, or use the WhatsApp button, and an advisor from Keystone Realty Advisor will follow up.',
    },
  ];

  const hasUserFilters = Boolean(filters.query || filters.location || filters.minPrice || filters.maxPrice || filters.furnished || filters.status || filters.page);
  const related = PROGRAMMATIC_PAGES
    .filter((slug) => slug !== config.canonicalSlug)
    .map((slug) => parseProgrammaticSlug(slug))
    .filter((c) => c && (c.cityKey === config.cityKey || c.propertyType === config.propertyType))
    .slice(0, 8);

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '2.5rem 0 5rem' }}>
      <SEO
        title={config.pageTitle}
        description={config.pageDescription}
        canonicalUrl={`/${config.canonicalSlug}`}
        noIndex={confirmedEmpty}
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
              isPartOf: { '@id': 'https://keystonerealtyadvisor.com/#website' }
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
            <span>{config.displayCity} listings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>{config.headingTitle}</h1>
            <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{pageInfo.totalElements}</strong> {pageInfo.totalElements === 1 ? 'listing' : 'listings'}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9375rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {config.cityData.overview} Use the filters below to narrow by locality, budget and BHK.
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

        {/* Location guidance: general buying / renting checklist (no claims about Keystone's own process) */}
        <LocationGuide
          cityKey={config.cityKey}
          displayCity={config.displayCity}
          listingType={config.listingType}
          propertyType={config.propertyType}
        />

        {/* Dynamic FAQ Section */}
        <section className="card" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Questions about {config.headingTitle.toLowerCase()}
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

        {/* Related pages (generated from the PROGRAMMATIC_PAGES list, so links always point at live URLs) */}
        <div className="card" style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Related searches
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Other property types and cities across Delhi NCR.
              </p>
            </div>
            <Link to="/properties" className="btn btn-outline-gold" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.9rem' }}>
              All Properties
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            <Link to={`/properties-in-${config.city.toLowerCase()}`} className="btn btn-secondary btn-sm">
              Properties in {config.city}
            </Link>
            {related.map((r) => (
              <Link key={r.canonicalSlug} to={`/${r.canonicalSlug}`} className="btn btn-secondary btn-sm">
                {r.headingTitle}
              </Link>
            ))}
            <Link to="/projects" className="btn btn-secondary btn-sm">
              New Projects
            </Link>
            <Link to="/advisory" className="btn btn-secondary btn-sm">
              Advisory Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
