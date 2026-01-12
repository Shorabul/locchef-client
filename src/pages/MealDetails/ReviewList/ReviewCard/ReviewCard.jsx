import React, { useState } from 'react';
import { motion as Motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { itemVariants } from '../../mealDetailsMotion';


const ReviewCard = ({ review }) => {
    const [expanded, setExpanded] = useState(false);

    const reviewDate = review?.createdAt
        ? new Date(review.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : "Recent";
    const wordCount = review?.comment?.split(" ").length;
    return (
        <Motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700 flex flex-col sm:flex-row gap-4"
        >
            <div className="flex-shrink-0">
                <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#ffde59]"
                />
            </div>

            <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h4 className="font-bold text-lg">{review.userName}</h4>
                        <p className="text-xs text-gray-400">{reviewDate}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-neutral-700 px-2 py-1 rounded-lg">
                        <FaStar className="text-yellow-400 w-4 h-4" />
                        <span className="font-bold text-sm">{review.rating}</span>
                    </div>
                </div>

                {/* Review text */}
                <p
                    className={`text-gray-700 dark:text-gray-300 leading-relaxed transition-all ${expanded ? "" : "line-clamp-2"
                        }`}
                >
                    "{review?.comment}"
                </p>

                {/* Toggle button */}
                {wordCount > 25 && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-1 text-sm font-semibold text-[#ffde59] hover:text-yellow-400 transition-colors flex items-center gap-1"
                    >
                        {expanded ? "Show less" : "Read more..."}
                    </button>
                )}
            </div>
        </Motion.div>
    );
};

export default ReviewCard;

