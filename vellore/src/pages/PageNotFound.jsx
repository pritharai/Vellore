import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black px-6">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[8rem] font-extrabold text-primary drop-shadow-lg"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-400 text-center max-w-lg mb-8"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back on track.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-2xl shadow-lg transition-all duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
