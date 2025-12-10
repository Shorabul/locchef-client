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

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            quantity: 1,
            userAddress: "",
        },
    });

    const quantity = watch("quantity") || 1;

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
                });
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
    }, [id, axiosSecure, setValue]);

    const onSubmit = async (data) => {
        if (!meal) return;

        const totalPrice = meal.price * data.quantity;

        const confirmResult = await Swal.fire({
            title: `Your total price is $${totalPrice}`,
            text: "Do you want to confirm the order?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, order now!",
            cancelButtonText: "Cancel",
        });

        if (confirmResult.isConfirmed) {
            const orderData = {
                foodId: meal._id,
                mealName: meal.foodName,
                price: meal.price,
                quantity: data.quantity,
                chefId: meal.chefId,
                userEmail: user.email,
                userAddress: data.userAddress,
                orderStatus: "pending",
                orderTime: new Date().toISOString(),
                paymentStatus: "Pending",
            };

            try {
                await axiosSecure.post("/order", orderData);
                Swal.fire("Success!", "Order placed successfully!", "success");
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "Failed to place order", "error");
            }
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!meal) return <div className="text-center py-10">Meal not found</div>;

    return (
        <div className="max-w-2xl mx-auto p-6 text-neutral-700">
            <h1 className="text-3xl font-bold mb-4">Confirm Your Order</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Meal Name */}
                <div>
                    <label className="font-semibold">Meal Name:</label>
                    <input
                        type="text"
                        value={meal.foodName}
                        readOnly
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="font-semibold">Price:</label>
                    <input
                        type="text"
                        value={`$${meal.price}`}
                        readOnly
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Quantity */}
                <div>
                    <label className="font-semibold">Quantity:</label>
                    <input
                        type="number"
                        min={1}
                        {...register("quantity", { required: true, min: 1 })}
                        className="w-full border p-2 rounded"
                    />
                    {errors.quantity && (
                        <p className="text-red-500 text-sm">Quantity must be at least 1</p>
                    )}
                </div>

                {/* Total Price */}
                <div>
                    <p className="font-semibold">
                        Total Price: <span>${meal.price * quantity}</span>
                    </p>
                </div>

                {/* Address */}
                <div>
                    <label className="font-semibold">Delivery Address:</label>
                    <textarea
                        {...register("userAddress", { required: true })}
                        className="w-full border p-2 rounded"
                        placeholder="Enter your delivery address"
                    />
                    {errors.userAddress && (
                        <p className="text-red-500 text-sm">Address is required</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default OrderConfirm;
