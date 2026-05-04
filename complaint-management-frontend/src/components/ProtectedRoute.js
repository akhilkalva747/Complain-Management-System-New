import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

/**
 * ProtectedRoute: checks for a valid JWT token AND a role-specific session key.
 * If either is missing, redirects to the given loginPath.
 */
const ProtectedRoute = ({ children, sessionKey, loginPath }) => {
  const tokenValid = isAuthenticated();
  const sessionValid = sessionKey ? !!sessionStorage.getItem(sessionKey) : true;

  if (!tokenValid || !sessionValid) {
    return <Navigate to={loginPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
