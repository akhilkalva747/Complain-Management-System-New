import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

// Employee Pages
import EmployeeLogin from './pages/Employee/EmployeeLogin';
import EmployeeSignup from './pages/Employee/EmployeeSignup';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import RaiseComplain from './pages/Employee/RaiseComplain';
import CheckStatus from './pages/Employee/CheckStatus';
import ComplainHistory from './pages/Employee/ComplainHistory';
import ChangeEmployeePassword from './pages/Employee/ChangeEmployeePassword';

// Engineer Pages
import EngineerLogin from './pages/Engineer/EngineerLogin';
import EngineerDashboard from './pages/Engineer/EngineerDashboard';
import AssignedTasks from './pages/Engineer/AssignedTasks';
import AttemptedQueries from './pages/Engineer/AttemptedQueries';
import ChangeEngineerPassword from './pages/Engineer/ChangeEngineerPassword';

// HOD Pages
import HodLogin from './pages/HOD/HodLogin';
import HodDashboard from './pages/HOD/HodDashboard';
import ComplaintsList from './pages/HOD/ComplaintsList';
import EngineersList from './pages/HOD/EngineersList';
import RegisterEngineer from './pages/HOD/RegisterEngineer';
import AssignTask from './pages/HOD/AssignTask';
import AnalyticsDashboard from './pages/HOD/AnalyticsDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Employee Routes */}
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/signup" element={<EmployeeSignup />} />
        <Route path="/employee/dashboard" element={
          <ProtectedRoute sessionKey="employeeUsername" loginPath="/employee/login">
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
        <Route path="/employee/raise-complain" element={
          <ProtectedRoute sessionKey="employeeUsername" loginPath="/employee/login">
            <RaiseComplain />
          </ProtectedRoute>
        } />
        <Route path="/employee/check-status" element={
          <ProtectedRoute sessionKey="employeeUsername" loginPath="/employee/login">
            <CheckStatus />
          </ProtectedRoute>
        } />
        <Route path="/employee/history" element={
          <ProtectedRoute sessionKey="employeeUsername" loginPath="/employee/login">
            <ComplainHistory />
          </ProtectedRoute>
        } />
        <Route path="/employee/change-password" element={
          <ProtectedRoute sessionKey="employeeUsername" loginPath="/employee/login">
            <ChangeEmployeePassword />
          </ProtectedRoute>
        } />

        {/* Engineer Routes */}
        <Route path="/engineer/login" element={<EngineerLogin />} />
        <Route path="/engineer/dashboard" element={
          <ProtectedRoute sessionKey="engineerEmail" loginPath="/engineer/login">
            <EngineerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/engineer/assigned-tasks" element={
          <ProtectedRoute sessionKey="engineerEmail" loginPath="/engineer/login">
            <AssignedTasks />
          </ProtectedRoute>
        } />
        <Route path="/engineer/attempted-queries" element={
          <ProtectedRoute sessionKey="engineerEmail" loginPath="/engineer/login">
            <AttemptedQueries />
          </ProtectedRoute>
        } />
        <Route path="/engineer/change-password" element={
          <ProtectedRoute sessionKey="engineerEmail" loginPath="/engineer/login">
            <ChangeEngineerPassword />
          </ProtectedRoute>
        } />

        {/* HOD Routes */}
        <Route path="/hod/login" element={<HodLogin />} />
        <Route path="/hod/dashboard" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <HodDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hod/complaints" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <ComplaintsList />
          </ProtectedRoute>
        } />
        <Route path="/hod/engineers" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <EngineersList />
          </ProtectedRoute>
        } />
        <Route path="/hod/register-engineer" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <RegisterEngineer />
          </ProtectedRoute>
        } />
        <Route path="/hod/assign-task" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <AssignTask />
          </ProtectedRoute>
        } />
        <Route path="/hod/analytics" element={
          <ProtectedRoute sessionKey="hodUsername" loginPath="/hod/login">
            <AnalyticsDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
