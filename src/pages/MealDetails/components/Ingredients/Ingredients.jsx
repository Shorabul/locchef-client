import React from 'react';
import { motion as Motion } from "framer-motion";
import { itemVariants } from '../../mealDetailsMotion';

const Ingredients = ({ mealData }) => {
    return (
        <Motion.div variants={itemVariants} className="mb-8">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[#ffde59]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
                {mealData?.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-sm rounded-full text-gray-700 dark:text-gray-300 capitalize">
                        {ing}
                    </span>
                ))}
            </div>
        </Motion.div>
    );
};

export default Ingredients;