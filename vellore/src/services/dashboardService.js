import api from "./api";

export const getDashboardStats = async (data) => {
  try {
    const response = await api.post("/dashboard/stats", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard stats"
    );
  }
};

export const getMostActiveUsers = async (params = {}) => {
  try {
    const response = await api.get("/dashboard/users", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch most active users"
    );
  }
};

export const getMostPurchasedProducts = async (params = {}) => {
  try {
    const response = await api.get("/dashboard/products", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch most purchased products"
    );
  }
};

export const getRecentOrders = async (data) => {
  try {
    const response = await api.post("/dashboard/orders", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch recent orders"
    );
  }
};

export const getOrdersByUser = async (data) => {
  try {
    const response = await api.post("/dashboard/user/order", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user orders"
    );
  }
};
