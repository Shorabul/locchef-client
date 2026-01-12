import React from "react";
import { motion as Motion } from "framer-motion";

const SectionHeader = ({
    title,
    subtitle,
    icon: Icon,
    className = "",
    center = false // Changed default to false for standard left alignment
}) => {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`mb-10 ${center ? "text-center" : "text-left"} ${className}`}
        >
            {/* Title & Icon Container */}
            <div className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : "justify-start"}`}>
                {Icon && (
                    <Icon className="text-[#ffde59] size-6 sm:size-8 md:size-10 lg:size-12 shrink-0" />
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    {title}
                </h2>
            </div>

            {/* Subtitle with decorative accent */}
            {subtitle && (
                <div className={`flex flex-col ${center ? "items-center" : "items-start"}`}>
                    <p className="max-w-2xl text-neutral-500 dark:text-neutral-400 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Decorative brand line */}
                    <Motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 60 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-1.5 bg-[#ffde59] mt-4 rounded-full"
                    />
                </div>
            )}
        </Motion.div>
    );
};

export default SectionHeader;
