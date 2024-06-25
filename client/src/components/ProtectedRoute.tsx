import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../util/auth';

const ProtectedRoute: React.FC = () => {
  const token = getAuthToken();

  if (!token || token === 'EXPIRED') {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
