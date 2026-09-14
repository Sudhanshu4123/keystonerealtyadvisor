import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enquiryService } from '../../services/enquiryService';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import EmptyState from '../../components/common/EmptyState';
import { MessageSquare, Calendar, Building, MapPin } from 'lucide-react';

export default function UserEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnquiries() {
      setLoading(true);
      try {
        const res = await enquiryService.getUserEnquiries(page, 10);
        if (res.success && res.data) {
          setEnquiries(res.data.content || []);
          setPageInfo({
            totalPages: res.data.totalPages,
            hasNext: res.data.hasNext,
            hasPrevious: res.data.hasPrevious,
          });
        }
      } catch (err) {
        console.error('Failed to load enquiries:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEnquiries();
  }, [page]);

  const getStatusBadgeVariant = (status) => {
    if (status === 'PENDING') return 'warning';
    if (status === 'CONTACTED') return 'info';
    if (status === 'IN_PROGRESS') return 'gold';
    if (status === 'RESOLVED') return 'success';
    return 'dark';
  };

  return (
    <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <MessageSquare size={22} color="var(--color-gold-500)" />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>My Advisory Enquiries</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Track the status of your property inquiries and advisory requests
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading your enquiries...
        </div>
      ) : enquiries.length === 0 ? (
        <EmptyState
          title="No enquiries submitted yet."
          description="Submit an enquiry from any property details page or through our advisory contact desk to see communication updates here."
          actionLabel="Browse Properties"
          actionLink="/properties"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <Badge variant={getStatusBadgeVariant(enq.status)}>
                      {enq.status?.replace('_', ' ')}
                    </Badge>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Submitted on {new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {enq.propertyTitle ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                      <Building size={16} color="var(--color-gold-500)" />
                      <Link to={`/properties/${enq.propertyId}`} style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--text-primary)' }}>
                        {enq.propertyTitle}
                      </Link>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        ({enq.propertyLocation}, {enq.propertyCity})
                      </span>
                    </div>
                  ) : (
                    <h3 style={{ fontWeight: 600, fontSize: '1.0625rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                      General Real Estate Advisory Consultation
                    </h3>
                  )}
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Enquiry ID: #{enq.id}
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  Your Message:
                </div>
                {enq.message}
              </div>
            </div>
          ))}

          <Pagination
            currentPage={page}
            totalPages={pageInfo.totalPages}
            hasNext={pageInfo.hasNext}
            hasPrevious={pageInfo.hasPrevious}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
}
