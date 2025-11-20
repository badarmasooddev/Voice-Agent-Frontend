import axiosInstance from './axiosInstance';

export const makeCall = async (query) => {
  const response = await axiosInstance.post('/calls/outgoing-call', query);
  return response;
};
