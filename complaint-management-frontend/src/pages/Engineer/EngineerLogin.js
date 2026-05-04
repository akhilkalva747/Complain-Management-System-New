import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { engineerLogin } from '../../services/api';
import { setToken } from '../../services/auth';
import { toast } from 'react-toastify';

const EngineerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await engineerLogin(username, parseInt(password));
      if (res.data.success) {
        const { token, email } = res.data.data;
        setToken(token);
        sessionStorage.setItem('engineerEmail', email || username);
        toast.success('Login Successful!');
        navigate('/engineer/dashboard', { replace: true });
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
        <div className="form-icon orange">&#128295;</div>
        <h2 className="form-title">Engineer Login</h2>
        <p className="form-subtitle">Access your assigned tasks and updates</p>
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
          <button type="submit" className="btn-cms orange full">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default EngineerLogin;
