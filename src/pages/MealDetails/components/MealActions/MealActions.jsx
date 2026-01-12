import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { itemVariants } from "../../mealDetailsMotion";

const MealActions = ({ meal, backendData, isFavorite, handleFavorite }) => {
    return (
        <Motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-auto">
            {backendData?.status === 'fraud' ? (
                <button disabled className="flex-1 bg-gray-300 px-6 py-3 rounded-xl text-black font-bold cursor-not-allowed text-center opacity-70">
                    Account Restricted
                </button>
            ) : (
                <Link
                    to={`/order-confirm/${meal._id}`}
                    className="flex-1 bg-[#ffde59] px-6 py-3 rounded-xl text-black font-bold hover:bg-yellow-400 transition-colors text-center shadow-md hover:shadow-lg flex justify-center items-center gap-2"
                >
                    Order Now
                </Link>
            )}

            <Motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFavorite}
                className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-md
                                            ${isFavorite
                        ? "bg-red-50 border-red-500 text-red-500 dark:bg-red-900/20"
                        : "border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-200 hover:border-red-400 hover:text-red-500"
                    }`}
            >
                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                {isFavorite ? "Favorited" : "Favorite"}
            </Motion.button>
        </Motion.div>
    );
};

export default MealActions;
