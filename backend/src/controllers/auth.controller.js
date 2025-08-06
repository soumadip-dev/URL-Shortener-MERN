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
    const result = await register({ name, email, password });
    res.status(201).json({ message: result.message, success: true });
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
    const result = await verify(token);
    res.status(200).json({ message: result.message, success: true });
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
    const { token, user } = await login(email, password);

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
    const user = await getCurrentUser(req.user.id);
    res.status(200).json({ message: 'User found', success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ message: error.message, success: false });
  }
};

//* Controller for logout
const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Something went wrong when logging out', success: false });
  }
};

//* Controller for forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPass(email);
    res.status(200).json({ message: result.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Controller for reset password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const result = await resetPass(token, password);
    res.status(200).json({ message: result.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found')
      ? 404
      : error.message.includes('strong enough')
      ? 400
      : error.message.includes('same as old')
      ? 401
      : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

// Export the controllers
export { registerUser, verifyUser, loginUser, getMe, logout, forgotPassword, resetPassword };
