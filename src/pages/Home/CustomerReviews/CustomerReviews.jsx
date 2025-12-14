import React, { useEffect, useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Skeleton from "../../../components/Skeleton";
import Container from "../../../components/Shared/Container";
import { SiComma } from "react-icons/si";
import { Star, UtensilsCrossed } from "lucide-react";

// Single review card
const ReviewCard = ({ review }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-neutral-700 shadow-lg rounded-xl overflow-hidden w-[300px] p-6 flex flex-col gap-4"
        >
            {/* Comma Icons */}
            <div className="flex mb-2">
                <SiComma size={24} color="black" />
                <SiComma size={24} color="black" />
            </div>

            {/* Comment */}
            <p className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                &ldquo;{review.comment}&rdquo;
            </p>

            {/* User info */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                    <img
                        src={review.userImage || "/default-avatar.png"}
                        alt={review.userName || "Customer"}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-semibold text-sm">{review.userName}</span>
                </div>
                {review.rating && (
                    <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <Star size={16} /> <span>{review.rating}</span>
                    </div>
                )}
            </div>
        </Motion.div>
    );
};

// Auto-scrolling row
const AutoScrollRow = ({ reviews, direction = "left" }) => {
    const containerRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth / 2); // half, since we duplicate
        }
    }, [reviews]);

    return (
        <div
            className="relative overflow-hidden w-full h-[260px] my-6"
            ref={containerRef}
        >
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white dark:from-neutral-800 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white dark:from-neutral-800 to-transparent pointer-events-none z-10" />

            <Motion.div
                className="flex gap-6 absolute top-0 left-0"
                animate={{ x: direction === "left" ? [0, -width] : [0, width] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20, // adjust speed
                    ease: "linear",
                }}
            >
                {[...reviews, ...reviews].map((review, index) => (
                    <ReviewCard key={`${review._id}-${index}`} review={review} />
                ))}
            </Motion.div>
        </div>
    );
};

// Main component
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
            <div className="max-w-7xl mx-auto px-4">
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
            <div className="text-3xl font-bold text-center mb-12 flex items-center justify-center w-full gap-2">
                <UtensilsCrossed className="text-[#ffde59]" />
                <span>What Our Clients Say</span>
            </div>

            {/* Top row: left → right */}
            <AutoScrollRow reviews={reviews} direction="left" />

            {/* Bottom row: right → left */}
            <AutoScrollRow reviews={reviews} direction="right" />
        </Container>
    );
};

export default CustomerReviews;