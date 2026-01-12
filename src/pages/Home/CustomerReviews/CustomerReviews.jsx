import React, { useEffect, useState, useRef } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Skeleton from "../../../components/Skeleton";
import Container from "../../../components/Shared/Container";
import { SiComma } from "react-icons/si";
import { Star, UtensilsCrossed } from "lucide-react";
import SectionHeader from "../Components/Header/SectionHeader";

/* ------------------ Review Card ------------------ */
const ReviewCard = ({ review }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="
                bg-white dark:bg-neutral-800
                shadow-lg rounded-xl
                w-[260px] sm:w-[300px] md:w-[440px]
                p-6 sm:p-8 md:p-10
                flex flex-col gap-4
            "
        >
            {/* Quotes */}
            <div className="flex text-black dark:text-white">
                <SiComma size={22} />
                <SiComma size={22} />
            </div>

            {/* Comment */}
            {/* <p className="text-gray-700 dark:text-gray-300 text-sm flex-1 leading-relaxed">
                &ldquo;{review.comment}&rdquo;
            </p> */}
            <p className="text-gray-700 dark:text-gray-300 text-sm flex-1 leading-relaxed line-clamp-3">
                &ldquo;{review.comment}&rdquo;
            </p>


            {/* User info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={review.userImage || "/default-avatar.png"}
                        alt={review.userName || "Customer"}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {review.userName}
                    </span>
                </div>

                {review.rating && (
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold text-sm">
                        <Star size={16} />
                        <span>{review.rating}</span>
                    </div>
                )}
            </div>
        </Motion.div>
    );
};

/* ------------------ Auto Scroll Row ------------------ */
const AutoScrollRow = ({ reviews, direction = "left" }) => {
    const marqueeRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (marqueeRef.current) {
            setContentWidth(marqueeRef.current.scrollWidth / 2);
        }
    }, [reviews]);

    const isLeft = direction === "left";

    return (
        <div className="relative overflow-hidden w-full h-[340px]">
            {/* Gradient edges */}
            <div className="absolute left-0 top-0 h-full w-20 sm:w-24 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 sm:w-24 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent z-10 pointer-events-none" />

            <Motion.div
                ref={marqueeRef}
                className="flex gap-6 absolute top-0 left-0"
                animate={
                    shouldReduceMotion
                        ? {}
                        : {
                            x: isLeft
                                ? [0, -contentWidth]
                                : [-contentWidth, 0],
                        }
                }
                transition={{
                    duration: 40,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...reviews, ...reviews].map((review, index) => (
                    <ReviewCard
                        key={`${review._id}-${index}`}
                        review={review}
                    />
                ))}
            </Motion.div>
        </div>
    );
};

/* ------------------ Main Component ------------------ */
const CustomerReviews = () => {
    const axiosPublic = useAxiosPublic();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get("/reviews/latest?limit=10");
                setReviews(res.data?.data || []);
            } catch (err) {
                console.error("Failed to fetch reviews", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [axiosPublic]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-60 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <Container>
            <section className="text-center">
                {/* Heading */}
                <SectionHeader
                    title="What Our Clients Say"
                    subtitle="Testimonials"
                    icon={UtensilsCrossed}
                />

                {/* Row 1 */}
                <AutoScrollRow reviews={reviews} direction="left" />

                {/* Row 2 (hidden on very small devices) */}
                <div className="hidden sm:block">
                    <AutoScrollRow reviews={reviews} direction="right" />
                </div>
            </section>
        </Container>
    );
};

export default CustomerReviews;
