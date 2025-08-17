import api from "./api";

export const getReviewsByProduct = async (productId) => {
  try {
    const response = await api.get(`/review/product/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch reviews");
  }
};

export const createReview = async (data) => {
  try {
    const response = await api.post("/review", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create review");
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`/review/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete review");
  }
};
