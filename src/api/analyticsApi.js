import axiosInstance from "./axiosInstance";


export const getAnalytics = async () => {
    const response = axiosInstance.get('/dashboard');
    return response
}