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

  // Sync state from URL search params when URL changes (e.g. from hero chips or back/forward)
  useEffect(() => {
    const nextQuery = searchParams.get('query') || '';
    const nextCity = searchParams.get('city') || '';
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

    setFilters((prev) => {
      if (
        prev.query === nextQuery &&
        prev.city === nextCity &&
        prev.location === nextLocation &&
        prev.propertyType === nextPropertyType &&
        prev.listingType === nextListingType &&
        prev.minPrice === nextMinPrice &&
        prev.maxPrice === nextMaxPrice &&
        prev.bedrooms === nextBedrooms &&
        prev.bathrooms === nextBathrooms &&
        prev.furnished === nextFurnished &&
        prev.status === nextStatus &&
        prev.sortBy === nextSortBy &&
        prev.sortDirection === nextSortDirection &&
        prev.page === nextPage
      ) {
        return prev;
      }
      return {
        ...prev,
        query: nextQuery,
        city: nextCity,
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
      };
    });
  }, [searchParams]);

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
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] !== '' && newFilters[key] !== null && newFilters[key] !== undefined && key !== 'size') {
        params.set(key, newFilters[key]);
      }
    });
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
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
    };
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    const updated = { ...filters, page: newPage };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== '' && updated[key] !== null && updated[key] !== undefined && key !== 'size') {
        params.set(key, updated[key]);
      }
    });
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic heading & SEO depending on search query / filter parameters
  const formatTypeName = (type) => {
    if (!type) return '';
    if (type === 'APARTMENT') return 'Flats & Apartments';
    if (type === 'VILLA') return 'Luxury Villas';
    if (type === 'INDEPENDENT_FLOOR') return 'Builder Floors';
    if (type === 'PENTHOUSE') return 'Luxury Penthouses';
    if (type === 'PLOT') return 'Plots & Land';
    if (type === 'COMMERCIAL') return 'Commercial Spaces';
    if (type === 'PG_CO_LIVING') return 'PG & Co-Living Spaces';
    return type.replace(/_/g, ' ');
  };

  const isFlatForRentGurugram = filters.city?.toLowerCase() === 'gurugram' && filters.listingType === 'RENT' && filters.propertyType === 'APARTMENT';
  const isFlatForSaleGurugram = filters.city?.toLowerCase() === 'gurugram' && filters.listingType === 'SALE' && filters.propertyType === 'APARTMENT';

  let pageTitle = 'Properties for Sale & Rent | Keystone Realty';
  let headingTitle = 'Verified Properties for Sale & Rent';
  let pageDescription = 'Browse verified residential apartments, luxury villas, builder floors, and commercial spaces across Delhi NCR with clear titles and transparent pricing.';

  if (isFlatForRentGurugram) {
    pageTitle = 'Flats for Rent in Gurugram | Keystone Realty';
    headingTitle = 'Flats for Rent in Gurugram';
    pageDescription = 'Explore verified 1, 2, 3 & 4 BHK flats for rent in Gurugram. Direct owner listings in prime Golf Course Rd, Cyber City & Dwarka Expressway societies.';
  } else if (isFlatForSaleGurugram) {
    pageTitle = 'Flats for Sale in Gurugram | Keystone Realty';
    headingTitle = 'Flats for Sale in Gurugram';
    pageDescription = 'Explore verified luxury flats and apartments for sale in Gurugram with clear titles, prime locations, and expert advisor support from Keystone Realty.';
  } else if (filters.propertyType && filters.city) {
    const formattedType = formatTypeName(filters.propertyType);
    pageTitle = `${formattedType} in ${filters.city} | Keystone Realty`;
    headingTitle = `${formattedType} in ${filters.city}`;
    pageDescription = `Explore verified ${formattedType.toLowerCase()} in ${filters.city}. Clear legal titles, prime locations, and expert advisor assistance with Keystone Realty.`;
  } else if (filters.propertyType) {
    const formattedType = formatTypeName(filters.propertyType);
    pageTitle = `${formattedType} for Sale & Rent | Keystone`;
    headingTitle = `Verified ${formattedType} in Delhi NCR`;
    pageDescription = `Explore verified ${formattedType.toLowerCase()} in Delhi NCR with clear legal titles, prime locations, and expert property advisory by Keystone Realty.`;
  } else if (filters.city) {
    pageTitle = `Properties in ${filters.city} | Keystone Realty`;
    headingTitle = `Verified Properties in ${filters.city}`;
    pageDescription = `Explore verified residential and commercial properties in ${filters.city} with clear titles, transparent pricing, and expert guidance by Keystone Realty.`;
  } else if (filters.listingType === 'RENT') {
    pageTitle = 'Properties for Rent in Delhi NCR | Keystone Realty';
    headingTitle = 'Properties for Rent in Delhi NCR';
    pageDescription = 'Find verified rental properties, residential flats, builder floors, and commercial spaces in Delhi NCR with verified owners and transparent terms.';
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '3rem 0 5rem' }}>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="/properties"
        keywords="flat for rent in gurugram, flats in gurugram, rent apartment gurugram, verified properties, flats for sale, Keystone Realty Advisor"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: headingTitle,
          description: pageDescription,
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
            <h1 className="section-title" style={{ marginBottom: 0 }}>{headingTitle}</h1>
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

        {/* Explore Specific Regional Portfolios */}
        <div className="card" style={{ marginTop: '3rem', padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Explore Verified Regional Real Estate
          </h3>
          <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Browse curated high-demand cities and townships with verified legal titles and dedicated investment guidance.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a href="/properties-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Delhi
            </a>
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
              Conscient Parq Sector 80
            </a>
            <a href="/projects" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              New Launch Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
