import axiosInstance from '../utils/axiosInstance.js';

//* Mutation function to Create a short URL
export const getShortUrl = async ({ url, slug = null }) => {
  const response = await axiosInstance.post('/shorturl/create', {
    url,
    slug,
  });
  return response.data;
};
