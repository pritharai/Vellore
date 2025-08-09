// pages/AuthPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();


  // 🔒 3. Google OAuth Handler Placeholder
  const handleGoogleLogin = () => {
    // redirect to your backend Google auth endpoint or trigger Google SDK login
    window.location.href = "https://your-backend.com/auth/google"; // Replace with actual
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#f9f9f9]">
      {/* Left Visual Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-white items-center justify-center p-10 relative overflow-hidden shadow-md"
      >
        <img
          src="/images/logo_full_1.jpg"
          alt="Fashion model"
          className="w-[85%] max-h-[80vh] object-contain rounded-xl shadow-lg"
        />
        <div className="absolute bottom-10 text-primary text-xl font-semibold italic animate-pulse">
          “Wear stories, not just styles.”
        </div>
      </motion.div>

      {/* Right Auth Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-20 py-12">
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-500 text-base">
              {isLogin ? "Login to your account" : "Join the Vellor community"}
            </p>
          </div>

          <form className="space-y-5">
  {!isLogin && (
    <>
      {/* Name */}
      <div className="relative">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaUser className="absolute right-4 top-3.5 text-gray-400" />
      </div>

      {/* Address */}
      <div className="relative">
        <input
          type="text"
          placeholder="Address"
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaLocationDot className="absolute right-4 top-3.5 text-gray-400" />
      </div>

      {/* Phone Number */}
      <div className="relative">
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <FaPhoneAlt className="absolute right-4 top-3.5 text-gray-400" />
      </div>
    </>
  )}

  {/* Email */}
  <div className="relative">
    <input
      type="email"
      placeholder="Email Address"
      className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <FiMail className="absolute right-4 top-3.5 text-gray-400" />
  </div>

  {/* Password */}
  <div className="relative">
    <input
      type="password"
      placeholder="Password"
      className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <FaLock className="absolute right-4 top-3.5 text-gray-400" />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-primary text-white py-3 rounded-full hover:bg-primary-hover transition duration-300"
  >
    {isLogin ? "Login" : "Sign Up"}
  </button>
</form>


          {/* 🔒 3. Google OAuth Option */}
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full gap-3 border border-gray-300 px-6 py-2 rounded-full hover:shadow-md transition duration-300 hover:cursor-pointer"
            >
              <FcGoogle size={22} />
              <span className="text-sm text-gray-600 font-medium">
                Continue with Google
              </span>
            </button>
          </div>

          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-medium hover:underline transition-all"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:underline font-medium transition-all"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* 🛍 2. Footer CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-primary underline hover:text-tertiary transition hover:cursor-pointer"
            >
              ← Back to Shop
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
