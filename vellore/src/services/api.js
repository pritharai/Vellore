import axios from "axios";
import { refreshAccessToken } from "./userService";
import {store} from '../redux/index';
import {setUser} from '../redux/authSlice'
const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (
    config.data &&
    !(config.data instanceof FormData) &&
    !config.headers["Content-Type"]
  ) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const user = await refreshAccessToken();
        store.dispatch(setUser(user))
        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem('user');
        store.dispatch(clearUser());
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
