import { register, login } from '../services/auth.service.js';

//* Coontroller for registering user
const registerUser = async (req, res) => {
  try {
    // Extract the name, email, and password from the request body
    const { name, email, password } = req.body;
    // Call the register service function to register the user
    const result = await register({ name, email, password });
    // Return a JSON response with a 201 status code
    res.status(201).json({ message: result.message, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Controller for login user
const loginUser = async (req, res) => {
  try {
    // Extract the email and password from the request body
    const { email, password } = req.body;

    // Call the login service function to login the user
    const { token, user } = await login(email, password);

    // Set cookie (HTTP-specific logic stays in controller)
    const cookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie('AUTHTOKEN', token, cookieOptions);

    // Return a JSON response with a 200 status code
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

//* Controller for logout
const logout = async (req, res) => {
  try {
    // Clear the cookie
    res.cookie('AUTHTOKEN', '', { maxAge: 1 });

    // Return a JSON response with a 200 status code
    res.status(200).json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Something went wrong when logging out', success: false });
  }
};

//* Export the controllers
export { registerUser, loginUser, logout };
