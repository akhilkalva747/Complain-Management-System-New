import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeEmployeePassword } from '../../services/api';
import { toast } from 'react-toastify';

const ChangeEmployeePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const username = sessionStorage.getItem('employeeUsername');
  const currentPassword = parseInt(sessionStorage.getItem('employeePassword'));
  const navigate = useNavigate();

  if (!username) {
    navigate('/employee/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await changeEmployeePassword(username, currentPassword, parseInt(newPassword));
      if (res.data.success) {
        sessionStorage.setItem('employeePassword', newPassword);
        toast.success('Password updated successfully!');
        setNewPassword('');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-icon primary">&#128274;</div>
        <h2 className="form-title">Change Password</h2>
        <p className="form-subtitle">Enter a new numeric password</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new numeric password" value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cms primary full">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmployeePassword;
