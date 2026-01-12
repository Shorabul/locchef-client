import { motion as Motion } from "framer-motion";
import { FiUser, FiDollarSign } from "react-icons/fi";
import { itemVariants } from "../../mealDetailsMotion";

const MealHeader = ({ mealData }) => {
    return (
        <>
            <Motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{mealData?.foodName}</h1>
                {/* Chef & ID Block */}
                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-1">
                        {/* Use FiUser here */}
                        <FiUser className="text-[#ffde59]" />
                        <span>By {mealData?.chefName}</span>
                    </div>
                    <span className="hidden md:inline">|</span>
                    <div>ID: {mealData?.chefId}</div>
                </div>
            </Motion.div>

            <Motion.div variants={itemVariants} className="text-3xl font-bold text-[#ffde59] mb-6 flex items-center">
                <FiDollarSign className="mr-1 h-6 w-6" />{mealData?.price}
            </Motion.div>
        </>
    );
};

export default MealHeader;