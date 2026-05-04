import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAttemptedComplaints } from '../../services/api';
import { toast } from 'react-toastify';

const AttemptedQueries = () => {
  const [complaints, setComplaints] = useState([]);
  const email = sessionStorage.getItem('engineerEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/engineer/login');
      return;
    }
    fetchComplaints();
    // eslint-disable-next-line
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await getAttemptedComplaints(email);
      setComplaints(res.data);
    } catch (err) {
      toast.error('Failed to load attempted queries');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Completed Queries</h2>
        <p>A history of all complaints you have resolved or attempted.</p>
      </div>
      {complaints.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#9989;</div>
          <h3>No completed queries</h3>
          <p>You haven't resolved any complaints yet.</p>
        </div>
      ) : (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Details</th>
                <th>Raised By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.complainId}>
                  <td><strong>#{c.complainId}</strong></td>
                  <td>{c.complainType}</td>
                  <td>{c.complainDetails}</td>
                  <td>{c.raisedBy}</td>
                  <td><span className="cms-badge resolved">{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttemptedQueries;
