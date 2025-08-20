import api from "./api";

export const addFeedback = async (feedback) => {
  try {
    const response = await api.post("/feedback", { feedback });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit feedback");
  }
};

export const getAllFeedbacks = async (params = {}) => {
  try {
    const response = await api.get("/feedback", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch feedbacks");
  }
};