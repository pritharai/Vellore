import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // In case reset link includes a token in URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Example API request — change URL to your backend route
      const res = await axios.post(`/api/auth/reset-password/${token}`, {
        password: formData.password,
      });

      setSuccess(res.data.message || "Password reset successful!");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-54">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Reset Your Password
        </h2>

        {error && <p className="text-primary mb-4 text-sm">{error}</p>}
        {success && <p className="text-primary mb-4 text-sm">{success}</p>}

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="Enter new password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
              placeholder="Re-enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition hover:cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
