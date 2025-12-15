import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const OrderConfirm = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: { quantity: 1, userAddress: "" }
    });

    const quantity = watch("quantity") || 1;
    const isDark = document.documentElement.classList.contains("dark");

    useEffect(() => {
        const fetchMeal = async () => {
            try {
                const res = await axiosSecure.get(`/meals/id/${id}`);
                setMeal(res.data.data);
                setValue("quantity", 1);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Failed to load meal",
                    text: "Something went wrong while fetching the meal.",
                    background: isDark ? "#262626" : "#ffffff",
                    color: isDark ? "#ffffff" : "#262626",
                    iconColor: "#fb2c36",
                    confirmButtonColor: "#fb2c36",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [id, axiosSecure, setValue, isDark]);

    const onSubmit = async (data) => {
        if (!meal) return;
        const totalPrice = meal.price * data.quantity;
        const confirmResult = await Swal.fire({
            title: "Confirm Order",
            text: `Your total price is $${totalPrice}. Do you want to place this order?`,
            icon: "question",
            background: isDark ? "#262626" : "#ffffff",
            color: isDark ? "#ffffff" : "#262626",
            iconColor: "#facc15",
            showCancelButton: true,
            confirmButtonText: "Yes, order now!",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#facc15",
            cancelButtonColor: "#525252",
        });

        if (confirmResult.isConfirmed) {
            const orderData = {
                foodId: meal._id,
                foodName: meal.foodName,
                price: meal.price,
                quantity: data.quantity,
                userEmail: user.email,
                userAddress: data.userAddress,
                chefId: meal.chefId,
                chefName: meal.chefName,
                orderStatus: "pending",
                paymentStatus: "pending",
            };

            try {
                await axiosSecure.post("/order", orderData);

                Swal.fire({
                    icon: "success",
                    title: "Order Placed!",
                    text: "Your order has been placed successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                    background: isDark ? "#262626" : "#ffffff",
                    color: isDark ? "#ffffff" : "#262626",
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to place order. Please try again.",
                    icon: "error",
                    background: isDark ? "#262626" : "#ffffff",
                    color: isDark ? "#ffffff" : "#262626",
                    iconColor: "#fb2c36",
                    confirmButtonColor: "#fb2c36",
                });
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!meal) return <div className="text-center py-10">Meal not found</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Confirm Your Order</h1>

            <div className="bg-white dark:bg-neutral-700 shadow-lg rounded-xl p-6 space-y-6">
                {/* Meal Preview */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img src={meal.foodImage} alt={meal.foodName} className="w-full md:w-48 h-48 object-cover rounded-lg shadow-md" />
                    <div className="flex-1 space-y-3">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{meal.foodName}</h2>
                        <p className="text-gray-600 dark:text-gray-300 font-semibold">Price: <span className="text-yellow-500">${meal.price}</span></p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{meal.ingredients.join(", ")}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Quantity Selector */}
                    <div>
                        <label className="font-semibold text-gray-700 dark:text-gray-200">Quantity:</label>
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                type="button"
                                onClick={() => setValue("quantity", quantity > 1 ? quantity - 1 : 1)}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-500 font-bold"
                            >
                                -
                            </button>
                            <span className="px-6 py-2 border rounded-lg text-center bg-gray-50 dark:bg-neutral-800">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setValue("quantity", quantity + 1)}
                                className="px-4 py-2 bg-gray-200 dark:bg-neutral-600 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-500 font-bold"
                            >
                                +
                            </button>
                        </div>
                        {errors.quantity && <p className="text-red-500 text-sm mt-1">Quantity must be at least 1</p>}
                    </div>

                    {/* Total Price */}
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        Total Price: <span className="text-yellow-500">${(meal.price * quantity).toFixed(2)}</span>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="font-semibold text-gray-700 dark:text-gray-200">Delivery Address:</label>
                        <textarea
                            {...register("userAddress", { required: true })}
                            className="w-full border rounded-lg p-3 mt-1 bg-gray-50 dark:bg-neutral-800 border-gray-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter your delivery address"
                        />
                        {errors.userAddress && <p className="text-red-500 text-sm mt-1">Address is required</p>}
                    </div>

                    {/* Confirm Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-400 dark:bg-yellow-500 rounded-lg text-black font-bold hover:bg-yellow-500 dark:hover:bg-yellow-600 transition"
                    >
                        Confirm Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderConfirm;
