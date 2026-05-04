import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignComplaint } from '../../services/api';
import { toast } from 'react-toastify';

const AssignTask = () => {
  const [engineerEmail, setEngineerEmail] = useState('');
  const [complainId, setComplainId] = useState('');
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/hod/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await assignComplaint(engineerEmail, parseInt(complainId));
      if (res.data.success) {
        toast.success('Complaint assigned successfully!');
        setEngineerEmail('');
        setComplainId('');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to assign complaint');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card" style={{maxWidth:'520px'}}>
        <div className="form-icon secondary">&#128279;</div>
        <h2 className="form-title">Assign Task</h2>
        <p className="form-subtitle">Route a complaint to an engineer for resolution</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Engineer Email</label>
            <input type="email" placeholder="engineer@gmail.com" value={engineerEmail}
              onChange={(e) => setEngineerEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Complaint ID</label>
            <input type="number" placeholder="e.g. 10001" value={complainId}
              onChange={(e) => setComplainId(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms secondary full">Assign Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
