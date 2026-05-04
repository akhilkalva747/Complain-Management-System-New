import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllComplaints } from '../../services/api';
import { toast } from 'react-toastify';

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/hod/login');
      return;
    }
    fetchComplaints();
    // eslint-disable-next-line
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data);
    } catch (err) {
      toast.error('Failed to load complaints');
    }
  };

  const getStatusBadge = (status) => {
    if (!status) return <span className="cms-badge pending">Pending</span>;
    const s = status.toLowerCase();
    if (s.includes('solved') || s.includes('resolved') || s.includes('fixed')) return <span className="cms-badge resolved">{status}</span>;
    if (s.includes('progress')) return <span className="cms-badge active">{status}</span>;
    return <span className="cms-badge pending">{status}</span>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>All Complaints</h2>
        <p>Complete overview of every complaint across your department.</p>
      </div>
      {complaints.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#128196;</div>
          <h3>No complaints found</h3>
          <p>No complaints have been raised yet in the system.</p>
        </div>
      ) : (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Details</th>
                <th>Status</th>
                <th>Raised By</th>
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
                  <td>{c.raisedBy}</td>
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

export default ComplaintsList;
