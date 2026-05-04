import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const employeeUser = sessionStorage.getItem('employeeUsername');
  const engineerUser = sessionStorage.getItem('engineerEmail');
  const hodUser = sessionStorage.getItem('hodUsername');

  const handleLogout = (type) => {
    if (type === 'employee') {
      sessionStorage.removeItem('employeeUsername');
      sessionStorage.removeItem('employeePassword');
      navigate('/employee/login');
    } else if (type === 'engineer') {
      sessionStorage.removeItem('engineerEmail');
      sessionStorage.removeItem('engineerPassword');
      navigate('/engineer/login');
    } else if (type === 'hod') {
      sessionStorage.removeItem('hodUsername');
      navigate('/hod/login');
    }
  };

  const isHodPage = location.pathname.startsWith('/hod');
  const isEngineerPage = location.pathname.startsWith('/engineer');
  const isEmployeePage = location.pathname.startsWith('/employee');

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg cms-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="brand-icon">&#9881;</span>
          CMS
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-1">
            {/* HOD Navigation */}
            {isHodPage && hodUser && (
              <>
                <li className="nav-item"><Link className={isActive('/hod/dashboard')} to="/hod/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className={isActive('/hod/complaints')} to="/hod/complaints">Complaints</Link></li>
                <li className="nav-item"><Link className={isActive('/hod/engineers')} to="/hod/engineers">Engineers</Link></li>
                <li className="nav-item"><Link className={isActive('/hod/register-engineer')} to="/hod/register-engineer">Register</Link></li>
                <li className="nav-item"><Link className={isActive('/hod/assign-task')} to="/hod/assign-task">Assign</Link></li>
                <li className="nav-item ms-2"><span className="nav-link nav-user">&#9679; {hodUser}</span></li>
                <li className="nav-item"><button className="btn-logout" onClick={() => handleLogout('hod')}>Logout</button></li>
              </>
            )}

            {/* Employee Navigation */}
            {isEmployeePage && employeeUser && (
              <>
                <li className="nav-item"><Link className={isActive('/employee/dashboard')} to="/employee/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className={isActive('/employee/raise-complain')} to="/employee/raise-complain">New Complaint</Link></li>
                <li className="nav-item"><Link className={isActive('/employee/check-status')} to="/employee/check-status">Track</Link></li>
                <li className="nav-item"><Link className={isActive('/employee/history')} to="/employee/history">History</Link></li>
                <li className="nav-item"><Link className={isActive('/employee/change-password')} to="/employee/change-password">Settings</Link></li>
                <li className="nav-item ms-2"><span className="nav-link nav-user">&#9679; {employeeUser}</span></li>
                <li className="nav-item"><button className="btn-logout" onClick={() => handleLogout('employee')}>Logout</button></li>
              </>
            )}

            {/* Engineer Navigation */}
            {isEngineerPage && engineerUser && (
              <>
                <li className="nav-item"><Link className={isActive('/engineer/dashboard')} to="/engineer/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className={isActive('/engineer/assigned-tasks')} to="/engineer/assigned-tasks">Tasks</Link></li>
                <li className="nav-item"><Link className={isActive('/engineer/attempted-queries')} to="/engineer/attempted-queries">Completed</Link></li>
                <li className="nav-item"><Link className={isActive('/engineer/change-password')} to="/engineer/change-password">Settings</Link></li>
                <li className="nav-item ms-2"><span className="nav-link nav-user">&#9679; {engineerUser}</span></li>
                <li className="nav-item"><button className="btn-logout" onClick={() => handleLogout('engineer')}>Logout</button></li>
              </>
            )}

            {/* Default Home Navigation */}
            {!hodUser && !employeeUser && !engineerUser && (
              <>
                <li className="nav-item"><Link className={isActive('/')} to="/">Home</Link></li>
                <li className="nav-item"><Link className={isActive('/hod/login')} to="/hod/login">HOD</Link></li>
                <li className="nav-item"><Link className={isActive('/employee/login')} to="/employee/login">Employee</Link></li>
                <li className="nav-item"><Link className={isActive('/engineer/login')} to="/engineer/login">Engineer</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
