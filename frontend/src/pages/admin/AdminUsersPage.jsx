import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { useToast } from '../../hooks/useToast';
import Badge from '../../components/common/Badge';
import Pagination from '../../components/common/Pagination';
import { Users, Shield, UserCheck, UserX } from 'lucide-react';

export default function AdminUsersPage() {
  const { success, error } = useToast();

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getUsers(page, 15);
      if (res.success && res.data) {
        setUsers(res.data.content || []);
        setPageInfo({
          totalPages: res.data.totalPages,
          totalElements: res.data.totalElements,
          hasNext: res.data.hasNext,
          hasPrevious: res.data.hasPrevious,
        });
      }
    } catch (err) {
      error('Failed to load registered users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await adminService.updateUserStatus(userId, newStatus);
      success('User account status updated.');
      fetchUsers();
    } catch (err) {
      error('Failed to update user status.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Registered Client & Admin Accounts</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Manage registered portfolio users, advisory roles, and access controls
            </p>
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Total Registered: <strong>{pageInfo.totalElements}</strong> accounts
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              No user accounts found.
            </div>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact Info</th>
                  <th>Role</th>
                  <th>Saved / Enquiries</th>
                  <th>Registered Date</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID #{u.id}</div>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.875rem' }}>{u.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.phone || 'No phone'}</div>
                    </td>

                    <td>
                      <Badge variant={u.role === 'ROLE_ADMIN' ? 'gold' : 'dark'}>
                        {u.role?.replace('ROLE_', '')}
                      </Badge>
                    </td>

                    <td>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        <strong>{u.totalFavorites}</strong> Saved • <strong>{u.totalEnquiries}</strong> Enquiries
                      </div>
                    </td>

                    <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>

                    <td>
                      <select
                        className="form-control"
                        value={u.status}
                        onChange={(e) => handleStatusChange(u.id, e.target.value)}
                        disabled={u.role === 'ROLE_ADMIN'}
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', width: 'auto' }}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                        <option value="SUSPENDED">SUSPENDED</option>
                      </select>
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
    </div>
  );
}
