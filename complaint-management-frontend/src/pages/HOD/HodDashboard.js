import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HodDashboard = () => {
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/hod/login');
    return null;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome back, {username}</h2>
        <p>Manage complaints, oversee engineers, and keep your department running smoothly.</p>
      </div>
      <div className="dashboard-grid">
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(79,70,229,0.1)',color:'#4f46e5'}}>&#128196;</div>
          <h4>All Complaints</h4>
          <p>View every complaint raised across the department.</p>
          <Link to="/hod/complaints" className="btn-cms primary">View Complaints</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(16,185,129,0.1)',color:'#10b981'}}>&#128101;</div>
          <h4>Engineers</h4>
          <p>View your engineering team and manage members.</p>
          <Link to="/hod/engineers" className="btn-cms green">View Engineers</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(245,158,11,0.1)',color:'#f59e0b'}}>&#10133;</div>
          <h4>Register Engineer</h4>
          <p>Add a new engineer to your department's team.</p>
          <Link to="/hod/register-engineer" className="btn-cms orange">Register</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(14,165,233,0.1)',color:'#0ea5e9'}}>&#128279;</div>
          <h4>Assign Task</h4>
          <p>Route a complaint to the right engineer for resolution.</p>
          <Link to="/hod/assign-task" className="btn-cms secondary">Assign Task</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(139,92,246,0.1)',color:'#7c3aed'}}>&#128202;</div>
          <h4>Ticket Analytics</h4>
          <p>View engineer performance and ticket resolution statistics.</p>
          <Link to="/hod/analytics" className="btn-cms" style={{background:'#7c3aed',color:'#fff'}}>View Analytics</Link>
        </div>
      </div>
    </div>
  );
};

export default HodDashboard;
