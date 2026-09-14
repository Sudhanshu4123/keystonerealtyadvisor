import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import StatCard from '../../components/admin/StatCard';
import Badge from '../../components/common/Badge';
import {
  Building2,
  Users,
  MessageSquare,
  CheckCircle,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Tag
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await adminService.getDashboardStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
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
      {/* Top Banner & Quick Action */}
      <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold-600)', fontWeight: 600 }}>
              Administration Console
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '0.25rem' }}>
              Keystone Executive Overview
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Real-time platform metrics, active property inventory, and client consultation pipeline.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/projects/new" className="btn btn-primary btn-sm">
              <PlusCircle size={16} />
              <span>Create New Project</span>
            </Link>
            <Link to="/admin/properties/new" className="btn btn-secondary btn-sm">
              <PlusCircle size={16} />
              <span>Create New Property</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Real Statistics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
        <StatCard
          title="Total Projects"
          value={stats?.totalProjects}
          subtitle={`${stats?.publishedProjects || 0} published, ${stats?.draftProjects || 0} drafts`}
          icon={Building2}
          color="var(--color-gold-600)"
          bgColor="var(--color-gold-50)"
        />

        <StatCard
          title="Total Properties"
          value={stats?.totalProperties}
          subtitle={`${stats?.availableProperties || 0} active, ${stats?.soldProperties || 0} sold`}
          icon={Tag}
          color="var(--color-info)"
          bgColor="var(--color-info-bg)"
        />

        <StatCard
          title="Total Enquiries"
          value={stats?.totalEnquiries}
          subtitle={`${stats?.pendingEnquiries || 0} pending response`}
          icon={MessageSquare}
          color="var(--color-warning)"
          bgColor="rgba(245, 158, 11, 0.1)"
        />

        <StatCard
          title="Registered Users"
          value={stats?.totalUsers}
          subtitle="Registered client portfolios"
          icon={Users}
          color="var(--color-success)"
          bgColor="var(--color-success-bg)"
        />
      </div>

      {/* Breakdown and Recent Inquiries */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }} className="admin-dashboard-subgrid">
        {/* Recent Enquiries */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--color-gold-500)" />
              <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Recent Client Enquiries</h2>
            </div>
            <Link to="/admin/enquiries" style={{ fontSize: '0.8125rem', color: 'var(--color-gold-600)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading recent data...</p>
          ) : !stats?.recentEnquiries || stats.recentEnquiries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-muted)' }}>
              No client enquiries recorded in the database.
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Client Name</th>
                    <th>Property / Topic</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentEnquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{enq.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enq.email}</div>
                      </td>
                      <td>
                        {enq.propertyTitle ? (
                          <span style={{ fontSize: '0.875rem' }}>{enq.propertyTitle}</span>
                        ) : (
                          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>General Advisory</span>
                        )}
                      </td>
                      <td>
                        <Badge variant={getStatusBadgeVariant(enq.status)}>
                          {enq.status?.replace('_', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Portfolio Status Summary Breakdown */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            Portfolio Status Overview
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Available for Market</span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-success)' }}>{stats?.availableProperties || 0}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Under Offer / Contract</span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-warning)' }}>{stats?.underOfferProperties || 0}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Sold Transactions</span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-dark-900)' }}>{stats?.soldProperties || 0}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Rented Properties</span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-info)' }}>{stats?.rentedProperties || 0}</strong>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.5rem', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/admin/projects" className="btn btn-primary btn-block btn-sm">
              Manage Real Estate Projects
            </Link>
            <Link to="/admin/properties" className="btn btn-outline btn-block btn-sm">
              Manage Property Inventory
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .admin-dashboard-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
