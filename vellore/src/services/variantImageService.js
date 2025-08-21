import api from "./api";

export const getVariantImages = async (params = {}) => {
  try {
    const response = await api.get("/images", { params });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch variant images"
    );
  }
};

export const getVariantImagesById = async (id) => {
  try {
    const response = await api.get(`/images/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch variant image"
    );
  }
};

export const createVariantImages = async (formData) => {
  try {
    const response = await api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create variant images"
    );
  }
};

export const updateVariantImages = async (id, formData) => {
  try {
    const response = await api.put(`/images/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update variant images"
    );
  }
};

export const deleteVariantImages = async (id) => {
  try {
    const response = await api.delete(`/images/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete variant images"
    );
  }
};
