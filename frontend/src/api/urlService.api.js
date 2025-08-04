import axiosInstance from '../utils/axiosInsance.js';

export const getShortUrl = async url => {
  const response = await axiosInstance.post('/shorturl/create', {
    url: url,
  });
  return response.data;
};
