import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from "react-router";
const UserRoute = ({ children }) => {
    const { backendData, loading, backendLoading } = useAuth();

    if (loading || backendLoading) {
        return null;
    }

    if (backendData?.role !== "user") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default UserRoute;