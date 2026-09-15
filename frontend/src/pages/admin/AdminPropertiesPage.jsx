import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { Building2, PlusCircle, Edit3, Trash2, Search, ExternalLink } from 'lucide-react';

export default function AdminPropertiesPage() {
  const { success, error } = useToast();

  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    query: '',
    status: '',
    propertyType: '',
    page: 0,
    size: 15,
  });

  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProperties = async () => {
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
      error('Failed to load properties.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters.page, filters.status, filters.propertyType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 0 }));
    fetchProperties();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await propertyService.deleteProperty(deleteTarget.id);
      success(`Property "${deleteTarget.title}" deleted successfully.`);
      setDeleteTarget(null);
      fetchProperties();
    } catch (err) {
      error('Failed to delete property.');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (propertyId, newStatus) => {
    try {
      await propertyService.updateStatus(propertyId, newStatus);
      success('Property status updated.');
      fetchProperties();
    } catch (err) {
      error('Failed to update status.');
    }
  };

  const formatPrice = (val, listingType) => {
    if (!val) return '-';
    const num = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
    return listingType === 'RENT' ? `${num}/mo` : num;
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'AVAILABLE') return 'success';
    if (status === 'UNDER_OFFER') return 'warning';
    if (status === 'SOLD' || status === 'RENTED') return 'danger';
    return 'dark';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Property Portfolio Inventory</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage all real estate listings, specifications, status, and media assets
            </p>
          </div>

          <Link to="/admin/properties/new" className="btn btn-primary btn-sm">
            <PlusCircle size={16} />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Filter bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search title, city, or location..."
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              style={{ paddingLeft: '2.25rem' }}
            />
            <Search size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <select
            className="form-control"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 0 })}
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="UNDER_OFFER">Under Offer</option>
            <option value="SOLD">Sold</option>
            <option value="RENTED">Rented</option>
            <option value="OFF_MARKET">Off Market</option>
          </select>

          <select
            className="form-control"
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value, page: 0 })}
          >
            <option value="">All Property Types</option>
            <option value="APARTMENT">Apartment</option>
            <option value="VILLA">Villa</option>
            <option value="PENTHOUSE">Penthouse</option>
            <option value="TOWNHOUSE">Townhouse</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="OFFICE">Office</option>
            <option value="LAND">Land</option>
          </select>

          <button type="submit" className="btn btn-dark btn-sm" style={{ height: '100%' }}>
            Filter
          </button>
        </form>
      </div>

      {/* Property Table */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading properties...
          </div>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No properties found.
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              No real estate properties match your filter query or none have been created yet.
            </p>
            <Link to="/admin/properties/new" className="btn btn-primary btn-sm">
              <PlusCircle size={16} />
              <span>Create First Property</span>
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Type / Listing</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: '#0F172A',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          {p.primaryImageUrl ? (
                            <img src={p.primaryImageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748B', fontSize: '0.625rem', fontWeight: 600 }}>
                              NO IMG
                            </div>
                          )}
                        </div>
                        <div>
                          <Link to={`/properties/${p.id}`} target="_blank" style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span>{p.title}</span>
                            <ExternalLink size={12} color="var(--text-muted)" />
                          </Link>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {p.bedrooms} Beds • {p.bathrooms} Baths • {p.area} sqft
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{p.societyName || p.location}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.city}</div>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{p.propertyType}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.listingType}</div>
                    </td>

                    <td>
                      <strong style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                        {formatPrice(p.price, p.listingType)}
                      </strong>
                    </td>

                    <td>
                      <select
                        className="form-control"
                        value={p.status}
                        onChange={(e) => handleStatusChange(p.id, e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', width: 'auto' }}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="UNDER_OFFER">UNDER OFFER</option>
                        <option value="SOLD">SOLD</option>
                        <option value="RENTED">RENTED</option>
                        <option value="OFF_MARKET">OFF MARKET</option>
                      </select>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <Link to={`/admin/properties/edit/${p.id}`} className="btn btn-outline btn-sm" style={{ padding: '0.375rem 0.625rem' }}>
                          <Edit3 size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(p)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.375rem 0.625rem', color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={filters.page}
          totalPages={pageInfo.totalPages}
          hasNext={pageInfo.hasNext}
          hasPrevious={pageInfo.hasPrevious}
          onPageChange={(newPage) => setFilters((prev) => ({ ...prev, page: newPage }))}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Property"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? All associated images and records will be deleted.`}
        confirmLabel="Delete Property"
        loading={deleting}
      />
    </div>
  );
}
