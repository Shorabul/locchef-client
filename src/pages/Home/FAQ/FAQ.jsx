import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSearch, FiUser, FiTruck, FiShoppingBag } from "react-icons/fi";
import Container from '../../../components/Shared/Container';

const faqData = [
    {
        category: "General",
        icon: FiSearch,
        questions: [
            { q: "What is Locchef?", a: "Locchef is a marketplace that connects local home chefs with food lovers looking for fresh, homemade meals." },
            { q: "Is the food hygienic?", a: "Absolutely. All our chefs undergo a rigorous kitchen inspection and hygiene certification process before joining." }
        ]
    },
    {
        category: "Ordering",
        icon: FiShoppingBag,
        questions: [
            { q: "How do I place an order?", a: "Browse the meals, select your favorites, choose the quantity, and proceed to checkout using our secure Stripe payment gateway." },
            { q: "Can I cancel my order?", a: "Orders can be cancelled within 15 minutes of placement. After that, the chef may have already started preparing your fresh meal." }
        ]
    },
    {
        category: "For Chefs",
        icon: FiUser,
        questions: [
            { q: "How do I become a Locchef?", a: "Click on 'Join as a Chef' in the footer or About page, fill out the application, and our team will contact you for a tasting session." },
            { q: "When do I get paid?", a: "Payments are processed weekly and sent directly to your registered bank account after platform commissions." }
        ]
    }
];

const FAQ = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container>
            <div className="">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3">How can we <span className="text-[#ffde59]">help?</span></h1>
                    <p className="text-gray-500">Find answers to common questions about ordering, cooking, and delivery.</p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {faqData.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${activeTab === idx
                                ? "bg-[#ffde59] text-neutral-800"
                                : "bg-gray-100 dark:bg-neutral-800 text-gray-500 hover:bg-gray-200"
                                }`}
                        >
                            <item.icon />
                            {item.category}
                        </button>
                    ))}
                </div>

                {/* Accordion List */}
                <div className="max-w-3xl mx-auto space-y-4">
                    <AnimatePresence mode="wait">
                        <Motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {faqData[activeTab].questions.map((item, idx) => (
                                <AccordionItem key={idx} question={item.q} answer={item.a} />
                            ))}
                        </Motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </Container>
    );
};

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 dark:border-neutral-800 rounded-2xl overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
                <span className="font-bold text-lg">{question}</span>
                <Motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <FiChevronDown className="text-[#ffde59] text-xl" />
                </Motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <Motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white dark:bg-neutral-900 px-5 pb-5"
                    >
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-neutral-800 pt-4">
                            {answer}
                        </p>
                    </Motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FAQ;