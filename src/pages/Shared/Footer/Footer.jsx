import React from "react";
import { motion as Motion } from "framer-motion";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPaperPlane,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowUp,
    FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import Container from "../../../components/Shared/Container";
import "./Footer.css";

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <Motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#0f172a] text-white pt-16 pb-4 border-t border-gray-800"
        >
            <Container>

                {/* ================= MAIN GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-10 pb-12">

                    {/* ---------- Brand ---------- */}
                    <Motion.div variants={itemVariants} className="xl:col-span-2">
                        <img
                            src="https://i.ibb.co/WNVv4py3/Loc-Chef.png"
                            alt="LocChef Logo"
                            className="w-36 mb-6"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Authentic homemade culinary experiences delivered from local kitchens to your table.
                        </p>

                        <div className="flex gap-3">
                            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map(
                                (Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        aria-label="Social link"
                                        className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center
                               hover:bg-[#ffde59] hover:text-black transition"
                                    >
                                        <Icon size={15} />
                                    </a>
                                )
                            )}
                        </div>
                    </Motion.div>

                    {/* ---------- Company ---------- */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="footer-title">Company</h3>
                        <ul className="footer-links">
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/team">Meet the Team</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </Motion.div>

                    {/* ---------- Explore ---------- */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="footer-title">Explore</h3>
                        <ul className="footer-links">
                            <li><Link to="/meals">Browse Meals</Link></li>
                            <li><Link to="/chefs">Top Rated Chefs</Link></li>
                            <li><Link to="/categories">Food Categories</Link></li>
                            <li><Link to="/gift-cards">Gift Cards</Link></li>
                        </ul>
                    </Motion.div>

                    {/* ---------- Support ---------- */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="footer-title">Support</h3>
                        <ul className="footer-links">
                            <li><Link to="/help-center">Help Center</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                            <li><Link to="/how-it-works">How It Works</Link></li>
                            <li><Link to="/become-chef">Become a Chef</Link></li>
                        </ul>
                    </Motion.div>

                    {/* ---------- Contact ---------- */}
                    <Motion.div variants={itemVariants}>
                        <h3 className="footer-title">Contact</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex gap-3">
                                <FaMapMarkerAlt className="text-[#ffde59]" />
                                Zürich, Switzerland
                            </li>
                            <li>
                                <Link to="/contact" className="flex gap-3 font-medium text-white hover:text-[#ffde59]">
                                    <FaEnvelope className="text-[#ffde59]" />
                                    Send us a Message
                                </Link>
                            </li>
                            <li className="flex gap-3">
                                <FaPhoneAlt className="text-[#ffde59]" />
                                +41 12 345 6789
                            </li>
                        </ul>
                    </Motion.div>

                </div>

                {/* ================= Bottom Bar - Redesigned for Production ================= */}
                <div className="border-t border-gray-800 mt-10">
                    <div className="py-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Left: Copyright & Developer */}
                        <div className="flex flex-col items-center lg:items-start gap-4 order-2 lg:order-1">
                            <div className="flex flex-col items-center md:items-start gap-2">
                                <p className="text-gray-500 text-xs">
                                    © {currentYear} <span className="text-[#ffde59] font-semibold">LocChef Bazaar.</span> All rights reserved.
                                </p>
                                <div className="flex gap-4 text-[10px] text-gray-600 uppercase font-bold tracking-widest">
                                    <Link to="/privacy" className="hover:text-white">Privacy</Link>
                                    <Link to="/terms" className="hover:text-white">Terms</Link>
                                    <Link to="/cookies" className="hover:text-white">Cookies</Link>
                                    <p>Developed by <span className="text-white">Shorabul Hoque</span></p>
                                </div>
                            </div>
                            {/* Developer Social Links - Using React Icons */}
                            <div className="flex items-center gap-5"> <a href="https://github.com/shorabul" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="GitHub Profile" > <FaGithub size={18} /> </a> <a href="https://linkedin.com/in/hoque-shorabul" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0077b5] transition-all duration-300 transform hover:-translate-y-1" aria-label="LinkedIn Profile" > <FaLinkedinIn size={18} /> </a> <a href="mailto:hoqueshorabul2@gmail.com" className="text-gray-500 hover:text-[#ffde59] transition-all duration-300 transform hover:-translate-y-1" aria-label="Email Developer" > <FaEnvelope size={18} /> </a> </div> </div> {/* Right: Payments & Action */} <div className="flex items-center gap-6 order-3"> <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-2xl border border-gray-800"> <span className="text-[10px] text-gray-600 font-bold uppercase mr-2 tracking-tighter">Secure Pay:</span> <div className="flex gap-1.5"> {['VISA', 'MC', 'PAY'].map((brand) => (<div key={brand} className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-[8px] font-black text-gray-400 border border-gray-700/50 grayscale hover:grayscale-0 transition-all cursor-default" > {brand} </div>))} </div> </div> <button onClick={scrollToTop} aria-label="Scroll to top" className="p-3.5 bg-gray-800 hover:bg-[#ffde59] text-[#ffde59] hover:text-black rounded-xl transition-all duration-300 group shadow-2xl active:scale-90" > <FaArrowUp className="group-hover:-translate-y-1 transition-transform" /> </button> </div> </div> </div>
            </Container>
        </Motion.footer>
    );
};

export default Footer;