import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import PopularMeals from '../PopularMeals/PopularMeals';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import HowToOrder from '../HowToOrder/HowToOrder';
import NewsletterBanner from '../NewsletterBanner/NewsletterBanner';
import ChefSpotlight from '../ChefSpotlight/ChefSpotlight';
import FAQ from '../FAQ/FAQ';
import Categories from '../Categories/Categories';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { LuArrowUp, LuArrowDown } from "react-icons/lu";

const Home = () => {
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        document.title = "Locchef | Home";

        const handleScroll = () => {
            // Show buttons after scrolling 300px
            if (window.scrollY > 300) {
                setShowButtons(true);
            } else {
                setShowButtons(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToBottom = () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });

    return (
        <div className='space-y-30 relative'>
            <Banner />
            <Categories />
            <PopularMeals />
            <HowToOrder />
            <CustomerReviews />
            <ChefSpotlight />
            <FAQ />
            {/* <NewsletterBanner /> */}

            {/* Floating Navigation Buttons */}
            <AnimatePresence>
                {showButtons && (
                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
                    >
                        {/* Scroll Up */}
                        <button
                            onClick={scrollToTop}
                            className="p-3 bg-[#ffde59] text-black rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
                            aria-label="Scroll to top"
                        >
                            <LuArrowUp className="size-6 group-hover:-translate-y-1 transition-transform" />
                        </button>

                        {/* Scroll Down */}
                        <button
                            onClick={scrollToBottom}
                            className="p-3 bg-neutral-800 text-white rounded-full shadow-lg hover:bg-[#ffde59] hover:text-black transition-all duration-300 group"
                            aria-label="Scroll to bottom"
                        >
                            <LuArrowDown className="size-6 group-hover:translate-y-1 transition-transform" />
                        </button>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;