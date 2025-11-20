import axiosInstance from "./axiosInstance";

export const saveIntegration = async (integrationData) => {
  const response = await axiosInstance.post("/crm/save-integration", integrationData);
  return response.data;
};

export const connectHubSpot = async () => {
  const response = await axiosInstance.get("/hubspot/connect");
  return response.data;
};

export const fetchHubSpotContacts = async () => {
  const response = await axiosInstance.get("/hubspot/contacts");
  return response.data;
};

export const getUserIntegrations = async () => {
  const response = await axiosInstance.get("/crm/user-integrations");
  return response.data;
};

export const fetchZapierContacts = async () => {
    const response = await axiosInstance.get("/zapier/contacts");
    return response.data;
};