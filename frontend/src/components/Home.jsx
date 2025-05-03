import React from "react";
import { Link } from "react-router-dom";
import Navbar2 from "./Navbar2";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundImage: "url('/bg2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <Navbar2 />
      
      <div className="absolute inset-0 bg-black/30" />

      <motion.div 
        className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 h-full flex flex-col justify-center items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.div
          className="relative p-8 rounded-2xl overflow-hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
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
          
          {/* Mathematical pattern overlay */}
          <motion.div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 0),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 0)
              `,
              backgroundSize: '60px 60px',
            }}
            animate={{
              backgroundPosition: ['0 0', '30px 30px'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.h1 
            className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Let's make your day filled with lots of pleasure
          </motion.h1>
        </motion.div>

        <motion.div 
          className="flex gap-6 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/contact"
            className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{ textDecoration: 'none' }}
          >
            Contact-us
          </Link>
          <Link 
            to="/about" 
            className="bg-white hover:bg-gray-100 text-amber-600 px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            style={{ textDecoration: 'none' }}
          >
            About-us
          </Link>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="relative p-8 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* Animated background for circles */}
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                background: [
                  "linear-gradient(45deg,rgb(5, 183, 233) 60%,rgb(255, 255, 255) 30%, #4ECDC4 10%)",
                  "linear-gradient(135deg,rgb(5, 183, 233) 60%, rgb(255, 255, 255), #4ECDC4 10%)",
                  "linear-gradient(225deg,rgb(5, 183, 233), rgb(255, 255, 255), #4ECDC4 10%)",
                  "linear-gradient(315deg, rgb(5, 183, 233), rgb(255, 255, 255), #4ECDC4 10%)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Mathematical pattern overlay */}
            <motion.div
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 0),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 0)
                `,
                backgroundSize: '40px 40px',
              }}
              animate={{
                backgroundPosition: ['0 0', '20px 20px'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative z-10 flex gap-6">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-amber-100 rounded-full shadow-lg"
              />
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-amber-100 rounded-full shadow-lg"
              />
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-amber-100 rounded-full shadow-lg"
              />
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-amber-100 rounded-full shadow-lg"
              />
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-16 h-16 bg-amber-100 rounded-full shadow-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Home;
