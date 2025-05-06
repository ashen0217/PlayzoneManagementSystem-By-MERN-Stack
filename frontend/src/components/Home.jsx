import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./Navbar2";

const Home = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg10.png')" }}
    >
      <Navbar />
      <br />
      <br />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <motion.div
        className="relative z-10 px-6 py-72 rounded-2xl overflow-hidden shadow-2xl text-center w-[90%] max-w-7xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            rotate: [0, -360], // Rotate anticlockwise
            background: [
              "linear-gradient(45deg, #FFB800 60%, #FF6B6B 30%, #4ECDC4 10%)",
              "linear-gradient(135deg, #FFB800 60%, #FF6B6B 30%, #4ECDC4 10%)",
              "linear-gradient(225deg, #FFB800 60%, #FF6B6B 30%, #4ECDC4 10%)",
              "linear-gradient(315deg, #FFB800 60%, #FF6B6B 30%, #4ECDC4 10%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Animated radial overlay */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 0),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 0)
            `,
            backgroundSize: "40px 40px",
          }}
          animate={{
            backgroundPosition: ["0 0", "20px 20px"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main animated heading */}
        <motion.h1
          className="relative z-10 text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Let&apos;s Make Your Day <br />
          <span className="text-amber-50">
            Filled With Lot&apos;s of Pleasure
          </span>
        </motion.h1>

        {/* Navigation Links */}
        <div className="relative z-10 mt-10 flex gap-6 justify-center">
          <Link
            to="/contact"
            className="bg-blue-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="bg-blue-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            About Us
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
