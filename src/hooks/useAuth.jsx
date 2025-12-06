import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;