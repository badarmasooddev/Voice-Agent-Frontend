import axiosInstance from './axiosInstance';

export const getAllPhoneNumber = async () => {
  try {
    const response = await axiosInstance.get('/phone');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching phone numbers:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch phone numbers');
  }
};

export const searchTwilioNumbers = async ({ countryCode, areaCode, capabilities }) => {
  try {
    const response = await axiosInstance.post('/phone/search', { countryCode, areaCode, capabilities });
    return response.data.data || [];
  } catch (error) {
    console.error('Twilio Search Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch Twilio numbers');
  }
};

export const searchTelnyxNumbers = async (regionName) => {
  try {
    const response = await axiosInstance.get(`/phone/search/telnyx?region_name=${regionName}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Telnyx Search Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch Telnyx numbers');
  }
};

export const buyTwilioNumber = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post('/phone/buy/twilio', { phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Twilio Purchase Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to buy Twilio number');
  }
};

export const buyTelnyxNumber = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post('/phone/buy/telnyx', { phoneNumber });
    return response.data;
  } catch (error) {
    console.error('Telnyx Purchase Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.errors?.[0]?.detail || error.response?.data?.message || 'Failed to buy Telnyx number'
    );
  }
};
