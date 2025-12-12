import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Container from "../../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../../../components/Skeleton";
import EmptyState from "../../../components/EmptyState";

const FavoriteMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const isDark = document.documentElement.classList.contains("dark");


    // Fetch favorite meals using React Query
    const { data: favorites = [], isLoading, refetch } = useQuery({
        queryKey: ["favorites", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorites?userEmail=${user.email}`);
            return res.data.data || res.data;
        },
        enabled: !!user?.email, // Only run when email exists
    });

    // Delete a favorite meal
    const handleDelete = async (mealId) => {
        const result = await
            Swal.fire({
                title: "Are you sure?",
                text: "Do you want to remove this meal from favorites?",
                icon: "warning",

                background: isDark ? "#262626" : "#ffffff",
                color: isDark ? "#ffffff" : "#262626",
                iconColor: isDark ? "#facc15" : "#facc15",

                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",

                confirmButtonColor: "#fb2c36",
                cancelButtonColor: "#525252",
            });



        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/favorites/${mealId}`);

                Swal.fire({
                    background: isDark ? "#262626" : "#ffffff",
                    color: isDark ? "#ffffff" : "#262626",
                    icon: "success",
                    title: "Deleted!",
                    text: "Meal removed from favorites successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });

                refetch();
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to delete this favorite meal",
                    icon: "error",
                    background: isDark ? "#262626" : "#ffffff",
                    color: isDark ? "#ffffff" : "#262626",
                    iconColor: isDark ? "#f87171" : "#dc2626",
                    confirmButtonColor: "#ef4444",
                });
            }
        }
    };

    // React Query loading state
    if (isLoading) {
        return (
            <Container>
                <div className="overflow-x-auto w-full mt-6">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-[#ffde59] text-black">
                                <th>#</th>
                                <th>Meal Name</th>
                                <th>Chef Name</th>
                                <th>Price</th>
                                <th>Date Added</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i}>
                                    <td><Skeleton className="h-4 w-6" /></td>
                                    <td><Skeleton className="h-4 w-32" /></td>
                                    <td><Skeleton className="h-4 w-28" /></td>
                                    <td><Skeleton className="h-4 w-16" /></td>
                                    <td><Skeleton className="h-4 w-20" /></td>
                                    <td><Skeleton className="h-8 w-20" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        );
    }

    if (!favorites.length) {
        return <Container><EmptyState message="No favorite meals added yet." /></Container>;
    }


    return (
        <Container>
            <div className="overflow-x-auto w-full mt-6 bg-neutral-50 dark:bg-neutral-600">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-[#ffde59] text-black">
                            <th>#</th>
                            <th>Meal Name</th>
                            <th>Chef Name</th>
                            <th>Price</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favorites.map((fav, i) => (
                            <tr key={fav._id}>
                                <td>{i + 1}</td>
                                <td>{fav.mealName}</td>
                                <td>{fav.chefName}</td>
                                <td>
                                    {fav.price
                                        ? `$${parseFloat(fav.price).toFixed(2)}`
                                        : "N/A"}
                                </td>

                                {/* date formatting */}
                                <td>
                                    {fav.addedTime
                                        ? new Date(fav.addedTime).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(fav._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
};

export default FavoriteMeals;