import useToast from "../../../utils/toast/useToast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRequireAuth from "./useRequireAuth";

const useMealActions = ({ mealData, user, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { success, error, info, warning } = useToast();
    const requireAuth = useRequireAuth();

    const submitReview = async ({ rating, comment }) => {

        if (!requireAuth()) return;

        if (!rating) return warning("Rating Required", "Please select a rating.");
        if (!comment.trim()) return warning("Empty Review", "Write something.");

        try {
            await axiosSecure.post("/reviews", {
                foodId: mealData._id,
                userName: user.displayName,
                userEmail: user.email,
                userImage: user.photoURL,
                rating,
                comment,
            });

            success("Success", "Review added successfully");
            refetch();
        } catch {
            error("Error", "Failed to submit review");
        }
    };

    const addFavorite = async () => {

        if (!requireAuth()) return;

        try {
            const res = await axiosSecure.post("/favorites", {
                foodId: mealData._id,
                foodName: mealData.foodName,
                price: mealData.price,
                userEmail: user.email,
                chefName: mealData.chefName,
                chefId: mealData.chefId,
            });

            res.data.success
                ? success("Added", "Meal added to favorites")
                : info("Already Added", "This meal is already a favorite");
        } catch {
            error("Failed", "Could not add favorite");
        }
    };

    return { submitReview, addFavorite };
};

export default useMealActions;
