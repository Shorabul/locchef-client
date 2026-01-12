import { motion as Motion } from "framer-motion";
import { FaStar } from "react-icons/fa6";
import { imageVariants } from "../../mealDetailsMotion";
const MealImage = ({ mealData }) => {
    return (
        <Motion.div variants={imageVariants} className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
            <img
                src={mealData?.foodImage}
                alt={mealData?.foodName}
                className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="font-bold">{mealData?.rating}</span>
            </div>
        </Motion.div>
    );
};

export default MealImage;
