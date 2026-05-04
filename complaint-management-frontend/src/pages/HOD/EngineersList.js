import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEngineers, deleteEngineer } from '../../services/api';
import { toast } from 'react-toastify';

const EngineersList = () => {
  const [engineers, setEngineers] = useState([]);
  const username = sessionStorage.getItem('hodUsername');
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/hod/login');
      return;
    }
    fetchEngineers();
    // eslint-disable-next-line
  }, []);

  const fetchEngineers = async () => {
    try {
      const res = await getAllEngineers();
      setEngineers(res.data);
    } catch (err) {
      toast.error('Failed to load engineers');
    }
  };

  const handleDelete = async (email) => {
    if (window.confirm(`Are you sure you want to remove ${email}?`)) {
      try {
        const res = await deleteEngineer(email);
        if (res.data.success) {
          toast.success('Engineer removed successfully');
          fetchEngineers();
        }
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete engineer');
      }
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Engineers List</h2>
        <p>All registered engineers in your department.</p>
      </div>
      {engineers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">&#128101;</div>
          <h3>No engineers registered</h3>
          <p>Register an engineer to get started.</p>
        </div>
      ) : (
        <div className="cms-table-wrapper">
          <table className="cms-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {engineers.map((e) => (
                <tr key={e.email}>
                  <td>{e.email}</td>
                  <td><span className="cms-badge active">{e.type}</span></td>
                  <td>
                    <button className="btn-cms danger small"
                      onClick={() => handleDelete(e.email)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EngineersList;
