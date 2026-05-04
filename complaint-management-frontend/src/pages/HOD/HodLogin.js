import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hodLogin } from '../../services/api';
import { setToken } from '../../services/auth';
import { toast } from 'react-toastify';

const HodLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await hodLogin(username, parseInt(password));
      if (res.data.success) {
        const { token, username: user } = res.data.data;
        setToken(token);
        sessionStorage.setItem('hodUsername', user || username);
        toast.success('Login Successful!');
        navigate('/hod/dashboard', { replace: true });
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
        <div className="form-icon primary">&#128188;</div>
        <h2 className="form-title">HOD Login</h2>
        <p className="form-subtitle">Sign in to manage your department</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms primary full">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default HodLogin;
