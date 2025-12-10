import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Container from '../../components/Shared/Container';

const MealDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await axiosSecure.get(`/meals/id/${id}`);
                setMeal(res.data.data);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load meal",
                    text: "Please try again later."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMeal();
    }, [id, axiosSecure]);

    if (loading) return <div className="text-center py-10">Loading...</div>;

    if (!meal) return <div className="text-center py-10">Meal not found</div>;

    return (
        <Container>
            <div className="w-full h-full p-6 text-neutral-700">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={meal.foodImage}
                        alt={meal.foodName}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                    <div className="md:w-1/2">
                        <h1 className="text-3xl font-bold mb-2">{meal.foodName}</h1>
                        <p className="mb-1"><strong>Chef:</strong> {meal.chefName}</p>
                        <p className="mb-1"><strong>Price:</strong> ${meal.price}</p>
                        <p className="mb-1"><strong>Rating:</strong> ★ {meal.rating}</p>
                        <p className="mb-1"><strong>Delivery Area:</strong> {meal.deliveryArea}</p>
                        <p className="mb-1"><strong>Estimated Delivery Time:</strong> {meal.estimatedDeliveryTime}</p>
                        <p className="mb-1"><strong>Chef Experience:</strong> {meal.chefExperience}</p>
                        <p className="mb-1"><strong>Chef ID:</strong> {meal.chefId}</p>
                        <p className="mb-1"><strong>Ingredients:</strong> {meal.ingredients}</p>

                        <Link
                            to={`/order-confirm/${meal._id}`}
                            className="mt-4 bg-yellow-400 px-4 py-2 rounded-lg text-black font-semibold hover:bg-yellow-500"
                        >
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default MealDetails;
