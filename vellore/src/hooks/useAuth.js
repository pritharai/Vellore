import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logout,
  refreshAccessToken,
  getProfile,
  registerUser,
} from "../services/userService";
import {
  setUser,
  setLoading,
  setError,
  logout as logoutAction,
} from "../redux/authSlice";
import { toast } from "react-toastify";

export const useAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);

  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const refreshData = await refreshAccessToken();
      const profileData = await getProfile();
      return profileData;
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));
    },
    onError: (err) => {
      dispatch(setError(err.message));
      dispatch(logoutAction());
    },
    retry: false,
    enabled: !isAuthenticated,
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      queryClient.invalidateQueries(["session"]);
      dispatch(setLoading(false));
      toast.success("Logged in successfully");
    },
    onError: (err) => {
      dispatch(setError(err.message));
      dispatch(logoutAction());
      dispatch(setLoading(false));
      toast.error(err.message);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setLoading(false));
      toast.success("Account created successfully");
    },
    onError: (err) => {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
      toast.error(err.message);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch(logoutAction());
      queryClient.removeQueries(["session"]);
      toast.success("Logged out successfully");
    },
    onError: (err) => {
      dispatch(setError(err.message));
      toast.error(err.message);
    },
  });

  return {
    user,
    isAuthenticated,
    isPending:
      sessionQuery.isPending ||
      loginMutation.isPending ||
      registerMutation.isPending,
    isLoggingIn: loginMutation.isPending || registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
