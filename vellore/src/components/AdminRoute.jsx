import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);

  if (isLoading) return <div>Loading...</div>; 

  return isAuthenticated && user?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
