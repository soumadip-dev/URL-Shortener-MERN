//* import axiosinstance from utils
import axiosInstance from '../utils/axiosInsance.js';

//* Mutation function to Register a user
export const registerUser = async credentials => {
  const response = await axiosInstance.post('/auth/register', {
    name: credentials.name,
    email: credentials.email,
    password: credentials.password,
  });
  console.log(response);
  return response.data;
};

//* Mutation function to Login a user
export const loginUser = async credentials => {
  const response = await axiosInstance.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  return response.data;
};

//* Mutation function to Logout a user
export const logoutUser = async () => {
  const response = await axiosInstance.get('/auth/logout');
  return response.data;
};
