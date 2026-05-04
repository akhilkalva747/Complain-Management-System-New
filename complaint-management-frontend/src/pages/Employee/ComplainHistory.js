import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComplainHistory } from '../../services/api';
import { toast } from 'react-toastify';

const ComplainHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const username = sessionStorage.getItem('employeeUsername');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/employee/login');
      return;
    }
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getComplainHistory(username);
      setComplaints(res.data);
    } catch (err) {
      toast.error('Failed to load complaint history');
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="cms-badge pending">Pending</span>;
    const s = status.toLowerCase();
    if (s.includes('solved') || s.includes('resolved')) return <span className="cms-badge resolved">{status}</span>;
    if (s.includes('progress')) return <span className="cms-badge active">{status}</span>;
    return <span className="cms-badge pending">{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Complaint History</h2>
        <p>All complaints you've raised and their current status.</p>
      </div>
      {complaints.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#128196;</div>
          <h3>No complaints yet</h3>
          <p>You haven't raised any complaints. Start by creating one.</p>
        </div>
      ) : (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Type</th>
                <th>Details</th>
                <th>Status</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.complainId}>
                  <td><strong>#{c.complainId}</strong></td>
                  <td>{c.complainType}</td>
                  <td>{c.complainDetails}</td>
                  <td>{getStatusBadge(c.status)}</td>
                  <td>{c.solveBy || <span className="text-muted">Unassigned</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComplainHistory;
