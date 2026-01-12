import React, { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from "framer-motion";
import ThemeToggle from '../../../components/ThemeToggle';
import { Link, NavLink } from 'react-router';
import Container from '../../../components/Shared/Container';
import { IoMenuSharp, IoClose } from "react-icons/io5";
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import ProfileDropdown from '../../../components/ProfileDropdown';
import Logo from '../../../components/Logo/Logo';

const Navbar = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const { user, logOut } = useAuth();
    const [menutoggle, setMenuToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const handleProfileToggle = () => setProfileToggle(!profileToggle);
    const handleMenuToggle = () => setMenuToggle(!menutoggle);

    const handleLogOut = async () => {
        try {
            await logOut();
            setMenuToggle(false);
            Swal.fire({
                position: 'top',
                icon: "success",
                title: `Successfully logged out`,
                timer: 1500,
                showConfirmButton: false,
                background: isDark ? "#1f1f1f" : "#ffffff",
                color: isDark ? "#ffffff" : "#1f1f1f",
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuToggle(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Navigation Links
    const linkItems = [
        { name: 'Home', path: '/' },
        { name: 'Meals', path: '/meals' },
        { name: 'Blog', path: '/blog' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        ...(user ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
    ];

    const links = linkItems.map((link) => (
        <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setMenuToggle(false)}
            className={({ isActive }) =>
                `relative px-1 py-2 text-sm font-medium transition-all duration-300 hover:text-[#ffde59] 
                ${isActive ? 'text-[#ffde59]' : ''}`
            }
        >
            {({ isActive }) => (
                <>
                    <span>{link.name}</span>
                    {isActive && (
                        <Motion.span
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ffde59]"
                        />
                    )}
                </>
            )}
        </NavLink>
    ));

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-xl">
            <Container>
                <div className="w-full relative">
                    <nav className="flex w-full items-center justify-between h-16 md:h-20 ">

                        {/* Left: Logo */}
                        <div className="flex-shrink-0">
                            <Logo />
                        </div>

                        {/* Center: Desktop Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            {links}
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">

                            <div className="hidden lg:block">
                                <ThemeToggle />
                            </div>

                            {user ? (
                                <ProfileDropdown
                                    handleProfileToggle={handleProfileToggle}
                                    user={user}
                                    profileToggle={profileToggle}
                                    handleLogOut={handleLogOut}
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <NavLink
                                        to="/login"
                                        className="px-4 py-2 text-sm font-medium hover:text-neutral-900 dark:hover:text-white transition-colors"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className="px-5 py-2 text-sm font-medium bg-[#ffde59] text-black rounded-lg hover:bg-yellow-400 transition-all active:scale-95"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={handleMenuToggle}
                                className="p-2 border border-[#ffde59] lg:hidden text-lg rounded-lg transition-colors"
                            >
                                <Motion.div
                                    animate={{ rotate: menutoggle ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {menutoggle ? <IoClose /> : <IoMenuSharp />}
                                </Motion.div>
                            </button>
                        </div>

                    </nav>
                    {/* Mobile Menu Overlay */}
                    <AnimatePresence>
                        {menutoggle && (
                            <Motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="absolute w-full bg-neutral-50 dark:bg-neutral-800 rounded-b-lg block lg:hidden border-t border-t-neutral-200 dark:border-t-neutral-600 border-b-6 border-b-[#ffde59]"
                            >
                                <div className="flex flex-col justify-between gap-5 p-6">
                                    <div className='flex flex-col'>
                                        {links}
                                    </div>
                                    {/* <hr className="border-neutral-200 dark:border-neutral-800 my-2" /> */}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-sm font-medium">Switch Theme</span>
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </Motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </header >
    );
};

export default Navbar;