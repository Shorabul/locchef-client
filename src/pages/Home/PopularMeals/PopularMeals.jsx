import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import MealCardSkeleton from "../../../components/MealCardSkeleton";
import EmptyState from "../../../components/EmptyState";
import MealCard from "../../../components/Shared/MealCard";
import Container from "../../../components/Shared/Container";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const PopularMeals = () => {
    const axiosPublic = useAxiosPublic();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const limit = 8;

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get(`/meals?limit=${limit}`);
                setMeals(res.data?.data || []);
            } catch (err) {
                console.error("Failed to fetch meals", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
    }, [axiosPublic]);
    console.log(meals);
    if (loading) {
        return (
            <Container>
                <section className="py-14 px-4">
                    {/* Section Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
                            <UtensilsCrossed className="text-yellow-500" />
                            Today’s Popular Meals
                        </h1>
                        <p className="mt-2 text-neutral-500">
                            Freshly cooked by our top local chefs
                        </p>
                    </div>

                    {/* Meals Grid Skeleton */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(limit)].map((_, i) => (
                            <MealCardSkeleton key={i} />
                        ))}
                    </div>
                </section>
            </Container>
        );
    }
    return (
        <Container>
            <section className="py-14 px-4">
                {/* Section Header */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl font-bold flex justify-center items-center gap-2">
                        <UtensilsCrossed className="text-[#ffde59]" />
                        Today’s Popular Meals
                    </h1>
                    <p className="mt-2 text-neutral-500">
                        Freshly cooked by our top local chefs
                    </p>
                </Motion.div>

                {/* Meals Grid */}
                <Motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                    }}
                    className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >

                    {!loading && meals.length === 0 && (
                        <div className="col-span-full">
                            <EmptyState message="No meals found." />
                        </div>
                    )}

                    {!loading &&
                        meals.map((meal) => (
                            <Motion.div
                                key={meal._id}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            >
                                <MealCard meal={meal} />
                            </Motion.div>
                        ))}
                </Motion.div>
            </section>
        </Container>
    );
};

export default PopularMeals;
