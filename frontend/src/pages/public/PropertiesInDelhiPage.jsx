import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function PropertiesInDelhiPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: 'Delhi',
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    listingType: searchParams.get('listingType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
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

  // Sync state from URL params
  useEffect(() => {
    const nextQuery = searchParams.get('query') || '';
    const nextLocation = searchParams.get('location') || '';
    const nextPropertyType = searchParams.get('propertyType') || '';
    const nextListingType = searchParams.get('listingType') || '';
    const nextMinPrice = searchParams.get('minPrice') || '';
    const nextMaxPrice = searchParams.get('maxPrice') || '';
    const nextBedrooms = searchParams.get('bedrooms') || '';
    const nextBathrooms = searchParams.get('bathrooms') || '';
    const nextFurnished = searchParams.get('furnished') || '';
    const nextStatus = searchParams.get('status') || '';
    const nextSortBy = searchParams.get('sortBy') || 'createdAt';
    const nextSortDirection = searchParams.get('sortDirection') || 'DESC';
    const nextPage = Number(searchParams.get('page')) || 0;

    setFilters((prev) => ({
      ...prev,
      query: nextQuery,
      city: 'Delhi',
      location: nextLocation,
      propertyType: nextPropertyType,
      listingType: nextListingType,
      minPrice: nextMinPrice,
      maxPrice: nextMaxPrice,
      bedrooms: nextBedrooms,
      bathrooms: nextBathrooms,
      furnished: nextFurnished,
      status: nextStatus,
      sortBy: nextSortBy,
      sortDirection: nextSortDirection,
      page: nextPage,
    }));
  }, [searchParams]);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await propertyService.searchProperties({ ...filters, city: 'Delhi' });
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // Strict city filter: only keep properties belonging to Delhi
          const delhiProps = res.data.content.filter((p) => {
            const city = (p.city || '').toLowerCase();
            const loc = (p.location || '').toLowerCase();
            return city.includes('delhi') || loc.includes('delhi');
          });
          setProperties(delhiProps);
          setPageInfo({
            totalPages: res.data.totalPages || 0,
            totalElements: delhiProps.length,
            hasNext: res.data.hasNext || false,
            hasPrevious: res.data.hasPrevious || false,
          });
        } else {
          setProperties([]);
          setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
        }
      } catch (err) {
        console.error('Failed to search properties in Delhi:', err);
        setProperties([]);
        setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    const updated = { ...newFilters, city: 'Delhi' };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== '' && updated[key] !== null && updated[key] !== undefined && key !== 'size' && key !== 'city') {
        params.set(key, updated[key]);
      }
    });
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      query: '',
      city: 'Delhi',
      location: '',
      propertyType: '',
      listingType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      furnished: '',
      status: '',
      sortBy: 'createdAt',
      sortDirection: 'DESC',
      page: 0,
      size: 12,
    };
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== '' && updated[key] !== null && updated[key] !== undefined && key !== 'size' && key !== 'city') {
        params.set(key, updated[key]);
      }
    });
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '3rem 0 5rem' }}>
      <SEO
        title="Properties in Delhi | Luxury Flats | Keystone"
        description="Search verified properties in Delhi. Explore luxury flats, builder floors, and residential homes in South & Central Delhi with verified legal due diligence."
        keywords="properties in delhi, flats in delhi, buy property in delhi, builder floors in delhi, luxury apartments delhi, Keystone Realty"
        canonicalUrl="/properties-in-delhi"
        geoPlacename="Delhi"
        geoRegion="IN-DL"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Properties in Delhi', path: '/properties-in-delhi' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Properties in Delhi',
          description: 'Explore verified residential and commercial properties in Delhi.',
          url: 'https://keystonerealtyadvisor.com/properties-in-delhi',
        }}
      />
      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Properties', href: '/properties' },
            { label: 'Properties in Delhi' },
          ]}
        />

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-subtitle">Property Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Properties in Delhi</h1>
            <span style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{pageInfo.totalElements}</strong> {pageInfo.totalElements === 1 ? 'property' : 'properties'}
            </span>
          </div>
        </div>

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
          emptyTitle="No active properties found in Delhi right now."
          emptyDescription="We are currently onboarding and verifying new properties in Delhi. Any new Delhi listing added will automatically appear here."
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

        {/* Contextual Link Weaving: Research & Regional Markets */}
        <div className="card" style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Delhi Market Dossiers & Research Guides
              </h3>
              <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Understand freehold FAR norms, builder floor title due diligence, and capital appreciation comparisons with Gurugram.
              </p>
            </div>
            <Link to="/insights" className="btn btn-outline-gold" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.9rem' }}>
              All Research Guides
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.25rem' }}>
            <Link to="/insights/south-delhi-vs-gurgaon-luxury-living" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              South Delhi vs Gurgaon Condos Guide
            </Link>
            <Link to="/insights/dwarka-expressway-investment-guide" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Dwarka Expressway & West Delhi Guide
            </Link>
            <Link to="/insights/nri-real-estate-investment-india-fema-tax" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              NRI Real Estate & Tax Guide
            </Link>
            <Link to="/insights/hrera-gurugram-property-verification-guide" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              RERA Due Diligence Handbook
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            <Link to="/builder-floors-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Builder Floors in Delhi
            </Link>
            <Link to="/luxury-villas-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Luxury Villas in Delhi
            </Link>
            <Link to="/commercial-properties-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Commercial Properties Delhi
            </Link>
            <Link to="/properties-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Gurugram
            </Link>
            <Link to="/properties-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Noida
            </Link>
            <Link to="/flats-for-rent-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Flats for Rent Gurugram
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Speak with Advisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
