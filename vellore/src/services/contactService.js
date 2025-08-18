import api from "./api";

export const createContact = async (data) => {
  try {
    const response = await api.post("/contact", data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit contact form"
    );
  }
};

export const getContacts = async () => {
  try {
    const response = await api.get("/contact");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch contacts"
    );
  }
};

export const getContactById = async (id) => {
  try {
    const response = await api.get(`/contact/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch contact");
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contact/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete contact"
    );
  }
};
