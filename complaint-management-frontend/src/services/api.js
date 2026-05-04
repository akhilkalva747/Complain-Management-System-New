import axios from 'axios';
import { getToken, removeToken } from './auth';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear session and redirect to home
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      sessionStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// ==================== Employee APIs ====================

export const employeeLogin = (username, password) =>
  api.post('/employee/login', { username, password });

export const employeeSignup = (username, password) =>
  api.post('/employee/signup', { username, password });

export const raiseComplain = (complainType, complainDetails, username) =>
  api.post('/employee/raise-complain', { complainType, complainDetails, username });

export const checkComplainStatus = (complainId, username) =>
  api.get('/employee/check-status', { params: { complainId, username } });

export const getComplainHistory = (username) =>
  api.get(`/employee/complain-history/${username}`);

export const changeEmployeePassword = (username, currentPassword, newPassword) =>
  api.put('/employee/change-password', { username, currentPassword, newPassword });

// ==================== Engineer APIs ====================

export const engineerLogin = (username, password) =>
  api.post('/engineer/login', { username, password });

export const getAssignedComplaints = (email) =>
  api.get(`/engineer/assigned-complaints/${email}`);

export const getAttemptedComplaints = (email) =>
  api.get(`/engineer/attempted-complaints/${email}`);

export const updateComplainStatus = (complainId, status) =>
  api.put('/engineer/update-status', { complainId, status });

export const changeEngineerPassword = (username, currentPassword, newPassword) =>
  api.put('/engineer/change-password', { username, currentPassword, newPassword });

// ==================== HOD APIs ====================

export const hodLogin = (username, password) =>
  api.post('/hod/login', { username, password });

export const registerEngineer = (email, password, type) =>
  api.post('/hod/register-engineer', { email, password, type });

export const getAllEngineers = () =>
  api.get('/hod/engineers');

export const deleteEngineer = (email) =>
  api.delete(`/hod/engineer/${email}`);

export const getAllComplaints = () =>
  api.get('/hod/complaints');

export const assignComplaint = (engineerEmail, complainId) =>
  api.post('/hod/assign-complaint', { engineerEmail, complainId });

export const getAnalytics = () =>
  api.get('/hod/analytics');

export default api;
