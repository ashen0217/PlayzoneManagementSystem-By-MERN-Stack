import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar2 from "./Navbar2";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar2 />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-screen w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/bg2.png')" }}
      >
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-purple-900/60" />

        {/* Animated floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.7)`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200, -300, 0],
              x: [0, 50, -50, 100, 0],
              opacity: [0.3, 0.8, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        <motion.div 
          className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 h-full flex flex-col justify-center items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden max-w-4xl backdrop-blur-sm"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              background: "rgba(15, 12, 41, 0.5)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Dynamic gradient overlay */}
            <motion.div
              className="absolute inset-0 z-0 opacity-60"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 30%, #ff008c, transparent 50%), radial-gradient(circle at 80% 70%, #00ffcc, transparent 50%)",
                  "radial-gradient(circle at 30% 70%, #ff008c, transparent 50%), radial-gradient(circle at 70% 30%, #00ffcc, transparent 50%)",
                  "radial-gradient(circle at 50% 20%, #ff008c, transparent 50%), radial-gradient(circle at 50% 80%, #00ffcc, transparent 50%)",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.h1 
              className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 leading-tight"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{
                background: "linear-gradient(90deg, #ff8a00, #e52e71, #00ffcc)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              Let's make your day filled with lots of pleasure
            </motion.h1>

            {/* Playzone Pro heading with enhanced animation */}
            <motion.div
              className="relative z-10 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.h2
                className="text-5xl md:text-5xl lg:text-6xl font-black text-center tracking-tighter"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255, 138, 0, 0.7)",
                    "0 0 20px rgba(255, 138, 0, 0.9)",
                    "0 0 30px rgba(255, 138, 0, 1)",
                    "0 0 20px rgba(255, 138, 0, 0.9)",
                  ],
                  
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: "linear-gradient(90deg, #ff8a00, #ff00cc, #00ffcc)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                <span className="text-5xl">
                PLAY</span><span className="text-white text-5xl">ZONE</span> <span className="text-amber-200 text-5xl">PRO</span>
              </motion.h2>
            </motion.div>

            {/* Animated decorative elements */}
            <motion.div 
              className="flex justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    background: [
                      "#ff008c",
                      "#00ffcc",
                      "#ff8a00",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced buttons with floating effect */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-xl"
              style={{
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  background: [
                    "linear-gradient(45deg, #ff8a00, #e52e71)",
                    "linear-gradient(135deg, #ff8a00, #e52e71)",
                    "linear-gradient(225deg, #ff8a00, #e52e71)",
                    "linear-gradient(315deg, #ff8a00, #e52e71)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />
              <Link
                to="/contact"
                className="relative z-10 block px-8 py-4 text-lg font-bold text-white"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-xl"
              style={{
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  background: [
                    "linear-gradient(45deg, #00ffcc, #0088ff)",
                    "linear-gradient(135deg, #00ffcc, #0088ff)",
                    "linear-gradient(225deg, #00ffcc, #0088ff)",
                    "linear-gradient(315deg, #00ffcc, #0088ff)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              />
              <Link 
                to="/about" 
                className="relative z-10 block px-8 py-4 text-lg font-bold text-white"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating animated shapes at bottom */}
          <motion.div 
            className="absolute bottom-10 left-0 right-0 flex justify-center gap-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {['triangle', 'circle', 'square'].map((shape, i) => (
              <motion.div
                key={i}
                className="w-12 h-12"
                style={{
                  background: i === 0 ? 'linear-gradient(45deg, #ff008c, #ff8a00)' : 
                              i === 1 ? 'linear-gradient(45deg, #00ffcc, #0088ff)' : 
                                       'linear-gradient(45deg, #7700ff, #ff00cc)',
                  clipPath: i === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                             i === 1 ? 'circle(50% at 50% 50%)' : 'none',
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;