import React, { ReactNode } from 'react';
import useAuthProtection from '../hooks/useAuthProtection';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    useAuthProtection();
    return <>{children}</>;
};

export default ProtectedRoute;
