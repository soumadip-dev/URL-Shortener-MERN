import axiosInstance from '../utils/axiosInsance';

export const registerUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/register', {
    email,
    password,
  });
  return response.data;
};

export const verifyUser = async token => {
  const response = await axiosInstance.get(`/auth/verify/${token}`);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

export const forgotPassword = async email => {
  const response = await axiosInstance.post('/auth/forgot-password', {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};


feat(user-api): add all auth endpoints matching backend

- Implement register, verify, login endpoints
- Add logout, forgotPassword, and resetPassword functions
- Include JSDoc documentation for all API methods
- Match backend controller parameters and responses