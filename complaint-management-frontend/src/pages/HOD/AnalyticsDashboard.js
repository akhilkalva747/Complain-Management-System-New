import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalytics } from '../../services/api';
import { toast } from 'react-toastify';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/hod/login');
      return;
    }
    fetchAnalytics();
    // eslint-disable-next-line
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch (err) {
      toast.error('Failed to load analytics');
    }
  };

  if (!analytics) {
    return (
      <div className="page-container">
        <div className="page-header"><h2>Ticket Analytics</h2></div>
        <p style={{ color: '#64748b' }}>Loading analytics...</p>
      </div>
    );
  }

  const { totalComplaints, unassigned, inProgress, fixed, pending, engineerStats } = analytics;
  const engineerList = Object.entries(engineerStats || {});

  const statCards = [
    { label: 'Total Tickets', value: totalComplaints, color: '#4f46e5', bg: 'rgba(79,70,229,0.08)', icon: '📋' },
    { label: 'Unassigned', value: unassigned, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', icon: '📌' },
    { label: 'In Progress', value: inProgress, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', icon: '⚙️' },
    { label: 'Fixed', value: fixed, color: '#10b981', bg: 'rgba(16,185,129,0.08)', icon: '✅' },
    { label: 'Assigned / Pending', value: pending, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', icon: '⏳' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Ticket Analytics Dashboard</h2>
        <p>Overview of all complaint tickets and engineer performance.</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map((card) => (
          <div key={card.label} style={{
            background: card.bg,
            border: `1.5px solid ${card.color}30`,
            borderRadius: '12px',
            padding: '1.25rem 1rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem' }}>{card.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.25rem' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar overview */}
      {totalComplaints > 0 && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h5 style={{ marginBottom: '1rem', color: '#1e293b' }}>Overall Ticket Progress</h5>
          <div style={{ display: 'flex', height: '20px', borderRadius: '999px', overflow: 'hidden', background: '#f1f5f9' }}>
            <div style={{ width: `${(fixed / totalComplaints) * 100}%`, background: '#10b981' }} title={`Fixed: ${fixed}`} />
            <div style={{ width: `${(inProgress / totalComplaints) * 100}%`, background: '#3b82f6' }} title={`In Progress: ${inProgress}`} />
            <div style={{ width: `${(pending / totalComplaints) * 100}%`, background: '#f59e0b' }} title={`Pending: ${pending}`} />
            <div style={{ width: `${(unassigned / totalComplaints) * 100}%`, background: '#e2e8f0' }} title={`Unassigned: ${unassigned}`} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            {[
              { color: '#10b981', label: 'Fixed' },
              { color: '#3b82f6', label: 'In Progress' },
              { color: '#f59e0b', label: 'Assigned/Pending' },
              { color: '#e2e8f0', label: 'Unassigned', textColor: '#94a3b8' },
            ].map(l => (
              <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: l.textColor || '#475569' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: l.color, display: 'inline-block', border: '1px solid #e2e8f0' }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Per-Engineer Stats */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem' }}>
        <h5 style={{ marginBottom: '1rem', color: '#1e293b' }}>Engineer Performance</h5>
        {engineerList.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No engineers have been assigned tickets yet.</p>
        ) : (
          <div className="cms-table-wrapper">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>Engineer</th>
                  <th>Total Assigned</th>
                  <th>In Progress</th>
                  <th>Fixed</th>
                  <th>Pending (New)</th>
                  <th>Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {engineerList.map(([email, stats]) => {
                  const total = stats.total || 0;
                  const engFixed = stats['fixed'] || 0;
                  const engInProgress = stats['in progress'] || 0;
                  const engPending = stats['pending'] || 0;
                  const rate = total > 0 ? Math.round((engFixed / total) * 100) : 0;
                  return (
                    <tr key={email}>
                      <td><strong>{email}</strong></td>
                      <td>{total}</td>
                      <td>
                        {engInProgress > 0 ? (
                          <span className="cms-badge active">{engInProgress}</span>
                        ) : <span style={{ color: '#94a3b8' }}>0</span>}
                      </td>
                      <td>
                        {engFixed > 0 ? (
                          <span className="cms-badge resolved">{engFixed}</span>
                        ) : <span style={{ color: '#94a3b8' }}>0</span>}
                      </td>
                      <td>
                        {engPending > 0 ? (
                          <span className="cms-badge pending">{engPending}</span>
                        ) : <span style={{ color: '#94a3b8' }}>0</span>}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '999px', height: '8px', minWidth: '80px' }}>
                            <div style={{
                              width: `${rate}%`,
                              background: rate >= 70 ? '#10b981' : rate >= 40 ? '#f59e0b' : '#ef4444',
                              height: '8px',
                              borderRadius: '999px',
                              transition: 'width 0.3s'
                            }} />
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#475569', minWidth: '36px' }}>{rate}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
