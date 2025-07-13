import axiosInstance from '../utils/axiosInstance.js';

export const getUserUrl = async () => {
  const response = await axiosInstance.get('/user/urls');
  return response.data;
};
