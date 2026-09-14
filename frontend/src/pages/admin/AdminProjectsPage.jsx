import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Plus, Search, Edit3, Trash2, Eye,
  ExternalLink, CheckCircle2, Clock, AlertTriangle, ShieldCheck
} from 'lucide-react';
import projectService from '../../services/projectService';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import ConfirmModal from '../../components/admin/ConfirmModal';
import Pagination from '../../components/common/Pagination';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function AdminProjectsPage() {
  const { success, error } = useToast();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Search & Filter state
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [projectTypeFilter, setProjectTypeFilter] = useState('');
  const [page, setPage] = useState(0);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        size: 10,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      };
      if (query) params.query = query;
      if (statusFilter) params.status = statusFilter;
      if (projectTypeFilter) params.projectType = projectTypeFilter;

      const res = await projectService.getAdminProjects(params);
      const data = res?.data || res;
      if (data) {
        setProjects(data.content || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
      }
    } catch (err) {
      error('Failed to retrieve project list.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, statusFilter, projectTypeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchProjects();
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await projectService.updateProjectStatus(projectId, newStatus);
      success(`Project status updated to ${newStatus}`);
      fetchProjects();
    } catch (err) {
      error('Failed to change project status.');
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setDeleting(true);
    try {
      await projectService.deleteProject(projectToDelete.id);
      success('Project and associated assets deleted successfully.');
      setDeleteModalOpen(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (err) {
      error('Failed to delete project. Please check if related records exist.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Title & Add Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold-500)', fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase' }}>
              <Building2 size={16} />
              <span>Project Management</span>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0.25rem 0 0 0' }}>
              Real Estate Projects ({totalElements})
            </h1>
          </div>

          <Link to="/admin/projects/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} />
            <span>Create New Project</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
              <Search size={16} color="var(--color-light-400)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                className="form-control"
                placeholder="Search projects by name, developer, locality, or RERA..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ paddingLeft: '40px', height: '42px' }}
              />
            </div>

            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              style={{ minWidth: '170px', height: '42px' }}
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="UNPUBLISHED">Unpublished</option>
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="READY_TO_MOVE">Ready to Move</option>
              <option value="COMPLETED">Completed</option>
              <option value="SOLD_OUT">Sold Out</option>
            </select>

            <select
              className="form-control"
              value={projectTypeFilter}
              onChange={(e) => {
                setProjectTypeFilter(e.target.value);
                setPage(0);
              }}
              style={{ minWidth: '170px', height: '42px' }}
            >
              <option value="">All Project Types</option>
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="VILLA">Villa & Independent</option>
              <option value="PLOTTED_DEVELOPMENT">Plotted Development</option>
              <option value="MIXED_USE">Mixed Use</option>
            </select>

            <button type="submit" className="btn btn-primary" style={{ height: '42px', padding: '0 1.25rem' }}>
              Filter
            </button>
          </form>
        </div>

        {/* Projects Table */}
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <LoadingSkeleton key={i} height="52px" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Building2 size={40} color="var(--color-gold-500)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                No Projects Found
              </h3>
              <p style={{ fontSize: '0.875rem', maxWidth: '400px', margin: '0 auto 1.25rem auto' }}>
                No real estate project records match the active criteria. Click below to add the first real development.
              </p>
              <Link to="/admin/projects/new" className="btn btn-primary">
                Add Project
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Project</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Type</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Location</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Price Range</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Status</th>
                    <th style={{ padding: '0.875rem 1.25rem' }}>Configurations</th>
                    <th style={{ padding: '0.875rem 1.25rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((proj) => (
                    <tr key={proj.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {/* Project Name & Cover */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0B0F19', flexShrink: 0 }}>
                            {proj.coverImageUrl ? (
                              <img src={proj.coverImageUrl} alt={proj.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
                                <Building2 size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proj.name}</div>
                            {proj.builderName && (
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>By {proj.builderName}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                        {proj.projectType?.replace(/_/g, ' ')}
                      </td>

                      {/* Location */}
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                        {proj.locality}, {proj.city}
                      </td>

                      {/* Price Range */}
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--color-gold-600)' }}>
                        {proj.minPrice ? `₹${(proj.minPrice / 100000).toFixed(1)} L` : 'On Request'}
                        {proj.maxPrice && proj.maxPrice !== proj.minPrice ? ` - ₹${(proj.maxPrice / 100000).toFixed(1)} L` : ''}
                      </td>

                      {/* Status Dropdown */}
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <select
                          value={proj.status}
                          onChange={(e) => handleStatusChange(proj.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.78125rem',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-main)',
                            color: proj.status === 'PUBLISHED' ? '#10B981' : proj.status === 'DRAFT' ? '#E5C065' : 'var(--text-primary)',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="UNPUBLISHED">UNPUBLISHED</option>
                          <option value="UNDER_CONSTRUCTION">UNDER CONSTRUCTION</option>
                          <option value="READY_TO_MOVE">READY TO MOVE</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="SOLD_OUT">SOLD OUT</option>
                        </select>
                      </td>

                      {/* Configurations Count */}
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-secondary)' }}>
                        {proj.totalConfigurations || 0} units
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          <Link
                            to={`/projects/${proj.id}`}
                            target="_blank"
                            className="btn btn-secondary"
                            style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}
                            title="Public Live View"
                          >
                            <ExternalLink size={14} />
                          </Link>

                          <Link
                            to={`/admin/projects/edit/${proj.id}`}
                            className="btn btn-secondary"
                            style={{ padding: '6px 8px', color: 'var(--color-gold-600)' }}
                            title="Edit Project"
                          >
                            <Edit3 size={14} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              setProjectToDelete(proj);
                              setDeleteModalOpen(true);
                            }}
                            className="btn btn-secondary"
                            style={{ padding: '6px 8px', color: '#EF4444' }}
                            title="Delete Project"
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ marginTop: '2rem' }}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Project Confirmation"
          message={`Are you sure you want to permanently delete the project "${projectToDelete?.name}"? All associated configurations, floor plans, documents, and media gallery files will be removed.`}
          confirmText={deleting ? 'Deleting...' : 'Permanently Delete'}
          confirmVariant="danger"
        />

      </div>
    </div>
  );
}
