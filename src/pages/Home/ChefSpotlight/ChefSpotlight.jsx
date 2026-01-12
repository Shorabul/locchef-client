import React from "react";
import { motion as Motion } from "framer-motion";
import Container from "../../../components/Shared/Container";
import { UtensilsCrossed, Award, ArrowRight } from "lucide-react";

const ChefSpotlight = () => {
    const chef = {
        name: "Chef Marco Bianchi",
        image: "https://i.ibb.co/BV1W2z93/Marco-Bianchi.jpg",
        experience: "10 years of experience",
        specialty: "American & Italian Cuisine",
        bio: "Passionate about bringing authentic homemade flavors to the community. Known for his signature Fried Chicken and warm hospitality.",
        chefId: "chef_101"
    };

    return (
        <Container>
            <section className="w-full">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Section */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="bg-yellow-100 p-3 rounded-full mb-4">
                            <UtensilsCrossed className="text-[#ffde59] w-8 h-8" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                        font-bold flex justify-center items-center gap-3">
                            Chef Spotlight
                        </h2>
                        <div className="h-1.5 w-20 bg-[#ffde59] mt-4 rounded-full"></div>
                    </div>

                    {/* Main Card */}
                    <div className="relative bg-white border border-neutral-100 dark:bg-neutral-700 dark:border-neutral-600 shadow rounded-3xl overflow-hidden md:flex items-center p-6 md:p-10 gap-10">
                        {/* Image Side */}
                        <div className="flex-shrink-0 mb-6 md:mb-0 relative">
                            <div className="absolute inset-0 bg-[#ffde59] rounded-2xl rotate-6 -z-10 scale-95 opacity-50"></div>
                            <img
                                src={chef.image}
                                alt={chef.name}
                                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl object-cover shadow-md border-4 border-white"
                            />
                        </div>

                        {/* Content Side */}
                        <div className="flex-grow text-left">
                            <div className="flex items-center gap-2 mb-2 text-[#ffde59] font-bold text-sm uppercase tracking-wider">
                                <Award size={18} />
                                <span>Featured Expert</span>
                            </div>

                            <h3 className="text-2xl md:text-4xl font-bold mb-2">
                                {chef.name}
                            </h3>

                            <p className="text-neutral-500 dark:text-neutral-300 font-medium mb-4 flex items-center gap-2">
                                {chef.experience} • <span className="text-neutral-400 dark:text-neutral-200">{chef.specialty}</span>
                            </p>

                            <p className="text-neutral-600 dark:text-neutral-500 leading-relaxed text-lg mb-8 italic">
                                "{chef.bio}"
                            </p>

                            <button
                                className="group flex items-center gap-3 bg-neutral-900 text-white px-8 py-4 rounded-xl hover:bg-neutral-800 transition-all duration-300 font-bold shadow-lg hover:shadow-yellow-200"
                            >
                                View {chef.name.split(' ')[1]}'s Menu
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </button>
                        </div>
                    </div>
                </Motion.div>
            </section>
        </Container>
    );
};

export default ChefSpotlight;