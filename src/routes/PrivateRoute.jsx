import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading, backendLoading } = useAuth();

    const location = useLocation();

    if (loading || backendLoading) {
        return null;
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login" />;
    }

    return children;
};

export default PrivateRoute;