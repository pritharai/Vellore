import api from "./api";

export const addToCart = async (data) => {
  try {
    const response = await api.post("/cart", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add item to cart"
    );
  }
};

export const updateCartItem = async (data) => {
  try {
    const response = await api.patch("/cart/item", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update cart item"
    );
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove item from cart"
    );
  }
};

export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

export const clearCart = async () => {
  try {
    const response = await api.delete("/cart");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to clear cart");
  }
};
