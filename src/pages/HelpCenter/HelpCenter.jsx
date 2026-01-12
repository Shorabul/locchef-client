import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MessageCircle,
    FileText,
    Truck,
    CreditCard,
    ShieldCheck,
    ChevronDown,
    Mail,
    Phone
} from 'lucide-react';
import Container from '../../components/Shared/Container';

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFaq, setActiveFaq] = useState(null);

    const helpCards = [
        { icon: <Truck size={24} />, title: "Ordering & Delivery", desc: "Track your meal and delivery status." },
        { icon: <CreditCard size={24} />, title: "Payments & Refunds", desc: "Issues with transactions or credits." },
        { icon: <ShieldCheck size={24} />, title: "Account & Security", desc: "Manage your profile and privacy." },
        { icon: <MessageCircle size={24} />, title: "Chef Support", desc: "Communication with our local chefs." }
    ];

    const faqs = [
        { q: "How do I place an order?", a: "Browse the meals, add them to your cart, and proceed to checkout using our secure payment system." },
        { q: "Can I cancel my order?", a: "Orders can be canceled within 10 minutes of placement. After that, the chef may have already started cooking." },
        { q: "Is the food prepared in a licensed kitchen?", a: "All LocChef creators must adhere to local health and safety regulations in their respective districts." }
    ];

    return (
        <Container>
            <section className="py-12 lg:py-20 max-w-5xl mx-auto">
                {/* --- Header & Search --- */}
                <div className="text-center mb-16">
                    <Motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black mb-6"
                    >
                        How can we <span className="text-[#ffde59]">help you?</span>
                    </Motion.h1>
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for articles, topics, or keywords..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border-none outline-none focus:ring-2 focus:ring-[#ffde59] transition-all"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* --- Quick Actions Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {helpCards.map((card, i) => (
                        <Motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-[#ffde59]/10 text-[#ffde59] rounded-xl flex items-center justify-center mb-4">
                                {card.icon}
                            </div>
                            <h3 className="font-bold mb-2">{card.title}</h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                {card.desc}
                            </p>
                        </Motion.div>
                    ))}
                </div>

                {/* --- FAQ Accordion --- */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <FileText className="text-[#ffde59]" /> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between py-2 text-left hover:text-[#ffde59] transition-colors"
                                >
                                    <span className="font-semibold text-lg">{faq.q}</span>
                                    <ChevronDown className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                                </button>
                                <AnimatePresence>
                                    {activeFaq === i && (
                                        <Motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="py-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </Motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Contact Support Footer --- */}
                <div className="bg-neutral-900 dark:bg-neutral-800 rounded-[2rem] p-8 md:p-12 text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
                    <p className="text-neutral-400 mb-8 max-w-lg mx-auto">
                        Our support team is available 24/7 to assist you with any culinary queries or technical issues.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="mailto:support@locchef.com" className="flex items-center gap-3 px-8 py-4 bg-[#ffde59] text-black font-bold rounded-xl hover:scale-105 transition-transform">
                            <Mail size={20} /> Email Us
                        </a>
                        <button className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all">
                            <MessageCircle size={20} /> Live Chat
                        </button>
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default HelpCenter;