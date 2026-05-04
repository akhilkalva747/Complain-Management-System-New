import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeLogin } from '../../services/api';
import { setToken } from '../../services/auth';
import { toast } from 'react-toastify';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await employeeLogin(username, parseInt(password));
      if (res.data.success) {
        const { token, username: user } = res.data.data;
        setToken(token);
        sessionStorage.setItem('employeeUsername', user || username);
        toast.success('Login Successful!');
        navigate('/employee/dashboard', { replace: true });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-icon green">&#128100;</div>
        <h2 className="form-title">Employee Login</h2>
        <p className="form-subtitle">Sign in to manage your complaints</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="text" placeholder="you@gmail.com" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms green full">Sign In</button>
        </form>
        <div className="form-footer">
          <span>Don't have an account? </span>
          <Link to="/employee/signup">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
