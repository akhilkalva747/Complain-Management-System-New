import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EngineerDashboard = () => {
  const email = sessionStorage.getItem('engineerEmail');
  const navigate = useNavigate();

  if (!email) {
    navigate('/engineer/login');
    return null;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Welcome back, {email}</h2>
        <p>View your assigned tasks, update statuses, and manage your account.</p>
      </div>
      <div className="dashboard-grid">
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(245,158,11,0.1)',color:'#f59e0b'}}>&#128203;</div>
          <h4>Assigned Tasks</h4>
          <p>View and update complaints assigned to you by the HOD.</p>
          <Link to="/engineer/assigned-tasks" className="btn-cms orange">View Tasks</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(16,185,129,0.1)',color:'#10b981'}}>&#9989;</div>
          <h4>Completed Queries</h4>
          <p>See all complaints you've already resolved or attempted.</p>
          <Link to="/engineer/attempted-queries" className="btn-cms green">View Completed</Link>
        </div>
        <div className="cms-card">
          <div className="card-icon" style={{background:'rgba(79,70,229,0.1)',color:'#4f46e5'}}>&#128274;</div>
          <h4>Change Password</h4>
          <p>Update your account password to keep it secure.</p>
          <Link to="/engineer/change-password" className="btn-cms primary">Change Password</Link>
        </div>
      </div>
    </div>
  );
};

export default EngineerDashboard;
