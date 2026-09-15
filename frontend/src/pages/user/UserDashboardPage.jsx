import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { favoriteService } from '../../services/favoriteService';
import { enquiryService } from '../../services/enquiryService';
import PropertyGrid from '../../components/property/PropertyGrid';
import Badge from '../../components/common/Badge';
import SEO from '../../components/common/SEO';
import { Heart, MessageSquare, ArrowRight, UserCheck, Clock } from 'lucide-react';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [favRes, enqRes] = await Promise.all([
          favoriteService.getUserFavorites(0, 3),
          enquiryService.getUserEnquiries(0, 5),
        ]);

        if (favRes.success && favRes.data) {
          setFavorites(favRes.data.content || []);
        }
        if (enqRes.success && enqRes.data) {
          setEnquiries(enqRes.data.content || []);
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const getStatusBadgeVariant = (status) => {
    if (status === 'PENDING') return 'warning';
    if (status === 'CONTACTED') return 'info';
    if (status === 'IN_PROGRESS') return 'gold';
    if (status === 'RESOLVED') return 'success';
    return 'dark';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <SEO title="Client Portfolio Dashboard" noIndex={true} />
      {/* Welcome Header */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-600)', fontWeight: 600 }}>
              Client Portfolio Portal
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem', color: 'var(--text-primary)' }}>
              Welcome, {user?.name}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage your saved property shortlist and monitor real-time advisory responses.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/properties" className="btn btn-primary btn-sm">
              Explore Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Favorites Section */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="var(--color-gold-500)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Saved Properties Shortlist</h2>
          </div>
          <Link to="/dashboard/favorites" style={{ fontSize: '0.875rem', color: 'var(--color-gold-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <PropertyGrid
          properties={favorites}
          loading={loading}
          emptyTitle="No saved properties in your shortlist."
          emptyDescription="Browse our collection and click the heart icon on any property to save it here for comparison."
          columns={3}
        />
      </div>

      {/* Recent Enquiries Section */}
      <div className="card" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={20} color="var(--color-gold-500)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Advisory Communications</h2>
          </div>
          <Link to="/dashboard/enquiries" style={{ fontSize: '0.875rem', color: 'var(--color-gold-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '0.9375rem', marginBottom: '0.75rem' }}>You haven't submitted any advisory enquiries yet.</p>
            <Link to="/contact" className="btn btn-outline btn-sm">
              Submit an Enquiry
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Property / Subject</th>
                  <th>Status</th>
                  <th>Message Preview</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {enq.propertyTitle ? (
                        <Link to={`/properties/${enq.propertyId}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {enq.propertyTitle}
                        </Link>
                      ) : (
                        <span style={{ fontWeight: 500 }}>General Advisory Consultation</span>
                      )}
                    </td>
                    <td>
                      <Badge variant={getStatusBadgeVariant(enq.status)}>
                        {enq.status?.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {enq.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
