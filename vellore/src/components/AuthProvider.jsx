import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user && user.isVerified === false && !isLoading) {
      navigate("/verify", { state: { email: user.email } });
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return children;
};

export default AuthProvider;
