import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ReviewCard from "./ReviewCard/ReviewCard";
import { containerVariants, itemVariants } from "../mealDetailsMotion";

const ReviewList = ({ reviews }) => {
    return (
        <div className="lg:col-span-2">
            <Motion.h2
                variants={itemVariants}
                className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
                Customer Reviews
                <span className="text-base font-normal text-gray-500">
                    ({reviews.length})
                </span>
            </Motion.h2>

            <Motion.div
                variants={containerVariants}
                className="space-y-4"
            >
                <AnimatePresence>
                    {reviews.length === 0 ? (
                        <Motion.p
                            variants={itemVariants}
                            className="text-gray-500 dark:text-gray-400 italic p-4 bg-gray-50 dark:bg-neutral-700 rounded-xl"
                        >
                            No reviews yet. Be the first!
                        </Motion.p>
                    ) : (
                        reviews.map((rev) => (
                            <ReviewCard
                                key={rev._id}
                                review={rev}
                                itemVariants={itemVariants}
                            />
                        ))
                    )}
                </AnimatePresence>
            </Motion.div>
        </div>
    );
};

export default ReviewList;