import api from "./api";

export const getVariants = async (params = {}) => {
  try {
    const response = await api.get("/variant", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch variants"
    );
  }
};

export const getVariantById = async (id) => {
  try {
    const response = await api.get(`/variant/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch variant");
  }
};

export const createVariant = async (data) => {
  try {
    const response = await api.post("/variant", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create variant"
    );
  }
};

export const updateVariant = async (id, data) => {
  try {
    const response = await api.patch(`/variant/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update variant"
    );
  }
};

export const deleteVariant = async (id) => {
  try {
    const response = await api.delete(`/variant/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete variant"
    );
  }
};
