import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

        {/* Explore Other NCR Markets Internal Links */}
        <div className="card" style={{ marginTop: '3rem', padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Explore Verified Real Estate Across NCR
          </h3>
          <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Looking for opportunities beyond Delhi? Explore curated high-rises and luxury townships in neighbouring growth corridors.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href="/properties-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Gurugram
            </a>
            <a href="/properties-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Noida
            </a>
            <a href="/flats-for-rent-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Flats for Rent Gurugram
            </a>
            <a href="/projects/conscient-parq-sector-80-gurgaon" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Conscient Parq Gurgaon
            </a>
            <a href="/projects" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              All Projects Portfolio
            </a>
            <a href="/contact" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Speak with Advisor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
