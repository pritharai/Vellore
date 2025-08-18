
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { verifyUser, resendOtp } from "../services/userService";
import { setUser } from "../redux/authSlice";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [formErrors, setFormErrors] = useState({});
  const [timer, setTimer] = useState(0); 

  // Start countdown effect
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const verifyMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      queryClient.invalidateQueries(["session"]);
      toast.success("Account verified successfully!");
      navigate("/");
    },
    onError: (err) => {
      setFormErrors({ general: err.message });
      toast.error(err.message);
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success("OTP resent successfully!");
      setTimer(60); 
    },
    onError: (err) => {
      setFormErrors({ general: err.message });
      toast.error(err.message);
    },
  });

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
    if (!otp) errors.otp = "OTP is required";
    else if (!/^\d{6}$/.test(otp)) errors.otp = "OTP must be 6 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    verifyMutation.mutate({ email, otp });
  };

  const handleResend = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setFormErrors({ email: "Valid email is required" });
      return;
    }
    resendMutation.mutate({ email });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4 py-12">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Account</h2>

        {formErrors.general && <p className="text-red-500 mb-3">{formErrors.general}</p>}

        <form onSubmit={handleVerify}>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="border p-2 w-full mb-4 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mb-3">{formErrors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Enter OTP"
              className="border p-2 w-full mb-4 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {formErrors.otp && (
              <p className="text-red-500 text-sm mb-3">{formErrors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="bg-primary text-white px-4 py-2 rounded w-full hover:bg-primary-hover transition disabled:opacity-50"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify"}
          </button>
        </form>


        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendMutation.isPending}
              className="text-blue-500 hover:underline"
            >
              {resendMutation.isPending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default VerifyPage;
