import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { raiseComplain } from '../../services/api';
import { toast } from 'react-toastify';

const RaiseComplain = () => {
  const [complainType, setComplainType] = useState('');
  const [complainDetails, setComplainDetails] = useState('');
  const [ticketId, setTicketId] = useState(null);
  const username = sessionStorage.getItem('employeeUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/employee/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await raiseComplain(complainType, complainDetails, username);
      if (res.data.success) {
        setTicketId(res.data.data);
        toast.success('Complaint registered successfully!');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to raise complaint');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card" style={{maxWidth:'520px'}}>
        <div className="form-icon primary">&#128221;</div>
        <h2 className="form-title">Raise a Complaint</h2>
        <p className="form-subtitle">Describe your issue and we'll route it to the right team</p>

        {ticketId && (
          <div className="ticket-success">
            <span className="ticket-label">Ticket Created</span>
            <span className="ticket-id">#{ticketId}</span>
            <span className="ticket-hint">Save this ID to track your complaint</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Complaint Type</label>
            <select value={complainType}
              onChange={(e) => setComplainType(e.target.value)} required>
              <option value="">Select a category</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="SOFTWARE">Software</option>
              <option value="HARDWARE">Hardware</option>
            </select>
          </div>
          <div className="form-group">
            <label>Complaint Details</label>
            <textarea rows="4" placeholder="Describe the issue in detail..." value={complainDetails}
              onChange={(e) => setComplainDetails(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms primary full">Submit Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplain;
