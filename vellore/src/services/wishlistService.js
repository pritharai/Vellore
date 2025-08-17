import api from "./api";

export const addToWishlist = async (data) => {
  try {
    const response = await api.post("/wishlist", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to add to wishlist"
    );
  }
};

export const removeFromWishlist = async (id) => {
  try {
    const response = await api.delete(`/wishlist/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to remove from wishlist"
    );
  }
};

export const getWishlist = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch wishlist"
    );
  }
};

export const clearWishlist = async () => {
  try {
    const response = await api.delete("/wishlist");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to clear wishlist"
    );
  }
};
