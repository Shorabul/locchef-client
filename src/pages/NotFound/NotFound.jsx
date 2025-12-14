import React from "react";
import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { Home } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
            <Motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-md"
            >
                {/* 404 Text */}
                <h1 className="text-8xl font-extrabold text-[#ffde59] mb-4">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
                    Page Not Found
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <Link to="/">
                    <Motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-[#ffde59] hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow"
                    >
                        <Home size={18} />
                        Back to Home
                    </Motion.button>
                </Link>
            </Motion.div>
        </div>
    );
};

export default NotFound;
