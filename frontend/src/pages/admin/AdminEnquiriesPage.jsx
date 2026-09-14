import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { MessageSquare, Eye, Trash2, Mail, Phone, Building, ExternalLink } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const { success, error } = useToast();

  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminService.getEnquiries({
        status: statusFilter,
        page,
        size: 15,
      });
      if (res.success && res.data) {
        setEnquiries(res.data.content || []);
        setPageInfo({
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          hasNext: res.data.hasNext,
          hasPrevious: res.data.hasPrevious,
        });
      }
    } catch (err) {
      error('Failed to load enquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [page, statusFilter]);

  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      await adminService.updateEnquiryStatus(enquiryId, newStatus);
      success('Enquiry status updated.');
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      fetchEnquiries();
    } catch (err) {
      error('Failed to update status.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminService.deleteEnquiry(deleteTarget.id);
      success('Enquiry deleted successfully.');
      setDeleteTarget(null);
      if (selectedEnquiry?.id === deleteTarget.id) {
        setSelectedEnquiry(null);
      }
      fetchEnquiries();
    } catch (err) {
      error('Failed to delete enquiry.');
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    if (status === 'PENDING') return 'warning';
    if (status === 'CONTACTED') return 'info';
    if (status === 'IN_PROGRESS') return 'gold';
    if (status === 'RESOLVED') return 'success';
    return 'dark';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Client Enquiries & Consultations</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage customer advisory leads, property queries, and tracking status
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Status Filter:</span>
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              style={{ width: 'auto' }}
            >
              <option value="">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No enquiries recorded.
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              No client consultations or property enquiries match the current filter.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Contact Info</th>
                  <th>Property / Subject</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <div style={{ fontWeight: 600 }}>{enq.name}</div>
                      {enq.userName && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-600)' }}>
                          Registered Account: {enq.userName}
                        </div>
                      )}
                    </td>

                    <td>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{enq.email}</div>
                      {enq.phone && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.phone}</div>}
                    </td>

                    <td>
                      {enq.propertyTitle ? (
                        <div>
                          <Link to={`/properties/${enq.propertyId}`} target="_blank" style={{ fontWeight: 600, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <span>{enq.propertyTitle}</span>
                            <ExternalLink size={12} color="var(--text-muted)" />
                          </Link>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {enq.propertyCity}
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>General Consultation</span>
                      )}
                    </td>

                    <td>
                      <select
                        className="form-control"
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', width: 'auto' }}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.375rem 0.625rem' }}
                          title="View Message Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(enq)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.375rem 0.625rem', color: 'var(--color-danger)' }}
                          title="Delete Enquiry"
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
          currentPage={page}
          totalPages={pageInfo.totalPages}
          hasNext={pageInfo.hasNext}
          hasPrevious={pageInfo.hasPrevious}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      {/* View Enquiry Details Modal */}
      {selectedEnquiry && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedEnquiry(null)}
          title={`Enquiry #${selectedEnquiry.id} Details`}
          maxWidth="600px"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Update Status:</span>
                <select
                  className="form-control"
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry.id, e.target.value)}
                  style={{ width: 'auto', fontSize: '0.8125rem', padding: '0.3rem 0.6rem' }}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              <button type="button" onClick={() => setSelectedEnquiry(null)} className="btn btn-dark btn-sm">
                Close
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Client Name</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{selectedEnquiry.name}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Submitted On</span>
                <div style={{ fontSize: '0.875rem', marginTop: '2px' }}>{new Date(selectedEnquiry.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</span>
                <div style={{ fontSize: '0.875rem', marginTop: '2px' }}>
                  <a href={`mailto:${selectedEnquiry.email}`} style={{ color: 'var(--color-gold-600)', textDecoration: 'underline' }}>
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Phone Number</span>
                <div style={{ fontSize: '0.875rem', marginTop: '2px' }}>{selectedEnquiry.phone || 'None provided'}</div>
              </div>
            </div>

            {selectedEnquiry.propertyTitle && (
              <div style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Referenced Property</span>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', marginTop: '2px' }}>
                  <Link to={`/properties/${selectedEnquiry.propertyId}`} target="_blank" style={{ color: 'var(--text-primary)' }}>
                    {selectedEnquiry.propertyTitle} ({selectedEnquiry.propertyLocation}, {selectedEnquiry.propertyCity})
                  </Link>
                </div>
              </div>
            )}

            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                Full Client Message
              </span>
              <div style={{ padding: '1rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', lineHeight: 1.6, fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>
                {selectedEnquiry.message}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Enquiry Record"
        message={`Are you sure you want to delete the enquiry from "${deleteTarget?.name}"?`}
        confirmLabel="Delete Enquiry"
        loading={deleting}
      />
    </div>
  );
}
