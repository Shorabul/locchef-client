import React from "react";
import { motion as Motion } from "framer-motion";
import StarRating from "../../StarRating/StarRating";
import { itemVariants } from "../mealDetailsMotion";

const ReviewForm = ({
    rating,
    setRating,
    newReview,
    setNewReview,
    handleSubmitReview,
}) => {
    return (
        <div className="lg:col-span-1">
            <Motion.div
                variants={itemVariants}
                className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg sticky top-24"
            >
                <h3 className="text-xl font-bold mb-4">Write a Review</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Share your experience with this meal.
                </p>

                <div className="mb-4 flex justify-center">
                    <StarRating rating={rating} setRating={setRating} size={32} />
                </div>

                <textarea
                    className="w-full border-2 border-gray-200 dark:border-neutral-700 bg-transparent p-4 rounded-xl focus:border-[#ffde59] focus:ring-0 transition-all outline-none resize-none text-gray-800 dark:text-gray-200"
                    rows={5}
                    placeholder="What did you like or dislike?"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                />

                <Motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#e6c84f" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmitReview}
                    className="w-full mt-4 bg-[#ffde59] text-black font-bold px-4 py-3 rounded-xl shadow-md transition-colors"
                >
                    Submit Review
                </Motion.button>
            </Motion.div>
        </div>
    );
};

export default ReviewForm;