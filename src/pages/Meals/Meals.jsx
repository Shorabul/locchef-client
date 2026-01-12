import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Container from "../../components/Shared/Container";
import MealCard from "../../components/Shared/MealCard";
import { House } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import MealCardSkeleton from "../../components/MealCardSkeleton";
import EmptyState from "../../components/EmptyState";
import { motion as Motion } from "framer-motion";
import { usePageTitle } from "../../hooks/usePageTitle";

const Meals = () => {
    usePageTitle("Meals");
    const axiosPublic = useAxiosPublic();

    // Data State
    const [meals, setMeals] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtering & Sorting State
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOrder, setSortOrder] = useState("asc");

    // Pagination State
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const limit = 8;

    // Fetch initial categories (optional: can also be derived from meals if backend allows)
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axiosPublic.get('/meals'); // Fetching a sample to extract categories
                const categories = res.data.data.map(m => m.category).filter(Boolean);
                setAllCategories([...new Set(categories)]);
            } catch (err) { console.error(err); }
        };
        fetchCategories();
    }, [axiosPublic]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Construct query parameters
                const params = new URLSearchParams({
                    page: page,
                    limit: limit,
                    sortBy: 'price',
                    order: sortOrder, // "asc" or "desc"
                    search: searchTerm,
                    category: selectedCategory === 'all' ? '' : selectedCategory,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    fields: 'foodName,foodImage,price,rating,deliveryArea,ingredients,deliveryTime,deliveryRadius,category'
                });

                const res = await axiosPublic.get(`/meals?${params.toString()}`);

                setMeals(res.data.data);
                setPages(res.data.pages);
            } catch (error) {
                console.error("Error fetching meals:", error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search to avoid too many API calls
        const delayDebounceFn = setTimeout(() => {
            fetchData();
        }, 400);

        return () => clearTimeout(delayDebounceFn);
    }, [page, sortOrder, searchTerm, selectedCategory, priceRange, axiosPublic]);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceRange([0, 1000]);
        setSortOrder('asc');
        setPage(1);
    };

    return (
        <Container>
            <section className="py-4 lg:py-8">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-center font-bold text-2xl">Meals</h1>
                    <p className="flex gap-2">
                        <span className="opacity-80 flex items-center gap-2">
                            <House size={16} />Home
                        </span>
                        <span> / meals</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Filters - UI taken from Services */}
                    <Motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-xl sticky top-24 border border-neutral-200 dark:border-neutral-700">
                            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <FaFilter className="text-[#ffde59]" /> Filters
                            </h2>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Search Meal</label>
                                <input
                                    type="text"
                                    placeholder="Food name..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-[#ffde59] outline-none"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 outline-none"
                                >
                                    <option value="all">All Categories</option>
                                    {allCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Price Range ($)</label>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                        className="w-1/2 px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                                    />
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-1/2 px-2 py-1 text-sm rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900"
                                    />
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full accent-[#ffde59]"
                                />
                            </div>

                            {/* Sort */}
                            <div className="mb-6">
                                <label className="font-semibold text-sm mb-2 block">Sort By Price</label>
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 outline-none"
                                >
                                    <option value="asc">Price: Low to High</option>
                                    <option value="desc">Price: High to Low</option>
                                </select>
                            </div>

                            <button
                                onClick={resetFilters}
                                className="w-full py-2 border border-[#ffde59] rounded-lg font-bold hover:bg-[#ffde59]  transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </Motion.div>

                    {/* Meals Content Area */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(limit)].map((_, i) => (
                                    <MealCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : meals.length > 0 ? (
                            <Motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
                                }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {meals.map((meal) => (
                                    <Motion.div
                                        key={meal._id}
                                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                    >
                                        <MealCard meal={meal} />
                                    </Motion.div>
                                ))}
                            </Motion.div>
                        ) : (
                            <div className="h-96 flex items-center justify-center">
                                <EmptyState message="No meals found matching your filters." />
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && pages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50 rounded-lg font-medium"
                                >
                                    Prev
                                </button>

                                {[...Array(pages).keys()].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num + 1)}
                                        className={`w-10 h-10 rounded-lg font-bold transition-colors ${page === num + 1
                                            ? "bg-[#ffde59] text-black"
                                            : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200"
                                            }`}
                                    >
                                        {num + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={page === pages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50 rounded-lg font-medium"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default Meals;