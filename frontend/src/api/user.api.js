import axiosInstance from '../utils/axiosInsance.js';

export const registerUser = async (name, email, password) => {
  const response = await axiosInstance.post('/auth/register', {
    name: name,
    email: email,
    password: password,
  });
  console.log(response);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', {
    email: email,
    password: password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.get('/auth/logout');
  return response.data;
};
