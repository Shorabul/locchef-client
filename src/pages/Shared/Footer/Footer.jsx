import React from "react";
import { motion as Motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowUp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Container from "../../../components/Shared/Container";

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    const currentYear = new Date().getFullYear();

    return (
        <Motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#0f172a] text-white pt-16 border-t border-gray-800 relative"
        >
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 pb-12">

                    {/* 1. Brand Section */}
                    <Motion.div variants={itemVariants} className="lg:col-span-1 xl:col-span-1">
                        <img
                            src="https://i.ibb.co/WNVv4py3/Loc-Chef.png"
                            alt="LocChef Logo"
                            className="w-36 mb-6"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Authentic homemade culinary experiences delivered from local kitchens to your table.
                        </p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#ffde59] hover:text-black transition-all">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </Motion.div>

                    {/* 2. About Section (Updated) */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="text-white font-bold mb-6 text-base uppercase tracking-wider">About</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/about" className="hover:text-[#ffde59] transition font-medium text-white">Our Story</Link></li>
                            <li><Link to="/team" className="hover:text-[#ffde59] transition">Meet the Team</Link></li>
                            <li><Link to="/careers" className="hover:text-[#ffde59] transition">Join the Kitchen (Careers)</Link></li>
                            <li><Link to="/blog" className="hover:text-[#ffde59] transition">Culinary Blog</Link></li>
                        </ul>
                    </Motion.div>

                    {/* 3. Navigation / Explore */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="text-white font-bold mb-6 text-base uppercase tracking-wider">Explore</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/meals" className="hover:text-[#ffde59] transition">Browse Meals</Link></li>
                            <li><Link to="/chefs" className="hover:text-[#ffde59] transition">Top Rated Chefs</Link></li>
                            <li><Link to="/categories" className="hover:text-[#ffde59] transition">Food Categories</Link></li>
                            <li><Link to="/gift-cards" className="hover:text-[#ffde59] transition">Gift Cards</Link></li>
                        </ul>
                    </Motion.div>

                    {/* 4. Contact Section (Updated) */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="text-white font-bold mb-6 text-base uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-[#ffde59] mt-1 shrink-0" />
                                <span>123 Chef Street, Zürich, CH</span>
                            </li>
                            <li>
                                <Link to="/contact" className="flex items-center gap-3 hover:text-[#ffde59] transition font-medium text-white">
                                    <FaEnvelope className="text-[#ffde59] shrink-0" />
                                    <span>Send us a Message</span>
                                </Link>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-[#ffde59] shrink-0" />
                                <span>+41 12 345 6789</span>
                            </li>
                        </ul>
                    </Motion.div>

                    {/* 5. Newsletter */}
                    <Motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
                        <h3 className="text-white font-bold mb-6 text-base uppercase tracking-wider">Join Us</h3>
                        <p className="text-gray-400 text-xs mb-4">Subscribe for exclusive chef interviews and recipes.</p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-[#ffde59] outline-none"
                            />
                            <button className="w-full bg-[#ffde59] text-black font-bold py-3 rounded-xl text-xs hover:bg-white transition-all flex items-center justify-center gap-2">
                                Subscribe <FaPaperPlane size={10} />
                            </button>
                        </form>
                    </Motion.div>

                </div>

                {/* Bottom Bar - Redesigned for Production */}
                <div className="border-t border-gray-800 mt-10">
                    <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-8">

                        {/* Left: Copyright & Developer */}
                        <div className="flex flex-col items-center lg:items-start gap-4 order-2 lg:order-1">
                            <div className="space-y-1 text-center lg:text-left">
                                <p className="text-gray-400 text-sm font-medium">
                                    © {currentYear} <span className="text-[#ffde59]">LocChef Bazaar.</span> All rights reserved.
                                </p>
                                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                                    Handcrafted with <span className="text-red-500 animate-pulse">❤️</span> by
                                    <span className="text-white ml-1.5">Shorabul Hoque</span>
                                </p>
                            </div>

                            {/* Developer Social Links - Using React Icons */}
                            <div className="flex items-center gap-5">
                                <a
                                    href="https://github.com/shorabul"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label="GitHub Profile"
                                >
                                    <FaGithub size={18} />
                                </a>
                                <a
                                    href="https://linkedin.com/in/hoque-shorabul"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-[#0077b5] transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label="LinkedIn Profile"
                                >
                                    <FaLinkedinIn size={18} />
                                </a>
                                <a
                                    href="mailto:hoqueshorabul2@gmail.com"
                                    className="text-gray-500 hover:text-[#ffde59] transition-all duration-300 transform hover:-translate-y-1"
                                    aria-label="Email Developer"
                                >
                                    <FaEnvelope size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Right: Payments & Action */}
                        <div className="flex items-center gap-6 order-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-2xl border border-gray-800">
                                <span className="text-[10px] text-gray-600 font-bold uppercase mr-2 tracking-tighter">Secure Pay:</span>
                                <div className="flex gap-1.5">
                                    {['VISA', 'MC', 'PAY'].map((brand) => (
                                        <div
                                            key={brand}
                                            className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-[8px] font-black text-gray-400 border border-gray-700/50 grayscale hover:grayscale-0 transition-all cursor-default"
                                        >
                                            {brand}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={scrollToTop}
                                aria-label="Scroll to top"
                                className="p-3.5 bg-gray-800 hover:bg-[#ffde59] text-[#ffde59] hover:text-black rounded-xl transition-all duration-300 group shadow-2xl active:scale-90"
                            >
                                <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>

                    </div>
                </div>
            </Container>
        </Motion.footer>
    );
};

export default Footer;