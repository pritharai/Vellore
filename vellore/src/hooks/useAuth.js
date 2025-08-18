import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { loginUser, registerUser, logout } from '../services/userService';  

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setUser(data.user));  
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Logged in successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Registered successfully. Please verify your email.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      dispatch(clearUser());
      toast.info('Logged out successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    isLoggingIn: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    isAuthenticated,
    logout: handleLogout,
    // Add more mutations as needed
  };
};