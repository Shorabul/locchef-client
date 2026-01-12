import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const authInfo = {
        user,
        loading,
        registerUser,
        logInUser,
        signInGoogle,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// const [backendData, setBackendData] = useState(null);
// const [backendLoading, setBackendLoading] = useState(true);
// const axiosSecure = useAxiosSecure();

// backendData,
// backendLoading,
// const logOut = async () => {
//     setLoading(true);
//     await axiosSecure.post("/logout");
//     return signOut(auth);
// };

// useEffect(() => {
//     const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
//         setUser(currentUser);
//         setLoading(true);

//         if (!currentUser?.email) {
//             setBackendData(null);
//             setBackendLoading(false);
//             setLoading(false);
//             return;
//         }

//         try {
//             setBackendLoading(true);

//             const res = await axiosSecure.get(`/users/${currentUser.email}`);
//             const { role, status, chefId } = res.data;

//             setBackendData({ role, status, chefId });
//         } catch (error) {
//             console.error(error);
//             setBackendData(null);
//         } finally {
//             setBackendLoading(false);
//             setLoading(false);
//         }
//     });

//     return () => unSubscribe();
// }, [axiosSecure]);