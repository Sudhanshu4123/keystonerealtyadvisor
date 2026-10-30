import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import LocationGuide from '../../components/common/LocationGuide';

export default function FlatsForRentGurugramPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: 'Gurugram',
    location: searchParams.get('location') || '',
    propertyType: 'APARTMENT',
    listingType: 'RENT',
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
      city: 'Gurugram',
      propertyType: 'APARTMENT',
      listingType: 'RENT',
      location: nextLocation,
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
        const res = await propertyService.searchProperties({
          ...filters,
          city: 'Gurugram',
          listingType: 'RENT',
          propertyType: 'APARTMENT',
        });
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // Strict filter: only Gurugram/Gurgaon rental flats
          const gurugramRentals = res.data.content.filter((p) => {
            const city = (p.city || '').toLowerCase();
            const loc = (p.location || '').toLowerCase();
            const isGurgaon = city.includes('gurugram') || city.includes('gurgaon') || loc.includes('gurugram') || loc.includes('gurgaon');
            return isGurgaon;
          });
          setProperties(gurugramRentals);
          setPageInfo({
            totalPages: res.data.totalPages || 0,
            totalElements: gurugramRentals.length,
            hasNext: res.data.hasNext || false,
            hasPrevious: res.data.hasPrevious || false,
          });
        } else {
          setProperties([]);
          setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
        }
      } catch (err) {
        console.error('Failed to search rental flats in Gurugram:', err);
        setProperties([]);
        setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    const updated = { ...newFilters, city: 'Gurugram', listingType: 'RENT', propertyType: 'APARTMENT' };
    setFilters(updated);
    const params = new URLSearchParams();
    Object.keys(updated).forEach((key) => {
      if (updated[key] !== '' && updated[key] !== null && updated[key] !== undefined && key !== 'size' && key !== 'city' && key !== 'listingType' && key !== 'propertyType') {
        params.set(key, updated[key]);
      }
    });
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      query: '',
      city: 'Gurugram',
      location: '',
      propertyType: 'APARTMENT',
      listingType: 'RENT',
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
      if (updated[key] !== '' && updated[key] !== null && updated[key] !== undefined && key !== 'size' && key !== 'city' && key !== 'listingType' && key !== 'propertyType') {
        params.set(key, updated[key]);
      }
    });
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '3rem 0 5rem' }}>
      <SEO
        title="Flats for Rent in Gurugram | Keystone Realty"
        description="Search 1 to 4 BHK flats for rent in Gurugram (Gurgaon) by locality, budget and furnishing, then enquire to arrange a viewing."
        canonicalUrl="/flats-for-rent-in-gurugram"
        geoPlacename="Gurugram"
        geoRegion="IN-HR"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Flats for Rent in Gurugram', path: '/flats-for-rent-in-gurugram' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Flats for Rent in Gurugram',
          description: 'Flats and apartments listed for rent in Gurugram (Gurgaon).',
          url: 'https://keystonerealtyadvisor.com/flats-for-rent-in-gurugram',
          isPartOf: { '@id': 'https://keystonerealtyadvisor.com/#website' },
        }}
      />
      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Properties', href: '/properties' },
            { label: 'Flats for Rent in Gurugram' },
          ]}
        />

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-subtitle">Rental Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Flats for Rent in Gurugram</h1>
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
          emptyTitle="No rental flats match your search criteria in Gurugram."
          emptyDescription="Try adjusting or resetting your filters to see other rental listings."
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

        <LocationGuide cityKey="gurugram" displayCity="Gurugram" listingType="RENT" propertyType="APARTMENT" />

        {/* Explore Other NCR Markets Internal Links */}
        <div className="card" style={{ marginTop: '3rem', padding: '1.75rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Explore Other Searches in NCR
          </h2>
          <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Looking to buy instead of rent? See properties for sale and new projects.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link to="/properties-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Buy in Gurugram
            </Link>
            <Link to="/properties-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Delhi
            </Link>
            <Link to="/properties-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Noida
            </Link>
            <Link to="/projects/conscient-parq-sector-80-gurgaon" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Conscient Parq Gurgaon
            </Link>
            <Link to="/projects" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              All New Launch Projects
            </Link>
            <Link to="/contact" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Schedule Rental Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
