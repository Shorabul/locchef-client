import React, { useRef, useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Container from "../../../components/Shared/Container";
import SectionHeader from "../Components/Header/SectionHeader";
import { UtensilsCrossed } from "lucide-react";
import "./Categories.css";

const categoryData = [
    { name: "Fries", img: "https://pngimg.com/d/fries_PNG35.png" },
    { name: "Boritto", img: "https://www.elpolloloco.com/contentAsset/image/5964ab1cbc6f64b4bb8ced4b80205bac/fileAsset/$fileName" },
    { name: "Taco", img: "https://fuchsgruppe.shop/media/7a/9f/6b/1706631771/Comp_TacoShells_Rezept.webp?ts=1706631771" },
    { name: "Muffin", img: "https://muffinbreak.com.au/wp-content/uploads/2017/07/BLUEBERRY-angled-ART.png" },
    { name: "Meat", img: "https://www.instacart.com/image-server/1200x1200/www.instacart.com/assets/taxonomy/L2_Meat-9cefbf2bf62f7f3b3dc0b1db7624df12eb027d497170022e724bc076480a2860.png" },
    { name: "Panner", img: "https://png.pngtree.com/png-vector/20240803/ourmid/pngtree-shahi-paneer-dish-poster-with-creamy-gravy-and-cubes-illustration-food-png-image_13347757.png" },
    { name: "Hotdog", img: "https://robertoalimentare.com/wp-content/uploads/2022/03/HotDog-prodotto_600x600.png" },
    { name: "Donuts", img: "https://www.spar.ch/fileadmin/_processed_/7/f/csm_spar-sortiment-cheesecake-filled-ring-donuts_0d9294a1dc.png" },
    { name: "Pizza", img: "https://www.7-eleven.ca/_next/image?url=https%3A%2F%2Fimages.contentstack.io%2Fv3%2Fassets%2Fbltbb619fd5c667ba2d%2Fblt72594df0910416c2%2F64cac110c26b1a214ac0e365%2FClassic-Pepperoni-Pizza-Product-Card-1600x1600_(1).png&w=3840&q=75" },
    { name: "Burger", img: "https://wrapsnbeyond.com/wp-content/uploads/2025/02/classic-burger.webp" },
];

const Categories = ({ onCategoryChange }) => {
    const carouselRef = useRef();
    const [width, setWidth] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    // Update drag width on mount + resize
    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(
                    carouselRef.current.scrollWidth -
                    carouselRef.current.offsetWidth
                );
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const scroll = (direction) => {
        const scrollAmount = 300;
        const { current } = carouselRef;

        current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const handleCategoryClick = (name) => {
        const newCategory = activeCategory === name ? "All" : name;
        setActiveCategory(newCategory);
        if (onCategoryChange) onCategoryChange(newCategory);
    };

    return (
        <Container>
            <section className="overflow-hidden select-none">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <SectionHeader
                        title="Categories"
                        subtitle=" Browse our top categories to discover different cuisines"
                        icon={UtensilsCrossed}
                    />

                    {/* Scroll Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-neutral-800 flex items-center justify-center hover:bg-[#ffde59] hover:text-black transition-all shadow-sm active:scale-95"
                        >
                            <FiChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-neutral-800 flex items-center justify-center hover:bg-[#ffde59] hover:text-black transition-all shadow-sm active:scale-95"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <Motion.div
                    ref={carouselRef}
                    className="cursor-grab flex scroll-smooth no-scrollbar overflow-hidden"
                    whileTap={{ cursor: "grabbing" }}
                >
                    <Motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-5 p-2"
                    >
                        {categoryData.map((cat, idx) => (
                            <Motion.div
                                key={idx}
                                onClick={() => handleCategoryClick(cat.name)}
                                className="shrink-0 group cursor-pointer"
                            >
                                <div
                                    className={`w-36 h-36 rounded-2xl p-4 flex flex-col items-center justify-center aspect-square border-2 transition-all duration-300
                    ${activeCategory === cat.name
                                            ? "border-[#ffde59] bg-white dark:bg-neutral-800 scale-105"
                                            : "bg-neutral-50 dark:bg-neutral-800 border-transparent hover:border-[#ffde59]/50 hover:bg-white dark:hover:bg-neutral-700"
                                        }`}
                                >
                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="w-16 h-16 object-contain mb-2 transform group-hover:scale-110 transition-transform"
                                    />
                                    <span className="font-bold text-neutral-700 dark:text-gray-200 uppercase text-xs tracking-wider">
                                        {cat.name}
                                    </span>
                                </div>
                            </Motion.div>
                        ))}
                    </Motion.div>
                </Motion.div>
                {/* Hide scrollbar */}
            </section>
        </Container>
    );
};

export default Categories;
