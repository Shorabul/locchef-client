import React from "react";
import { Laptop, Book, ShoppingCart, Scooter, UtensilsCrossed } from "lucide-react";
import { motion as Motion } from "framer-motion";
import Container from "../../../components/Shared/Container";

const steps = [
    {
        icon: <Laptop size={40} />,
        title: "Choose your location",
        description: "Select your delivery area for available chefs",
    },
    {
        icon: <Book size={40} />,
        title: "Choose restaurant",
        description: "Pick your favorite chef or meal menu",
    },
    {
        icon: <ShoppingCart size={40} />,
        title: "Make your order",
        description: "Select meals and confirm your order",
    },
    {
        icon: <Scooter size={40} />,
        title: "Food is on the way",
        description: "Track delivery in real-time",
    },
];

const HowToOrder = () => {
    return (
        <Container>
            <section className="py-16">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold flex justify-center items-center gap-2">
                        <UtensilsCrossed className="text-[#ffde59] text-5 sm:text-6 md:size-7 lg:text-9 xl:size-10 " />
                        How to order?
                    </h1>
                    <p className="mt-2 text-neutral-500 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                        Follow the Steps
                    </p>
                </Motion.div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {steps.map((step, index) => (
                        <Motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center max-w-xs text-center"
                        >
                            <div className="bg-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
                                {index + 1}
                            </div>
                            <div className="mb-4 text-yellow-500">{step.icon}</div>
                            <h3 className="font-semibold text-lg">{step.title}</h3>
                            <p className="text-gray-500 text-sm">{step.description}</p>
                        </Motion.div>
                    ))}
                </div>
            </section>
        </Container>
    );
};

export default HowToOrder;