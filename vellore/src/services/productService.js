import api from "./api";

export const getProducts = async (params={}) => {
  try {
    const response = await api.get("/product",{params});
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};

export const getProductIds = async () => {
  try {
    const response = await api.get("/product/ids");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product IDs");
  }
};

export const createProduct = async (data) => {
  try {
    const response = await api.post("/product", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create product");
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await api.patch(`/product/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete product");
  }
};
