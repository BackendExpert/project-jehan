import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const HeroSection = () => {
    const auth = useAuth()
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white bg-neutral-900">
            {/* Background Image - Desktop */}
            <div
                className="absolute inset-0 bg-cover bg-center hidden md:block"
                style={{
                    backgroundImage:
                        "url('https://wallpapercave.com/wp/wp13669855.jpg')",
                }}
            />

            {/* Background Image - Mobile */}
            <div
                className="absolute inset-0 bg-cover bg-center md:hidden"
                style={{
                    backgroundImage:
                        "url('https://wallpapercave.com/wp/wp15376630.jpg')",
                }}
            />

            {/* Neutral Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-900/90 backdrop-blur-sm" />

            {/* Subtle Glow Elements */}
            <div className="absolute -top-32 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl animate-pulse" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6 max-w-4xl"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg"
                >
                    Organize Your Notes Effortlessly 🗒️
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-lg md:text-2xl text-gray-200 mb-10"
                >
                    Create, edit, and manage all your study notes in one secure place.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <div className="">
                        {
                            auth.user ?
                                <a href="/">
                                    <button className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-gray-200 transition-transform duration-300">
                                        Get Started
                                    </button>
                                </a>
                                :
                                <a href="/login">
                                    <button className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-gray-200 transition-transform duration-300">
                                        Get Started
                                    </button>
                                </a>
                        }
                    </div>


                    <a href="/how-to-use">
                        <button className="border border-white/80 px-8 py-3 rounded-full text-white hover:bg-white hover:text-black transition duration-300">
                            Learn More
                        </button>
                    </a>

                </motion.div>
            </motion.div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
};

export default HeroSection;
