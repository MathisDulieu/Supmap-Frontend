import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
    requireAuth: boolean;
    redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
                                                       requireAuth = false,
                                                       redirectPath = '/login'
                                                   }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated &&
        (location.pathname === '/login' ||
            location.pathname === '/register' ||
            location.pathname === '/forgot-password' ||
            location.pathname.startsWith('/reset-password/') ||
            location.pathname.startsWith('/email-validation/') ||
            location.pathname === '/register/email')) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;