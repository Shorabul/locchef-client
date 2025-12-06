import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { LuMail, LuLock, LuChevronRight } from "react-icons/lu";
import { motion as Motion } from "framer-motion";

// Reusable animated input wrapper
const AnimatedInput = ({ icon: Icon, error, touched, children }) => (
    <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative"
    >
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon
                className={`w-5 h-5 ${error ? "text-red-500"
                    : touched ? "text-teal-500"
                        : "text-gray-400"
                    }`}
            />
        </div>

        {children}
    </Motion.div>
);

const Login = () => {
    const { logInUser, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, touchedFields }, setError } = useForm({ mode: "onChange" });

    // Redirect if logged in
    useEffect(() => {
        if (user) navigate("/", { replace: true });
    }, [user]);

    // Firebase error parser
    const getFirebaseLoginErrorMessage = (error) => {
        const map = {
            "auth/invalid-email": "The email address is not valid.",
            "auth/user-disabled": "This user account has been disabled.",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password.",
            "auth/too-many-requests": "Too many login attempts. Please try again later.",
        };
        return map[error.code] || error.message || "An unexpected error occurred.";
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await logInUser(data.email, data.password);
            navigate(location?.state || '/');
        } catch (error) {
            const errMsg = getFirebaseLoginErrorMessage(error);
            if (error.code?.includes("email")) {
                setError("email", { type: "firebase", message: errMsg });
            } else if (error.code === "auth/wrong-password") {
                setError("password", { type: "firebase", message: errMsg });
            } else {
                alert(errMsg);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-sm mx-auto my-10 space-y-5"
        >
            {/* Header */}
            <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <h1 className="font-bold text-4xl">Welcome back</h1>
                <div className="flex gap-2 text-gray-500">
                    <p>Don’t have an account?</p>
                    <Link to="/register" className="underline">Create an account</Link>
                </div>
            </Motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Email */}
                <AnimatedInput
                    icon={LuMail}
                    error={errors.email}
                    touched={touchedFields.email}
                >
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
                        })}
                        className="w-full pl-10 py-3 border rounded-lg"
                    />
                </AnimatedInput>
                {errors.email && <Motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 text-xs mt-1"
                >
                    {errors.email.message}
                </Motion.p>}

                {/* Password */}
                <AnimatedInput
                    icon={LuLock}
                    error={errors.password}
                    touched={touchedFields.password}
                >
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                        })}
                        className="w-full pl-10 py-3 border rounded-lg"
                    />
                </AnimatedInput>
                {errors.password && <Motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 text-xs mt-1"
                >
                    {errors.password.message}
                </Motion.p>}

                {/* Submit */}
                <Motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-yellow-400 font-semibold transition ${loading ? "opacity-60" : ""}`}
                >
                    Login
                    <LuChevronRight />
                </Motion.button>
            </form>
        </Motion.div>
    );
};

export default Login;
