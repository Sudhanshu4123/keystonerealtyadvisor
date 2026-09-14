import React, { useState } from 'react';
import { Search, RotateCcw, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export default function PropertyFilter({ filters, onFilterChange, onReset }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
      page: 0, // Reset to first page on filter modification
    });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'price_asc') {
      onFilterChange({ ...filters, sortBy: 'price', sortDirection: 'ASC', page: 0 });
    } else if (value === 'price_desc') {
      onFilterChange({ ...filters, sortBy: 'price', sortDirection: 'DESC', page: 0 });
    } else if (value === 'area_desc') {
      onFilterChange({ ...filters, sortBy: 'area', sortDirection: 'DESC', page: 0 });
    } else {
      onFilterChange({ ...filters, sortBy: 'createdAt', sortDirection: 'DESC', page: 0 });
    }
  };

  const currentSortValue = () => {
    if (filters.sortBy === 'price' && filters.sortDirection === 'ASC') return 'price_asc';
    if (filters.sortBy === 'price' && filters.sortDirection === 'DESC') return 'price_desc';
    if (filters.sortBy === 'area') return 'area_desc';
    return 'newest';
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Top Search & Primary Filter Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'flex-end',
        }}
      >
        {/* Search Keyword */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="search-input">Search Keywords</label>
          <div style={{ position: 'relative' }}>
            <input
              id="search-input"
              type="text"
              className="form-control"
              placeholder="City, location, or keyword..."
              value={filters.query || ''}
              onChange={(e) => handleChange('query', e.target.value)}
              style={{ paddingLeft: '2.25rem' }}
            />
            <Search size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Listing Type */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="listing-type-select">Listing Type</label>
          <select
            id="listing-type-select"
            className="form-control"
            value={filters.listingType || ''}
            onChange={(e) => handleChange('listingType', e.target.value)}
          >
            <option value="">All Listing Types</option>
            <option value="SALE">For Sale</option>
            <option value="RENT">For Rent</option>
            <option value="LEASE">Commercial Lease</option>
          </select>
        </div>

        {/* Property Type */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="property-type-select">Property Type</label>
          <select
            id="property-type-select"
            className="form-control"
            value={filters.propertyType || ''}
            onChange={(e) => handleChange('propertyType', e.target.value)}
          >
            <option value="">All Property Types</option>
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="TOWNHOUSE">Townhouse</option>
            <option value="ESTATE">Estate</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="OFFICE">Office</option>
            <option value="LAND">Land</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor="sort-select">Sort Results</label>
          <select
            id="sort-select"
            className="form-control"
            value={currentSortValue()}
            onChange={handleSortChange}
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="area_desc">Area: Largest First</option>
          </select>
        </div>
      </div>

      {/* Advanced Filter Collapse Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="btn btn-ghost btn-sm"
          style={{ gap: '0.375rem', paddingLeft: 0 }}
        >
          <Filter size={15} />
          <span>{expanded ? 'Hide Advanced Filters' : 'Show Advanced Filters (Price, Beds, Furnishing)'}</span>
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        <button
          type="button"
          onClick={onReset}
          className="btn btn-outline btn-sm"
          style={{ gap: '0.375rem' }}
        >
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Advanced Filter Body */}
      {expanded && (
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* City */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="city-input">City</label>
            <input
              id="city-input"
              type="text"
              className="form-control"
              placeholder="e.g. New York, London"
              value={filters.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>

          {/* Min Price */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="min-price-input">Min Price ($)</label>
            <input
              id="min-price-input"
              type="number"
              className="form-control"
              placeholder="Min USD"
              min="0"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          {/* Max Price */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="max-price-input">Max Price ($)</label>
            <input
              id="max-price-input"
              type="number"
              className="form-control"
              placeholder="Max USD"
              min="0"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : '')}
            />
          </div>

          {/* Bedrooms */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="bedrooms-select">Bedrooms</label>
            <select
              id="bedrooms-select"
              className="form-control"
              value={filters.bedrooms || ''}
              onChange={(e) => handleChange('bedrooms', e.target.value ? Number(e.target.value) : '')}
            >
              <option value="">Any Bedrooms</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="bathrooms-select">Bathrooms</label>
            <select
              id="bathrooms-select"
              className="form-control"
              value={filters.bathrooms || ''}
              onChange={(e) => handleChange('bathrooms', e.target.value ? Number(e.target.value) : '')}
            >
              <option value="">Any Bathrooms</option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </select>
          </div>

          {/* Furnishing */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="furnished-select">Furnished Status</label>
            <select
              id="furnished-select"
              className="form-control"
              value={filters.furnished || ''}
              onChange={(e) => handleChange('furnished', e.target.value)}
            >
              <option value="">Any Status</option>
              <option value="UNFURNISHED">Unfurnished</option>
              <option value="SEMI_FURNISHED">Semi Furnished</option>
              <option value="FULLY_FURNISHED">Fully Furnished</option>
            </select>
          </div>

          {/* Property Status */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" htmlFor="status-select">Status</label>
            <select
              id="status-select"
              className="form-control"
              value={filters.status || ''}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="UNDER_OFFER">Under Offer</option>
              <option value="SOLD">Sold</option>
              <option value="RENTED">Rented</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
