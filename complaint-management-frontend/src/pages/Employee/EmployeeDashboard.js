import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const username = sessionStorage.getItem('employeeUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/employee/login');
    return null;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome back, {username}</h2>
        <p>Manage your complaints and track resolutions from your dashboard.</p>
      </div>
      <div className="dashboard-grid">
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(79,70,229,0.1)',color:'#4f46e5'}}>&#128221;</div>
          <h4>Raise Complaint</h4>
          <p>Submit a new complaint to the system for quick resolution.</p>
          <Link to="/employee/raise-complain" className="btn-cms primary">New Complaint</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(14,165,233,0.1)',color:'#0ea5e9'}}>&#128269;</div>
          <h4>Check Status</h4>
          <p>Look up any complaint by ticket ID and see its current status.</p>
          <Link to="/employee/check-status" className="btn-cms secondary">Track Status</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(16,185,129,0.1)',color:'#10b981'}}>&#128203;</div>
          <h4>Complaint History</h4>
          <p>View all previously raised complaints and their outcomes.</p>
          <Link to="/employee/history" className="btn-cms green">View History</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
