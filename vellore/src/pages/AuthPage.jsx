import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login, register, isLoggingIn, error, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email format";
    if (!formData.password) errors.password = "Password is required";
    if (!isLogin) {
      if (!formData.name) errors.name = "Name is required";
      if (!formData.phone) errors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Invalid phone number (10 digits required)";
      if (!formData.gender) errors.gender = "Gender is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      login({ email: formData.email, password: formData.password });
    } else {
      register(formData, {
        onSuccess: () => {
          navigate("/verify", { state: { email: formData.email } });
        },
      });
    }
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <FaUser className="absolute right-4 top-3.5 text-gray-400" />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <FaPhoneAlt className="absolute right-4 top-3.5 text-gray-400" />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.gender}</p>
                  )}
                </div>
              </>
            )}

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FiMail className="absolute right-4 top-3.5 text-gray-400" />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FaLock className="absolute right-4 top-3.5 text-gray-400" />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary text-white py-3 rounded-full hover:curspro hover:bg-primary-hover transition duration-300 disabled:opacity-50"
            >
              {isLoggingIn ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="bg-gradient-to-r hover:cursor-pointer from-primary to-secondary bg-clip-text text-transparent hover:underline font-medium transition-all"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="bg-gradient-to-r hover:cursor-pointer from-primary to-secondary bg-clip-text text-transparent hover:underline font-medium transition-all"
                >
                  Login
                </button>
              </>
            )}
          </div>

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