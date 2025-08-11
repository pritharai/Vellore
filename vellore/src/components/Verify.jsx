import React, { useState } from "react";
import axios from "axios";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user/verify_user", { email, otp });
      setMessage(res.data.message || "Account verified successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post("/api/user/resend_otp", { email });
      setMessage("OTP resent to your email");
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-54">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Account</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {message && <p className="text-green-500 mb-3">{message}</p>}

        <form onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="border p-2 w-full mb-4 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            className="border p-2 w-full mb-4 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-primary-hover hover:cursor-pointer transition"
          >
            Verify
          </button>
        </form>

        <button
          onClick={handleResend}
          className="text-blue-500 mt-4 block text-center"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
