import React from 'react';
import { motion as Motion } from "framer-motion";
import { FiTarget, FiHeart, FiUsers, FiAward } from "react-icons/fi";
import Container from '../../components/Shared/Container';
import { House } from 'lucide-react';

const About = () => {
    return (
        <Container>
            <div className="py-4 lg:py-8 space-y-20">
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-center font-bold text-2xl">About</h1>
                    <p className="flex gap-2">
                        <span className="opacity-80 flex items-center gap-2">
                            <House size={16} />Home
                        </span>
                        <span> / about</span>
                    </p>
                </div>
                {/* Hero Section: The Mission */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-[#ffde59] font-bold tracking-widest uppercase text-sm">Our Story</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Bringing the Taste of <span className="text-[#ffde59]">Home</span> to Your Table
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                            Locchef started with a simple idea: everyone deserves access to fresh, healthy, homemade meals, and every talented home chef deserves a platform to shine. We bridge the gap between passion and hunger.
                        </p>
                        <div className="flex gap-4">
                            <div className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 border-b-4 border-[#ffde59]">
                                <h3 className="text-2xl font-bold">500+</h3>
                                <p className="text-xs text-gray-500 uppercase">Home Chefs</p>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800 border-b-4 border-[#ffde59]">
                                <h3 className="text-2xl font-bold">10k+</h3>
                                <p className="text-xs text-gray-500 uppercase">Happy Foodies</p>
                            </div>
                        </div>
                    </Motion.div>

                    <Motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
                            alt="Chef cooking"
                            className="rounded-3xl shadow-2xl relative z-10"
                        />
                        <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#ffde59] rounded-3xl -z-0 hidden md:block" />
                    </Motion.div>
                </div>

                {/* Values Section */}
                <div className="bg-gray-50 dark:bg-neutral-900/50 rounded-[3rem] p-10 md:p-16">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h2>
                        <p className="text-gray-500">We aren't just a delivery service; we're a community built on four core pillars.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard
                            icon={FiHeart}
                            title="Authentic Flavors"
                            desc="Real recipes passed down through generations, cooked with love."
                        />
                        <ValueCard
                            icon={FiTarget}
                            title="Empowering Chefs"
                            desc="Providing local talent with the tools to build their own food business."
                        />
                        <ValueCard
                            icon={FiAward}
                            title="Quality First"
                            desc="Rigorous hygiene checks and fresh ingredients in every single meal."
                        />
                        <ValueCard
                            icon={FiUsers}
                            title="Community"
                            desc="Building a sustainable ecosystem for local food lovers and creators."
                        />
                    </div>
                </div>

                {/* Call to Action */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-[#ffde59] rounded-3xl p-10 text-center text-black"
                >
                    <h2 className="text-3xl font-extrabold mb-4">Ready to taste the difference?</h2>
                    <p className="text-lg mb-8 opacity-90">Join thousands of people discovering local home-cooked treasures.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-neutral-800 transition-colors">
                            Browse Meals
                        </button>
                        <button className="px-8 py-3 bg-white text-black rounded-xl font-bold border-2 border-black hover:bg-gray-100 transition-colors">
                            Join as a Chef
                        </button>
                    </div>
                </Motion.div>
            </div>
        </Container>
    );
};

// Internal Component for Values
const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-lg bg-[#ffde59]/20 flex items-center justify-center text-[#ffde59] mb-6">
            {React.createElement(icon, { size: 24 })}
        </div>
        <h4 className="text-xl font-bold mb-3">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default About;