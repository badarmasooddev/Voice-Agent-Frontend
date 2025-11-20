import axios from "axios";

const API_BASE_URL = "https://teraleads-api.trixlyai.com/api/auth"; 

export const loginUser = async ({ email, password }) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
};

export const register = async (name, email, password) => {
    const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
    return response.data;
};

export const getUser_details = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/user-profile/${userId}`);
    return response.data;
};

export const updateEmail = async (userId, newEmail) => {
    const response = await axios.put(`${API_BASE_URL}/user-profile/${userId}/update-name`, { new_username: newEmail });
    return response.data;
};

export const updatePassword = async (userId, oldPassword, newPassword) => {
    const response = await axios.put(`${API_BASE_URL}/user-profile/${userId}/password`, { oldPassword, newPassword });
    return response.data;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
};

export const delete_account = async (userId) => {
    const response = await axios.delete(`${API_BASE_URL}/delete-account/${userId}`);
    return response.data;
};

export const google_auth = async (token) => {
    const response = await axios.post(`${API_BASE_URL}/google-auth`, { token }, { withCredentials: true });
    return response.data;
};

export const updateUserConfigs = async (userId, configs) => {
    const response = await axios.patch(`${API_BASE_URL}/configs/${userId}`, configs);
    return response.data;
};

export const getUserConfigs = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/configs/${userId}`);
    return response.data;
};
