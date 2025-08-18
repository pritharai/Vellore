import api from "./api";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (data) => {
  try {
    const response = await api.post("/user/register", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const resendOtp = async (data) => {
  try {
    const response = await api.post("/user/resend_otp", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Resend Otp failed");
  }
};
export const verifyUser = async (data) => {
  try {
    const response = await api.post("/user/verify_user", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const logout = async () => {
  try {
    const response = await api.get("/user/logout");
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api.post("/user/change_password", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await api.post("/user/forgot_password", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const passwordReset = async (data) => {
  try {
    const response = await api.post("/user/reset_password", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.post("/user/refresh_access_token");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await api.post("/user/update_userProfile", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const addAddress = async (data) => {
  try {
    const response = await api.post("/user/add_address", data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const allUserAddresses = async () => {
  try {
    const response = await api.get("/user/address");
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getAddressById = async (id) => {
  try {
    const response = await api.get(`/user/address/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const updateAddress = async (id, data) => {
  try {
    const response = await api.patch(`/user/update_address/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/user/delete_address/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
