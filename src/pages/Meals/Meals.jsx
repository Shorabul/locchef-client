import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import { motion as Motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const Meals = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // Local states
    const [meals, setMeals] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");

    const limit = 8; // Show 8 items per page

    // Fetch meals
    const fetchMeals = async () => {
        try {
            const res = await axiosSecure.get(
                `/meals?page=${page}&limit=${limit}&sortBy=price&order=${sortOrder}&fields=foodName,foodImage,price,rating,deliveryArea`
            );

            setMeals(res.data.data);
            setPages(res.data.pages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, [page, sortOrder]);

    return (
        <Container>
            <div className="h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-neutral-700">Daily Meals</h2>

                    {/* Sort Button */}
                    <button
                        onClick={() =>
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 text-black"
                    >
                        Sort by Price ({sortOrder === "asc" ? "Low → High" : "High → Low"})
                    </button>
                </div>

                {/* Meals Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-neutral-700">
                    {meals.map((meal) => (
                        <Motion.div
                            key={meal._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white shadow rounded-xl overflow-hidden"
                        >
                            <img
                                src={meal.foodImage}
                                alt={meal.foodName}
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-bold text-lg">{meal.foodName}</h3>
                                <p className="text-sm opacity-80">Area: {meal.deliveryArea}</p>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="font-semibold text-yellow-500">
                                        ★ {meal.rating}
                                    </span>
                                    <span className="text-lg font-bold">${meal.price}</span>
                                </div>

                                <button
                                    onClick={() => navigate(`/meals/${meal._id}`)}
                                    className="mt-4 w-full bg-yellow-400 py-2 rounded-lg text-black font-semibold hover:bg-yellow-500"
                                >
                                    See Details
                                </button>
                            </div>
                        </Motion.div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {[...Array(pages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`px-4 py-2 rounded-lg ${page === num + 1
                                ? "bg-yellow-400 text-black font-bold"
                                : "bg-gray-200"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === pages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default Meals;
