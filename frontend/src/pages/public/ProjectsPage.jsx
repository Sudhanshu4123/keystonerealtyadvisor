import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RefreshCw, X, Building2, SlidersHorizontal } from 'lucide-react';
import ProjectGrid from '../../components/project/ProjectGrid';
import Pagination from '../../components/common/Pagination';
import SEO from '../../components/common/SEO';
import projectService from '../../services/projectService';
import { useToast } from '../../hooks/useToast';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { error } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    query: searchParams.get('query') || '',
    city: searchParams.get('city') || '',
    locality: searchParams.get('locality') || '',
    projectType: searchParams.get('projectType') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortDirection: searchParams.get('sortDirection') || 'desc',
    page: parseInt(searchParams.get('page') || '0', 10),
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {
        page: filters.page,
        size: 9,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
      };

      if (filters.query) params.query = filters.query;
      if (filters.city) params.city = filters.city;
      if (filters.locality) params.locality = filters.locality;
      if (filters.projectType) params.projectType = filters.projectType;
      if (filters.bedrooms) params.bedrooms = filters.bedrooms;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await projectService.searchProjects(params);
      const pageData = res?.data || res;
      if (pageData) {
        setProjects(pageData.content || []);
        setTotalPages(pageData.totalPages || 0);
        setTotalElements(pageData.totalElements || 0);
      }
    } catch (err) {
      error('Failed to load projects. Please try again.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value, page: 0 };
    setFilters(updated);

    const newParams = new URLSearchParams();
    Object.entries(updated).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined && k !== 'page') {
        newParams.set(k, v);
      }
    });
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProjects();
  };

  const handleResetFilters = () => {
    const reset = {
      query: '',
      city: '',
      locality: '',
      projectType: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortDirection: 'desc',
      page: 0,
    };
    setFilters(reset);
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - var(--header-height))', padding: '2.5rem 0 5rem' }}>
      <SEO
        title="Premier Real Estate Projects & Developments | Keystone Realty Advisor"
        description="Explore verified residential townships, luxury high-rises, commercial hubs, and plotted communities. Comprehensive project master plans, construction milestones, and RERA verified credentials."
        keywords="new launch real estate projects, residential developments, commercial towers, luxury apartments, RERA approved projects, Keystone Realty Advisor"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Keystone Realty Advisor - Real Estate Development Projects',
          description: 'Explore verified residential, commercial, villa, and plotted developments.',
          url: 'https://keystonerealtyadvisor.com/projects'
        }}
      />
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Title Banner */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-500)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            <Building2 size={16} />
            <span>Development Portfolio</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Real Estate Projects
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1rem', maxWidth: '650px' }}>
            Explore verified residential, commercial, villa, and plotted developments managed and advised by Keystone Realty Advisor.
          </p>
        </div>

        {/* Search & Action Bar */}
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
          {/* Top Search & Primary Action Row */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
              <Search
                size={18}
                color="var(--color-light-400)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Search by project name, developer, RERA number, or locality..."
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                style={{ paddingLeft: '42px', height: '44px' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: '44px', padding: '0 1.5rem', gap: '8px', fontWeight: 600 }}
            >
              <Search size={16} />
              <span>Search</span>
            </button>

            <button
              type="button"
              className={`btn ${showFilters ? 'btn-dark' : 'btn-outline-gold'}`}
              onClick={() => setShowFilters(!showFilters)}
              style={{ height: '44px', padding: '0 1.25rem', gap: '8px' }}
            >
              <SlidersHorizontal size={16} />
              <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
            </button>

            {(filters.query || filters.city || filters.locality || filters.projectType || filters.minPrice || filters.maxPrice || filters.bedrooms) && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleResetFilters}
                style={{ height: '44px', padding: '0 1rem', gap: '6px' }}
                title="Reset all filters"
              >
                <RefreshCw size={14} />
                <span>Reset</span>
              </button>
            )}
          </form>

          {/* Extended Filters Drawer */}
          {showFilters && (
            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {/* City */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-city-input">
                  City
                </label>
                <input
                  id="project-city-input"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Gurgaon, Noida, Delhi"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                />
              </div>

              {/* Locality */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-locality-input">
                  Locality / Sector
                </label>
                <input
                  id="project-locality-input"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Golf Course Rd, Sector 62"
                  value={filters.locality}
                  onChange={(e) => handleFilterChange('locality', e.target.value)}
                />
              </div>

              {/* Project Type */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-type-select">
                  Project Type
                </label>
                <select
                  id="project-type-select"
                  className="form-control"
                  value={filters.projectType}
                  onChange={(e) => handleFilterChange('projectType', e.target.value)}
                >
                  <option value="">All Project Types</option>
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="VILLA">Villa & Independent Houses</option>
                  <option value="PLOTTED_DEVELOPMENT">Plotted Development</option>
                  <option value="MIXED_USE">Mixed Use Development</option>
                  <option value="INDUSTRIAL">Industrial</option>
                </select>
              </div>

              {/* Minimum Bedrooms */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-bedrooms-select">
                  Min Bedrooms
                </label>
                <select
                  id="project-bedrooms-select"
                  className="form-control"
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                >
                  <option value="">Any BHK</option>
                  <option value="1">1+ BHK</option>
                  <option value="2">2+ BHK</option>
                  <option value="3">3+ BHK</option>
                  <option value="4">4+ BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>

              {/* Min Price */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-min-price">
                  Min Price (₹)
                </label>
                <input
                  id="project-min-price"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 5000000"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>

              {/* Max Price */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-max-price">
                  Max Price (₹)
                </label>
                <input
                  id="project-max-price"
                  type="number"
                  className="form-control"
                  placeholder="e.g. 20000000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>

              {/* Sort By */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="project-sort-select">
                  Sort Order
                </label>
                <select
                  id="project-sort-select"
                  className="form-control"
                  value={`${filters.sortBy}-${filters.sortDirection}`}
                  onChange={(e) => {
                    const [sb, sd] = e.target.value.split('-');
                    setFilters((prev) => ({ ...prev, sortBy: sb, sortDirection: sd, page: 0 }));
                  }}
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="minPrice-asc">Price: Low to High</option>
                  <option value="minPrice-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{projects.length}</strong> of <strong>{totalElements}</strong> projects
          </div>
        </div>

        {/* Project Grid */}
        <ProjectGrid projects={projects} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ marginTop: '2.5rem' }}>
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
