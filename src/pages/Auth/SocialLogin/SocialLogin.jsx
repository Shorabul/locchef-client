import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const isDark = document.documentElement.classList.contains("dark");
    const axiosSecure = useAxiosSecure();

    const onSubmit = async () => {
        setLoading(true);

        try {
            const result = await signInGoogle();
            const user = result.user;

            console.log(user);

            const userInfo = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            };

            await axiosSecure.post('/users', userInfo);

            Swal.fire({
                position: 'top',
                icon: "success",
                title: `Welcome back, ${user.displayName || 'User'}!`,
                text: "Login successful",
                timer: 1500,
                showConfirmButton: false,
                background: isDark ? "#262626" : "#ffffff",
                color: isDark ? "#ffffff" : "#262626",
            });

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });

        } catch (error) {
            console.log("Google login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={onSubmit}
            className='w-full py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 
                flex justify-center items-center rounded-lg cursor-pointer 
                active:scale-95 transition-all duration-150 gap-2'
        >
            <FcGoogle size={24} />
            {loading ? "Authenticating..." : "Google"}
        </button>
    );
};

export default SocialLogin;
