import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkComplainStatus } from '../../services/api';
import { toast } from 'react-toastify';

const CheckStatus = () => {
  const [complainId, setComplainId] = useState('');
  const [complain, setComplain] = useState(null);
  const username = sessionStorage.getItem('employeeUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/employee/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await checkComplainStatus(parseInt(complainId), username);
      setComplain(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Complaint not found');
      setComplain(null);
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
    <div className="form-wrapper">
      <div className="form-card" style={{maxWidth:'540px'}}>
        <div className="form-icon secondary">&#128269;</div>
        <h2 className="form-title">Track Complaint</h2>
        <p className="form-subtitle">Enter your ticket ID to see current status</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ticket ID</label>
            <input type="number" placeholder="e.g. 10001" value={complainId}
              onChange={(e) => setComplainId(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms secondary full">Look Up</button>
        </form>

        {complain && (
          <div className="status-result">
            <div className="status-result-header">
              <span>Ticket #{complain.complainId}</span>
              {getStatusBadge(complain.status)}
            </div>
            <div className="status-detail-grid">
              <div className="detail-item"><span className="detail-label">Type</span><span className="detail-value">{complain.complainType}</span></div>
              <div className="detail-item"><span className="detail-label">Raised By</span><span className="detail-value">{complain.raisedBy}</span></div>
              <div className="detail-item"><span className="detail-label">Assigned To</span><span className="detail-value">{complain.solveBy || 'Not Assigned'}</span></div>
              <div className="detail-item full-width"><span className="detail-label">Details</span><span className="detail-value">{complain.complainDetails}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
