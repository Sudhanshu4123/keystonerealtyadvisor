import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import PropertyFilter from '../../components/property/PropertyFilter';
import PropertyGrid from '../../components/property/PropertyGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import LocationGuide from '../../components/common/LocationGuide';

export default function PropertiesInNoidaPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    query: searchParams.get('query') || '',
    city: 'Noida',
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
      city: 'Noida',
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
        const res = await propertyService.searchProperties({ ...filters, city: 'Noida' });
        if (res.success && res.data && Array.isArray(res.data.content)) {
          // Strict city filter: only keep properties belonging to Noida
          const noidaProps = res.data.content.filter((p) => {
            const city = (p.city || '').toLowerCase();
            const loc = (p.location || '').toLowerCase();
            return city.includes('noida') || loc.includes('noida');
          });
          setProperties(noidaProps);
          setPageInfo({
            totalPages: res.data.totalPages || 0,
            totalElements: noidaProps.length,
            hasNext: res.data.hasNext || false,
            hasPrevious: res.data.hasPrevious || false,
          });
        } else {
          setProperties([]);
          setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
        }
      } catch (err) {
        console.error('Failed to search properties in Noida:', err);
        setProperties([]);
        setPageInfo({ totalPages: 0, totalElements: 0, hasNext: false, hasPrevious: false });
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    const updated = { ...newFilters, city: 'Noida' };
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
      city: 'Noida',
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
        title="Properties in Noida & Greater Noida | Keystone Realty"
        description="Search apartments and commercial property in Noida and Greater Noida by sector, budget and BHK, then enquire to arrange a viewing."
        canonicalUrl="/properties-in-noida"
        geoPlacename="Noida"
        geoRegion="IN-UP"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Properties', path: '/properties' },
          { name: 'Properties in Noida', path: '/properties-in-noida' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Properties in Noida',
          description: 'Apartments and commercial property listed in Noida and Greater Noida.',
          url: 'https://keystonerealtyadvisor.com/properties-in-noida',
          isPartOf: { '@id': 'https://keystonerealtyadvisor.com/#website' },
        }}
      />
      <div className="container">
        {/* Semantic Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Properties', href: '/properties' },
            { label: 'Properties in Noida' },
          ]}
        />

        {/* Page Header */}
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-subtitle">Property Portfolio</span>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Properties in Noida</h1>
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
          emptyTitle="No active properties found in Noida right now."
          emptyDescription="There are no active listings in Noida at the moment. New listings appear here as they are added, or send an enquiry and an advisor will get back to you."
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

        <LocationGuide cityKey="noida" displayCity="Noida" listingType="SALE" />

        {/* Contextual Link Weaving: Related Searches & Regional Markets */}
        <div className="card" style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Popular Property Searches in Noida
              </h3>
              <p style={{ fontSize: '0.84375rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Browse verified flats for sale, rental homes, and commercial spaces across Noida and Greater Noida corridors.
              </p>
            </div>
            <Link to="/properties" className="btn btn-outline-gold" style={{ fontSize: '0.8125rem', padding: '0.4rem 0.9rem' }}>
              All Properties
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            <Link to="/flats-for-sale-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Flats for Sale in Noida
            </Link>
            <Link to="/flats-for-rent-in-noida" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Flats for Rent in Noida
            </Link>
            <Link to="/properties-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Gurugram
            </Link>
            <Link to="/properties-in-delhi" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Properties in Delhi
            </Link>
            <Link to="/flats-for-rent-in-gurugram" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Flats for Rent Gurugram
            </Link>
            <Link to="/advisory" className="btn btn-secondary" style={{ fontSize: '0.8125rem' }}>
              Keystone Advisory Services
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
