import {
  register,
  verify,
  login,
  getCurrentUser,
  forgotPass,
  resetPass,
} from '../services/auth.service.js';

//* Coontroller for registering user
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

//* Controller for user verification
const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const response = await verify(token);
    res.status(200).json({ message: response.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Controller for login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    // Set cookie (HTTP-specific logic stays in controller)
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      secure: ENV.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
      message: 'User logged in successfully',
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found')
      ? 404
      : error.message.includes('verified')
      ? 401
      : error.message.includes('Password')
      ? 401
      : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Controller for getting current user
const getMe = async (req, res) => {
  try {
    const response = await getCurrentUser(req.user.id);
    res.status(200).json({ message: response.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Controller for logout
const logout = async (req, res) => {};

//* Controller for forgot password
const forgotPassword = async (req, res) => {};

//* Controller for reset password
const resetPassword = async (req, res) => {};

// Export the controllers
export { registerUser, verifyUser, loginUser, getMe, logout, forgotPassword, resetPassword };
