import React from 'react';
import { motion as Motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";
import Container from '../../components/Shared/Container';
import { House } from 'lucide-react';

const Contact = () => {
    const isDark = document.documentElement.classList.contains("dark");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically integrate with EmailJS or your backend
        Swal.fire({
            title: "Message Sent!",
            text: "Our team will get back to you within 24 hours.",
            icon: "success",
            background: isDark ? "#262626" : "#ffffff",
            color: isDark ? "#ffffff" : "#262626",
            confirmButtonColor: "#ffde59",
        });
        e.target.reset();
    };

    return (
        <Container>
            <div className="py-4 lg:py-8">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-6">
                    <h1 className="text-center font-bold text-2xl">Contact</h1>
                    <p className="flex gap-2">
                        <span className="opacity-80 flex items-center gap-2">
                            <House size={16} />Home
                        </span>
                        <span> / contact</span>
                    </p>
                </div>
                {/* Header Section */}
                <Motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-2xl mx-auto mb-6"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Get in <span className="text-[#ffde59]">Touch</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Have questions about a meal or want to join as a chef? We're here to help you bring fresh flavors to your doorstep.
                    </p>
                </Motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <ContactInfoCard
                            icon={FiPhone}
                            title="Call Us"
                            detail="+41 12 345 6789"
                            subDetail="Mon-Fri, 9am-6pm"
                        />
                        <ContactInfoCard
                            icon={FiMail}
                            title="Email Us"
                            detail="support@locchef.com"
                            subDetail="Online support 24/7"
                        />
                        <ContactInfoCard
                            icon={FiMapPin}
                            title="Visit Us"
                            detail="123 Foodie Street"
                            subDetail="Zürich, Switzerland"
                        />
                        <ContactInfoCard
                            icon={FiClock}
                            title="Working Hours"
                            detail="08:00 AM - 10:00 PM"
                            subDetail="Every single day"
                        />
                    </div>

                    {/* Contact Form */}
                    <Motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 bg-white dark:bg-neutral-800 p-8 md:p-10 rounded-3xl border border-neutral-100 dark:border-neutral-700"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold px-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-neutral-700 bg-transparent focus:border-[#ffde59] outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold px-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-neutral-700 bg-transparent focus:border-[#ffde59] outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold px-1">Subject</label>
                                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-neutral-700 bg-transparent focus:border-[#ffde59] outline-none transition-all appearance-none">
                                    <option className="dark:bg-neutral-800">General Inquiry</option>
                                    <option className="dark:bg-neutral-800">Become a Chef</option>
                                    <option className="dark:bg-neutral-800">Order Issue</option>
                                    <option className="dark:bg-neutral-800">Feedback</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold px-1">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-neutral-700 bg-transparent focus:border-[#ffde59] outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <Motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full md:w-max px-10 py-4 bg-[#ffde59] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 scale-95"
                            >
                                <FiSend className="text-lg" />
                                Send Message
                            </Motion.button>
                        </form>
                    </Motion.div>
                </div>
            </div>
        </Container>
    );
};

// Internal Sub-component for Info Cards
const ContactInfoCard = ({ icon: Icon, title, detail, subDetail }) => (
    <Motion.div
        whileHover={{ y: -5 }}
        className="flex items-center gap-5 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-transparent hover:border-[#ffde59]/30 transition-all"
    >
        <div className="w-12 h-12 rounded-xl bg-[#ffde59]/10 flex items-center justify-center text-[#ffde59] shrink-0">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider">{title}</h4>
            <p className="font-bold text-lg">{detail}</p>
            <p className="text-sm text-gray-500">{subDetail}</p>
        </div>
    </Motion.div>
);

export default Contact;