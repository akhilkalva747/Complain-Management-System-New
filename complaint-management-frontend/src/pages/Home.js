import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Streamline Your Complaint Management</h1>
          <p className="hero-subtitle">
            A modern platform to raise, track, and resolve complaints efficiently.
            Built for organizations that value fast resolution and transparency.
          </p>
        </div>
      </section>

      {/* Role Cards */}
      <div className="role-cards">
        {/* HOD Card */}
        <div className="role-card">
          <div className="role-header">
            <div className="role-icon" style={{background:'rgba(79,70,229,0.1)', color:'#4f46e5'}}>&#128188;</div>
            <div>
              <h3>Head of Department</h3>
            </div>
          </div>
          <p className="role-desc">Oversee the entire complaint lifecycle. Manage engineers, assign tasks, and monitor resolution progress across your department.</p>
          <ul className="role-features">
            <li><span className="check">&#10003;</span> View all complaints</li>
            <li><span className="check">&#10003;</span> Manage engineer team</li>
            <li><span className="check">&#10003;</span> Assign tasks to engineers</li>
          </ul>
          <div className="role-actions">
            <Link to="/hod/login" className="btn-cms primary">HOD Login</Link>
          </div>
        </div>

        {/* Employee Card */}
        <div className="role-card">
          <div className="role-header">
            <div className="role-icon" style={{background:'rgba(16,185,129,0.1)', color:'#10b981'}}>&#128100;</div>
            <div>
              <h3>Employee</h3>
            </div>
          </div>
          <p className="role-desc">Submit complaints in just a few clicks. Track status with your unique ticket ID and view your full complaint history anytime.</p>
          <ul className="role-features">
            <li><span className="check">&#10003;</span> Raise new complaints</li>
            <li><span className="check">&#10003;</span> Track complaint status</li>
            <li><span className="check">&#10003;</span> View complaint history</li>
          </ul>
          <div className="role-actions">
            <Link to="/employee/login" className="btn-cms green">Login</Link>
            <Link to="/employee/signup" className="btn-cms outline-green">Sign Up</Link>
          </div>
        </div>

        {/* Engineer Card */}
        <div className="role-card">
          <div className="role-header">
            <div className="role-icon" style={{background:'rgba(245,158,11,0.1)', color:'#f59e0b'}}>&#128295;</div>
            <div>
              <h3>Engineer</h3>
            </div>
          </div>
          <p className="role-desc">Access your assigned tasks, update complaint status in real-time, and keep a record of all resolved issues.</p>
          <ul className="role-features">
            <li><span className="check">&#10003;</span> View assigned tasks</li>
            <li><span className="check">&#10003;</span> Update complaint status</li>
            <li><span className="check">&#10003;</span> Track completed work</li>
          </ul>
          <div className="role-actions">
            <Link to="/engineer/login" className="btn-cms orange">Engineer Login</Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stats-grid">
          <div className="stat-item">
            <h4>3</h4>
            <p>User Roles</p>
          </div>
          <div className="stat-item">
            <h4>5</h4>
            <p>Complaint Types</p>
          </div>
          <div className="stat-item">
            <h4>24/7</h4>
            <p>Availability</p>
          </div>
          <div className="stat-item">
            <h4>100%</h4>
            <p>Transparent</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
