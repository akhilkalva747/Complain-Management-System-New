import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEngineer } from '../../services/api';
import { toast } from 'react-toastify';

const RegisterEngineer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  if (!username) {
    navigate('/hod/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerEngineer(email, parseInt(password), type);
      if (res.data.success) {
        toast.success('Engineer registered successfully!');
        setEmail('');
        setPassword('');
        setType('');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card" style={{maxWidth:'520px'}}>
        <div className="form-icon primary">&#10133;</div>
        <h2 className="form-title">Register Engineer</h2>
        <p className="form-subtitle">Add a new engineer to the department</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="engineer@gmail.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password (numeric)</label>
            <input type="password" placeholder="Enter a numeric password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <select value={type}
              onChange={(e) => setType(e.target.value)} required>
              <option value="">Select specialization</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="SOFTWARE">Software</option>
              <option value="HARDWARE">Hardware</option>
            </select>
          </div>
          <button type="submit" className="btn-cms primary full">Register Engineer</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEngineer;
