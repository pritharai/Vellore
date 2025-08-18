import api from "./api";

export const getColorById = async (id) => {
  try {
    const response = await api.get(`/color/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch color");
  }
};

export const getColors = async () => {
  try {
    const response = await api.get("/color");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch colors");
  }
};

export const createColor = async (data) => {
  try {
    const response = await api.post("/color", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create color");
  }
};

export const updateColor = async (id, data) => {
  try {
    const response = await api.patch(`/color/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update color");
  }
};

export const deleteColor = async (id) => {
  try {
    const response = await api.delete(`/color/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete color");
  }
};
