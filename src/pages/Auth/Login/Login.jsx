import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { LuMail, LuLock, LuChevronRight } from "react-icons/lu";
import { motion as Motion } from "framer-motion";
import AnimatedInput from '../AnimatedInput';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import { usePageTitle } from '../../../hooks/usePageTitle';
import Logo from '../../../components/Logo/Logo';
import Container from '../../../components/Shared/Container';

// Define demo credentials outside the component
const demoAccounts = {
    user: { email: "liam@smith.com", password: "La@12345" },
    chef: { email: "marco@bianchi.com", password: "Mb@12345" },
    admin: { email: "alex@rivers.com", password: "Ar@12345" },
};

const Login = () => {
    usePageTitle("Login");
    const isDark = document.documentElement.classList.contains("dark");
    const { logInUser, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [passShow, setPassShow] = useState(false);

    const { register, handleSubmit, formState: { errors, touchedFields }, setError, setValue } = useForm({ mode: "onChange" });

    useEffect(() => {
        if (user) navigate("/", { replace: true });
    }, [user, navigate]);

    const getFirebaseLoginErrorMessage = (error) => {
        const map = {
            "auth/invalid-email": "The email address is not valid.",
            "auth/user-disabled": "This user account has been disabled.",
            "auth/user-not-found": "No account found with this email.",
            "auth/wrong-password": "Incorrect password.",
            "auth/too-many-requests": "Too many login attempts.",
            "auth/invalid-credential": "Email or password is incorrect.",
        };
        return map[error.code] || "An unexpected error occurred.";
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const result = await logInUser(data.email, data.password);

            Swal.fire({
                position: 'top',
                icon: "success",
                title: `Welcome back, ${result.user.displayName || 'User'}!`,
                text: "Login successful",
                timer: 1500,
                showConfirmButton: false,
                background: isDark ? "#262626" : "#ffffff",
                color: isDark ? "#ffffff" : "#262626",
            });

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (error) {
            const errMsg = getFirebaseLoginErrorMessage(error);
            setError("email", { type: "firebase", message: errMsg });
            setError("password", { type: "firebase", message: errMsg });
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async (role) => {
        const { email, password } = demoAccounts[role];
        setValue("email", email, { shouldValidate: true });
        setValue("password", password, { shouldValidate: true });

        // Small delay so users see the auto-fill effect
        setTimeout(() => {
            handleSubmit(onSubmit)();
        }, 600);
    };

    return (
        <Container>
            <nav className='w-full py-3'>
                <Logo className='block' />
            </nav>
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md mx-auto pt-10 pb-20 space-y-5 min-h-screen"
            >
                <Motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                >
                    <h1 className="font-bold text-3xl md:text-4xl">Welcome back</h1>
                    <div className="flex gap-2 text-neutral-600 dark:text-neutral-400">
                        <p>Don’t have an account?</p>
                        <Link to="/register" className="underline text-black dark:text-white font-medium">Create one</Link>
                    </div>
                </Motion.div>

                {/* Demo Selection */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-3 text-center">Quick Demo Access</p>
                    <div className="grid grid-cols-3 gap-2">
                        {['user', 'chef', 'admin'].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => handleDemoLogin(role)}
                                className="py-2.5 text-xs font-bold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-[#ffde59] hover:text-black hover:border-[#ffde59] transition-all capitalize active:scale-95"
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-200 dark:border-neutral-800"></span></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-white dark:bg-[#121212] px-4 text-neutral-400">Or use email</span></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-1">
                        <AnimatedInput icon={LuMail} error={errors.email} touched={touchedFields.email}>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                                })}
                                className="w-full pl-11 pr-4 py-3.5 border rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 outline-none focus:border-[#ffde59] transition-all"
                            />
                        </AnimatedInput>
                        {errors.email && <p className="text-red-500 text-xs pl-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <AnimatedInput icon={LuLock} error={errors.password} touched={touchedFields.password}>
                            <input
                                type={passShow ? 'text' : 'password'}
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                })}
                                className="w-full pl-11 pr-12 py-3.5 border rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 outline-none focus:border-[#ffde59] transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setPassShow(!passShow)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
                            >
                                {passShow ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </AnimatedInput>
                        {errors.password && <p className="text-red-500 text-xs pl-1">{errors.password.message}</p>}
                    </div>

                    <Motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-[#ffde59] text-black font-bold hover:shadow-lg hover:shadow-yellow-500/20 transition-all ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                        {!loading && <LuChevronRight size={18} />}
                    </Motion.button>
                </form>
            </Motion.div>
        </Container>
    );
};

export default Login;

// import React, { useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
// import { Link, useLocation, useNavigate } from 'react-router';
// import { useForm } from 'react-hook-form';
// import { LuMail, LuLock, LuChevronRight } from "react-icons/lu";
// import { motion as Motion } from "framer-motion";
// import AnimatedInput from '../AnimatedInput';
// import Swal from 'sweetalert2';
// // import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { Eye, EyeOff } from 'lucide-react';
// import { usePageTitle } from '../../../hooks/usePageTitle';
// import Logo from '../../../components/Logo/Logo';
// import Container from '../../../components/Shared/Container';

// const Login = () => {
//     usePageTitle("Login");
//     const isDark = document.documentElement.classList.contains("dark");
//     const { logInUser, user } = useAuth();
//     // const axiosSecure = useAxiosSecure();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [passShow, setPassShow] = useState(false);

//     const { register, handleSubmit, formState: { errors, touchedFields }, setError } = useForm({ mode: "onChange" });

//     // Redirect if logged in
//     useEffect(() => {
//         if (user) navigate("/", { replace: true });
//     }, [user]);

//     // Firebase error parser
//     const getFirebaseLoginErrorMessage = (error) => {
//         const map = {
//             "auth/invalid-email": "The email address is not valid.",
//             "auth/user-disabled": "This user account has been disabled.",
//             "auth/user-not-found": "No account found with this email.",
//             "auth/wrong-password": "Incorrect password.",
//             "auth/too-many-requests": "Too many login attempts. Please try again later.",
//             "auth/invalid-credential": "Email or password is incorrect.",
//             "auth/invalid-credentials": "Email or password is incorrect.",
//         };
//         return map[error.code] || error.message || "An unexpected error occurred.";
//     };


//     // login handler
//     const onSubmit = async (data) => {
//         setLoading(true);
//         try {

//             const result = await logInUser(data.email, data.password);

//             // await axiosSecure.post("/jwt", { email: data.email });

//             Swal.fire({
//                 position: 'top',
//                 icon: "success",
//                 title: `Welcome back ${result.user.displayName}`,
//                 text: "You have successfully logged in",
//                 timer: 1500,
//                 showConfirmButton: false,
//                 background: isDark ? "#262626" : "#ffffff",
//                 color: isDark ? "#ffffff" : "#262626",
//             });


//             // Navigate after successful login
//             // navigate(location?.state || '/');
//             const from = location.state?.from?.pathname || "/";
//             navigate(from, { replace: true });
//         } catch (error) {
//             const errMsg = getFirebaseLoginErrorMessage(error);

//             if (error.code?.includes("email") || error.code?.includes('credential')) {
//                 setError("email", { type: "firebase", message: errMsg });
//             } else if (error.code === "auth/wrong-password" || error.code?.includes('credential')) {
//                 setError("password", { type: "firebase", message: errMsg });
//             } else {
//                 console.log(error);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <Container>
//             <nav className='w-full py-3'>
//                 <Logo className='block' />
//             </nav>
//             <Motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="max-w-md mx-auto pt-10 space-y-5 min-h-screen"
//             >

//                 {/* Header */}
//                 <Motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="space-y-2"
//                 >
//                     <h1 className="font-bold text-4xl">Welcome back</h1>
//                     <div className="flex gap-2 text-neutral-800
//             dark:text-neutral-200">
//                         <p>Don’t have an account?</p>
//                         <Link to="/register" className="underline">Create an account</Link>
//                     </div>
//                 </Motion.div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//                     {/* Email */}
//                     <AnimatedInput
//                         icon={LuMail}
//                         error={errors.email}
//                         touched={touchedFields.email}
//                     >
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             {...register("email", {
//                                 required: "Email is required",
//                                 pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
//                             })}
//                             className="w-full pl-10 py-3 border rounded-lg
//                         bg-neutral-50
//                         dark:bg-neutral-700
//                         border-gray-300 dark:border-gray-500"
//                         />
//                     </AnimatedInput>
//                     {errors.email && <Motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-red-600 text-xs mt-1"
//                     >
//                         {errors.email.message}
//                     </Motion.p>}

//                     {/* Password */}
//                     <AnimatedInput
//                         icon={LuLock}
//                         error={errors.password}
//                         touched={touchedFields.password}
//                     >
//                         <input
//                             type={passShow ? 'text' : 'password'}
//                             placeholder="Password"
//                             {...register("password", {
//                                 required: "Password is required",
//                                 minLength: { value: 6, message: "Password must be at least 6 characters" },
//                             })}
//                             className="w-full pl-10 py-3 border rounded-lg
//                         bg-neutral-50
//                         dark:bg-neutral-700
//                         border-gray-300 dark:border-gray-500"
//                         />
//                         <span
//                             onClick={() => setPassShow(!passShow)}
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                         >
//                             {passShow ? <Eye /> : <EyeOff />}
//                         </span>
//                     </AnimatedInput>
//                     {errors.password && <Motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         className="text-red-600 text-xs mt-1"
//                     >
//                         {errors.password.message}
//                     </Motion.p>}

//                     {/* Submit */}
//                     <Motion.button
//                         whileTap={{ scale: 0.95 }}
//                         whileHover={{ scale: 1.02 }}
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-[#ffde59] text-black hover:bg-yellow-400 font-semibold transition cursor-pointer ${loading ? "opacity-60" : ""}`}
//                     >
//                         Login
//                         <LuChevronRight />
//                     </Motion.button>
//                 </form>
//             </Motion.div>
//         </Container>
//     );
// };

// export default Login;