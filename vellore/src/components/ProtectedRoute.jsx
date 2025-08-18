import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
  return <Navigate to="/auth" replace />;
}

if (user && !user.isVerified) {
  return <Navigate to="/verify" replace state={{ email: user.email }} />;
}

if (requireAdmin && user?.role !== "admin") {
  return <Navigate to="/" replace />;
}
  return <Outlet />;
};

export default ProtectedRoute