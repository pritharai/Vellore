import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { forgotPassword, passwordReset } from "../services/userService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("OTP sent to your email!");
      setStep(2);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: passwordReset,
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful!");
      setTimeout(() => navigate("/auth"), 2000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }
    forgotPasswordMutation.mutate({ email: formData.email });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.otp) {
      toast.error("Please enter the OTP");
      return;
    }
    resetPasswordMutation.mutate({
      email: formData.email,
      otp: formData.otp,
      newPassword: formData.password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Reset Your Password
        </h2>

        {step === 1 ? (
          <>
            <p className="text-gray-600 mb-4 text-sm text-center">
              Enter your email to receive an OTP.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition disabled:opacity-50"
              >
                {forgotPasswordMutation.isPending ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4 text-sm text-center">
              Enter the OTP sent to {formData.email} and your new password.
            </p>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-primary"
                  placeholder="Enter OTP"
                  required
                />
              </div>
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
                disabled={resetPasswordMutation.isPending}
                className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary-hover transition disabled:opacity-50"
              >
                {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 text-primary underline text-sm hover:text-primary-hover transition"
            >
              Resend OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;