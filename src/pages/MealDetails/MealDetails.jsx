import React, { useState } from "react";
import { useParams } from "react-router";
import Container from "../../components/Shared/Container";
import useAuth from "../../hooks/useAuth";
import { motion as Motion } from "framer-motion";
import useAuthRole from "../../hooks/useAuthRole";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewList from "./ReviewList/ReviewList";
import MealDetailsSkeleton from "./MealDetailsSkeleton/MealDetailsSkeleton";
import MealActions from "./components/MealActions/MealActions";
import Ingredients from "./components/Ingredients/Ingredients";
import MealInfoGrid from "./components/MealInfoGrid/MealInfoGrid";
import MealHeader from "./components/MealHeader/MealHeader";
import MealImage from "./components/MealImage/MealImage";
import { containerVariants } from "./mealDetailsMotion";
import useMealDetails from "./hooks/useMealDetails";
import useMealReviews from "./hooks/useMealReviews";
import useMealActions from "./hooks/useMealActions";

const MealDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { backendData } = useAuthRole();


    const [rating, setRating] = useState(0);
    const [newReview, setNewReview] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);




    // GET: meal details
    const { data: mealData, isLoading } = useMealDetails(id);

    // GET: reviews
    const { data: reviews = [], refetch } = useMealReviews(id);

    const { submitReview, addFavorite } = useMealActions({
        mealData,
        user,
        refetch,
    });

    // POST: submit review
    const handleSubmitReviewClick = async () => {
        console.log("handleSubmitReviewClick ");
        await submitReview({ rating, comment: newReview });
        setRating(0);
        setNewReview("");
    };

    // POST: add favorite
    const handleFavoriteClick = async () => {
        console.log("handleFavoriteClick ");
        setIsFavorite(true);
        await addFavorite();
    };

    if (isLoading || !mealData || !reviews) {
        return (
            <MealDetailsSkeleton />
        );
    }

    return (
        <Container>
            <Motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="py-8"
            >
                {/* Top Section: Image and Details Card */}
                <div className="flex flex-col lg:flex-row gap-8 rounded-3xl shadow-sm overflow-hidden">

                    {/* Left Column: Image & Rating */}
                    <MealImage mealData={mealData} />

                    {/* Right Column: Details Info */}
                    <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                        {/* food & chef & chefId & price */}
                        <MealHeader mealData={mealData} />

                        {/* Info Grid */}
                        <MealInfoGrid mealData={mealData} />

                        {/* Ingredients */}
                        <Ingredients mealData={mealData} />

                        {/* Action Buttons */}
                        <MealActions
                            meal={mealData}
                            backendData={backendData}
                            isFavorite={isFavorite}
                            handleFavorite={handleFavoriteClick}
                        />
                    </div>
                </div>

                {/* Bottom Section: Reviews */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Review Input Form (Sticky on large screens) */}
                    <ReviewForm
                        rating={rating}
                        setRating={setRating}
                        newReview={newReview}
                        setNewReview={setNewReview}
                        handleSubmitReview={handleSubmitReviewClick}

                    />

                    {/* Reviews List */}
                    <ReviewList
                        reviews={reviews}
                    />
                </div>
            </Motion.div>
        </Container >
    );
};
export default MealDetails;