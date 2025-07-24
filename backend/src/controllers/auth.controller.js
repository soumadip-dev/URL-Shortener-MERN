import {
  register,
  verify,
  login,
  getCurrentUser,
  forgotPass,
  resetPass,
} from '../services/auth.service.js';
// Coontroller for registering user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const response = await register({ name, email, password });
    res.status(201).json({ message: response.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

// Controller for user verification
const verifyUser = async (req, res) => {};

// Controller for login user
const loginUser = (req, res) => {};

// Controller for getting current user
const getMe = async (req, res) => {};

// Controller for logout
const logout = async (req, res) => {};

// Controller for forgot password
const forgotPassword = async (req, res) => {};

// Controller for reset password
const resetPassword = async (req, res) => {};

// Export the controllers
export { registerUser, verifyUser, loginUser, getMe, logout, forgotPassword, resetPassword };
