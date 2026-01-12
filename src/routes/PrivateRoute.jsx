import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import PageLoader from '../pages/PageLoader/PageLoader';
import useAuthRole from '../hooks/useAuthRole';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { backendLoading } = useAuthRole();

    const location = useLocation();

    if (loading || backendLoading) {
        return <PageLoader></PageLoader>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;