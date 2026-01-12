import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import Container from '../../components/Shared/Container';

const Blog = () => {
    // Sample Data - In a real app, this would come from your Backend
    const posts = [
        {
            id: 1,
            title: "5 Secrets to Making the Perfect Swiss Fondue at Home",
            excerpt: "Learn the traditional techniques from local Zürich chefs to get that perfect creamy consistency every time.",
            author: "Chef Marc",
            date: "Jan 12, 2026",
            readTime: "5 min read",
            category: "Cooking Tips",
            image: "https://images.unsplash.com/photo-1553527922-767df645c5f6?auto=format&fit=crop&q=80&w=800",
            featured: true
        },
        {
            id: 2,
            title: "Why Locally Sourced Ingredients Change Everything",
            excerpt: "Discover how farm-to-table cooking impacts the flavor profile of your daily meals.",
            author: "Elena Rossi",
            date: "Jan 10, 2026",
            readTime: "4 min read",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "The Rise of Home Chefs in the Digital Age",
            excerpt: "How platforms like LocChef are empowering local talent to share their culture through food.",
            author: "Admin",
            date: "Jan 08, 2026",
            readTime: "6 min read",
            category: "Community",
            image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const featuredPost = posts.find(p => p.featured);
    const regularPosts = posts.filter(p => !p.featured);

    return (
        <Container>
            <section className="py-12 lg:py-20">
                {/* --- Header Section --- */}
                <div className="text-center mb-16">
                    <Motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
                    >
                        Culinary <span className="text-[#ffde59]">Stories</span>
                    </Motion.h1>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                        Explore recipes, chef interviews, and the culture behind the homemade meals you love.
                    </p>
                </div>

                {/* --- Featured Post --- */}
                {featuredPost && (
                    <Motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group cursor-pointer mb-20 overflow-hidden rounded-3xl bg-neutral-900 aspect-[21/9]"
                    >
                        <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
                            <span className="bg-[#ffde59] text-black px-4 py-1 rounded-full text-sm font-bold w-fit mb-4">
                                {featuredPost.category}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
                                {featuredPost.title}
                            </h2>
                            <div className="flex flex-wrap items-center gap-6 text-neutral-300 text-sm">
                                <span className="flex items-center gap-2"><User size={16} className="text-[#ffde59]" /> {featuredPost.author}</span>
                                <span className="flex items-center gap-2"><Calendar size={16} /> {featuredPost.date}</span>
                                <span className="flex items-center gap-2"><Clock size={16} /> {featuredPost.readTime}</span>
                            </div>
                        </div>
                    </Motion.div>
                )}

                {/* --- Regular Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {regularPosts.map((post, index) => (
                        <Motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col group"
                        >
                            <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video">
                                <img
                                    src={post.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    alt={post.title}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-[#ffde59] transition-colors leading-snug">
                                {post.title}
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 line-clamp-2">
                                {post.excerpt}
                            </p>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-neutral-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#ffde59]/20 flex items-center justify-center text-xs font-bold text-[#ffde59]">
                                        {post.author[0]}
                                    </div>
                                    <span className="text-xs font-medium">{post.author}</span>
                                </div>
                                <button className="text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Read More <ArrowRight size={16} className="text-[#ffde59]" />
                                </button>
                            </div>
                        </Motion.div>
                    ))}
                </div>

                {/* --- Newsletter Section --- */}
                <Motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 bg-[#ffde59] rounded-[2rem] p-10 md:p-20 flex flex-col items-center text-center text-black"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-6 italic">Hungry for more?</h2>
                    <p className="text-lg mb-10 max-w-xl font-medium opacity-80">
                        Join 5,000+ foodies getting weekly recipes and exclusive chef stories.
                    </p>
                    <div className="w-full max-w-md relative">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none bg-white pr-36"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-6 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                            Join <ArrowRight size={18} />
                        </button>
                    </div>
                </Motion.div>
            </section>
        </Container>
    );
};

export default Blog;