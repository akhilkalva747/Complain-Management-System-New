import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAssignedComplaints, updateComplainStatus } from '../../services/api';
import { toast } from 'react-toastify';

const AssignedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [statusInputs, setStatusInputs] = useState({});
  const email = sessionStorage.getItem('engineerEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate('/engineer/login');
      return;
    }
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getAssignedComplaints(email);
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to load assigned tasks');
    }
  };

  const handleStatusChange = (complainId, value) => {
    setStatusInputs({ ...statusInputs, [complainId]: value });
  };

  const handleUpdateStatus = async (complainId) => {
    const status = statusInputs[complainId];
    if (!status) {
      toast.error('Please select a status');
      return;
    }
    try {
      const res = await updateComplainStatus(complainId, status);
      if (res.data.success) {
        toast.success('Status updated successfully!');
        fetchTasks();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  // Split tasks: new/unstarted vs in-progress
  const newTasks = tasks.filter(t => !t.status);
  const inProgressTasks = tasks.filter(t => t.status && t.status.toLowerCase() === 'in progress');

  const renderTable = (list, label) => (
    list.length === 0 ? (
      <div className="empty-state" style={{padding:'1rem 0'}}>
        <p style={{color:'#888'}}>No {label.toLowerCase()} tasks.</p>
      </div>
    ) : (
      <div className="cms-table-wrapper">
        <table className="cms-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Details</th>
              <th>Raised By</th>
              <th>Update Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.complainId}>
                <td><strong>#{t.complainId}</strong></td>
                <td>{t.complainType}</td>
                <td>{t.complainDetails}</td>
                <td>{t.raisedBy}</td>
                <td>
                  <select
                    className="table-input"
                    value={statusInputs[t.complainId] || ''}
                    onChange={(e) => handleStatusChange(t.complainId, e.target.value)}
                    style={{padding:'0.35rem 0.5rem', borderRadius:'6px', border:'1px solid #cbd5e1', background:'#fff', minWidth:'140px'}}
                  >
                    <option value="">-- Select Status --</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Fixed">Fixed</option>
                  </select>
                </td>
                <td>
                  <button className="btn-cms green small"
                    onClick={() => handleUpdateStatus(t.complainId)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Assigned Tasks</h2>
        <p>Manage your assigned complaints. Mark as <strong>In Progress</strong> while working, then <strong>Fixed</strong> when done.</p>
      </div>

      {/* New / Unstarted Tasks */}
      <div style={{marginBottom:'2rem'}}>
        <h4 style={{marginBottom:'0.75rem', color:'#f59e0b', display:'flex', alignItems:'center', gap:'0.5rem'}}>
          <span>&#128203;</span> New Tasks
          <span style={{background:'#fef3c7', color:'#92400e', borderRadius:'999px', padding:'2px 10px', fontSize:'0.8rem', fontWeight:600}}>{newTasks.length}</span>
        </h4>
        {newTasks.length === 0 ? (
          <div style={{padding:'0.75rem 1rem', background:'#f8fafc', borderRadius:'8px', color:'#94a3b8'}}>No new tasks assigned.</div>
        ) : renderTable(newTasks, 'New')}
      </div>

      {/* In Progress Tasks */}
      <div>
        <h4 style={{marginBottom:'0.75rem', color:'#3b82f6', display:'flex', alignItems:'center', gap:'0.5rem'}}>
          <span>&#9881;</span> In Progress
          <span style={{background:'#dbeafe', color:'#1e40af', borderRadius:'999px', padding:'2px 10px', fontSize:'0.8rem', fontWeight:600}}>{inProgressTasks.length}</span>
        </h4>
        {inProgressTasks.length === 0 ? (
          <div style={{padding:'0.75rem 1rem', background:'#f8fafc', borderRadius:'8px', color:'#94a3b8'}}>No tasks currently in progress.</div>
        ) : renderTable(inProgressTasks, 'In Progress')}
      </div>
    </div>
  );
};

export default AssignedTasks;
