import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../..//context/AuthContext';

interface ProtectedRouteAdminProps {
  children: ReactNode;
}

const ProtectedRouteAdmin: React.FC<ProtectedRouteAdminProps> = ({ children }) => {
  const { role } = useAuth();

  if (role !== 'admin') {
    return <Navigate to="/loginAdmin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteAdmin;
