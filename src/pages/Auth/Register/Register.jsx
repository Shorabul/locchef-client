import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { LuUserRound, LuMail, LuLock, LuUpload, LuChevronRight, } from "react-icons/lu";
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


const Register = () => {
    const { registerUser, updateUserProfile, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, touchedFields }, watch, setError } = useForm({ mode: "onChange" });
    watch("photo");

    // Redirect if logged in
    useEffect(() => {
        if (user) navigate("/", { replace: true });
    }, [user]);

    // Firebase error parse
    const getFirebaseErrorMessage = (error) => {
        const map = {
            "auth/email-already-in-use": "This email is already registered.",
            "auth/invalid-email": "Invalid email address.",
            "auth/weak-password": "Your password is too weak.",
        };
        return map[error.code] || error.message;
    };

    // Upload image
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        const res = await axios.post(url, formData);
        return res.data.data.url;
    };

    // Save to backend
    const saveUserInDB = async (userInfo) => {
        await axiosSecure.post("/users", userInfo);
    };

    // Main submit handler
    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await registerUser(data.email, data.password);

            const photoURL = await uploadImage(data.photo[0]);

            await saveUserInDB({
                email: data.email,
                displayName: data.name,
                photoURL,
                status: 'active',
            });

            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });

            navigate(location?.state || '/');

        } catch (error) {
            const errMsg = getFirebaseErrorMessage(error);
            if (error.code?.includes("email")) {
                setError("email", { type: "firebase", message: errMsg });
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
                <h1 className="font-bold text-4xl">Create an account</h1>
                <div className="flex gap-2 text-gray-500">
                    <p>Already have an account?</p>
                    <Link to="/login" className="underline">Log in</Link>
                </div>
            </Motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Name */}
                <AnimatedInput
                    icon={LuUserRound}
                    error={errors.name}
                    touched={touchedFields.name}
                >
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                        className="w-full pl-10 py-3 rounded-lg border border-gray-300"
                    />
                </AnimatedInput>
                {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}

                {/* Photo */}
                <AnimatedInput
                    icon={LuUpload}
                    error={errors.photo}
                    touched={touchedFields.photo}
                >
                    <input
                        type="file"
                        {...register("photo", { required: "Photo is required" })}
                        className="w-full pl-10 py-3 rounded-lg border border-gray-300"
                    />
                </AnimatedInput>
                {errors.photo && <p className="text-red-600 text-xs">{errors.photo.message}</p>}

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
                            pattern: {
                                value: /^\S+@\S+\.\S+$/, // simple email regex
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full pl-10 py-3 border rounded-lg"
                    />
                </AnimatedInput>

                {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}

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
                            minLength: { value: 6, message: "Min 6 characters" }
                        })}
                        className="w-full pl-10 py-3 rounded-lg border border-gray-300"
                    />
                </AnimatedInput>
                {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}

                {/* Submit */}
                <Motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-yellow-400 font-semibold transition ${loading ? "opacity-60" : ""}`}
                >
                    Create an account
                    <LuChevronRight />
                </Motion.button>
            </form>
        </Motion.div>
    );
};

export default Register;
