import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const authUser = localStorage.getItem('authUser');
  const location = useLocation();

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={location.state} replace />
  );
};

export default ProtectedRoute;