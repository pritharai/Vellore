import api from "./api";

export const createOrder = async (data) => {
  try {
    const response = await api.post("/order", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create order");
  }
};

export const verifyPayment = async (data) => {
  try {
    const response = await api.post("/order/verify", data);
    return response.data.data;
  } catch (error) {
    console.log(error)
    throw new Error(
      error.response?.data?.message || "Payment verification failed"
    );
  }
};

export const getUserOrders = async () => {
  try {
    const response = await api.get("/order/user");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user orders"
    );
  }
};

export const requestOrderCancellation = async (data) => {
  try {
    const response = await api.post("/order/cancel", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to request cancellation"
    );
  }
};

export const getAllOrders = async (params = {}) => {
  try {
    const response = await api.get("/order", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch orders");
  }
};

export const updateOrderStatus = async (id, data) => {
  try {
    const response = await api.put(`/order/${id}/status`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update order status"
    );
  }
};
