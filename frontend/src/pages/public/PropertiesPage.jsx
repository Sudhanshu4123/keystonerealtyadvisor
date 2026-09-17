import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: searchParams.get('city') || '',
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

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await propertyService.searchProperties(filters);
        if (res.success && res.data) {
          setProperties(res.data.content || []);
          setPageInfo({
            totalPages: res.data.totalPages,
            totalElements: res.data.totalElements,
            hasNext: res.data.hasNext,
            hasPrevious: res.data.hasPrevious,
          });
        }
      } catch (err) {
        console.error('Failed to search properties:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();

    // Sync state to URL search parameters
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        params.set(key, filters[key]);
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      query: '',
      city: '',
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
    });
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '3rem 0 5rem' }}>
      <SEO
        title="Verified Properties for Sale & Rent in Gurgaon | Keystone Realty Advisor"
        description="Browse thoroughly verified residential apartments, luxury villas, builder floors, and commercial spaces in Gurgaon and Delhi NCR. Reviewed for clear titles and authentic market pricing."
        keywords="properties in Gurgaon, flats for sale Gurgaon, apartments for rent Gurgaon, luxury villas, commercial spaces Gurgaon, Keystone Realty Advisor"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Verified Real Estate Properties for Sale & Rent in Gurgaon',
          description: 'Browse verified residential and commercial properties available for sale and rent in Gurgaon and Delhi NCR.',
          url: 'https://keystonerealtyadvisor.com/properties'
        }}
      />
      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Properties' }]} />

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-subtitle">Property Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Verified Properties for Sale & Rent in Gurgaon</h1>
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
          emptyTitle="No properties match your search criteria."
          emptyDescription="Try adjusting or resetting your search parameters to explore other verified listings."
          columns={3}
        />

        {/* Pagination */}
        <Pagination
          currentPage={filters.page}
          totalPages={pageInfo.totalPages}
          hasNext={pageInfo.hasNext}
          hasPrevious={pageInfo.hasPrevious}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
