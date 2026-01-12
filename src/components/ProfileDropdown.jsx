import { motion as Motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu"; // Modern, clean arrow icon

const ProfileDropdown = ({ user, profileToggle, handleLogOut, handleProfileToggle }) => {
    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={handleProfileToggle}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all group"
            >
                <img
                    className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-[#ffde59] transition-all"
                    src={user?.photoURL}
                    alt={user?.displayName}
                />

                {/* Animated Arrow Icon */}
                <Motion.div
                    animate={{ rotate: profileToggle ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-500 dark:text-neutral-400 group-hover:text-[#ffde59]"
                >
                    <LuChevronDown size={20} />
                </Motion.div>
            </button>

            {/* Profile Dropdown Menu */}
            <AnimatePresence>
                {profileToggle && (
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="absolute right-0 top-14 p-4 w-56 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 z-50"
                    >
                        <div className="flex flex-col gap-1 mb-4">
                            <h1 className="font-bold text-neutral-800 dark:text-white truncate">
                                {user?.displayName}
                            </h1>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                                {user?.email}
                            </p>
                        </div>

                        <div className="h-[1px] bg-neutral-100 dark:bg-neutral-700 w-full mb-3" />

                        <button
                            onClick={handleLogOut}
                            className="w-full py-2.5 bg-[#ffde59] text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors active:scale-95 transform"
                        >
                            Logout
                        </button>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;