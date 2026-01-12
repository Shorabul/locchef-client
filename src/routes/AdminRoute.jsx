import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from "react-router";
import PageLoader from '../pages/PageLoader/PageLoader';
import useAuthRole from '../hooks/useAuthRole';

const AdminRoute = ({ children }) => {
    const { loading, } = useAuth();
    const { backendData, backendLoading } = useAuthRole();

    if (loading || backendLoading) {
        return <PageLoader></PageLoader>;
    }

    if (backendData?.role !== "admin") {
        return <Navigate to="/" replace />;

    };
    return children;
};

export default AdminRoute;