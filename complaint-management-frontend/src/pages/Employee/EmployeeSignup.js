import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeSignup } from '../../services/api';
import { toast } from 'react-toastify';

const EmployeeSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await employeeSignup(username, parseInt(password));
      if (res.data.success) {
        toast.success('Sign up Successful! Please login.');
        navigate('/employee/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-icon green">&#9997;</div>
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Register as a new employee</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@gmail.com" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password (numeric)</label>
            <input type="password" placeholder="Enter a numeric password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms green full">Create Account</button>
        </form>
        <div className="form-footer">
          <span>Already have an account? </span>
          <Link to="/employee/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSignup;
