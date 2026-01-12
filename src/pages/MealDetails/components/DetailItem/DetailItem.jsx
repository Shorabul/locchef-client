import React from "react";
import { motion as Motion } from "framer-motion";
import { itemVariants } from "../../mealDetailsMotion";

// const DetailItem = ({ icon: Icon, label, value }) => (
const DetailItem = ({ icon, label, value }) => (
    <Motion.div variants={itemVariants} className="flex items-start gap-3">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg text-yellow-600 dark:text-yellow-400">
            {/* <Icon className="w-5 h-5" /> */}
            {React.createElement(icon, { className: "w-5 h-5" })}

        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {label}
            </p>
            <p className="font-semibold">{value}</p>
        </div>
    </Motion.div>
);

export default DetailItem;