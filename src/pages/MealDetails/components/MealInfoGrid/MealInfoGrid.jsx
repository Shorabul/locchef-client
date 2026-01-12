import React from "react";
import { motion as Motion } from "framer-motion";
import { FiMapPin, FiClock, FiAward } from "react-icons/fi";
import DetailItem from "../DetailItem/DetailItem";
import { containerVariants } from "../../mealDetailsMotion";

const MealInfoGrid = ({ mealData }) => {
    return (
        <Motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-8">
            <DetailItem icon={FiMapPin} label="Delivery Area" value={mealData?.deliveryArea} />
            <DetailItem icon={FiClock} label="Delivery Time" value={mealData?.deliveryTime} />
            <DetailItem icon={FiAward} label="Chef Experience" value={mealData?.chefExperience} />
        </Motion.div>
    );
};

export default MealInfoGrid;