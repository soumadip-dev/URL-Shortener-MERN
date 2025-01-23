import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const isLoogedIn = async (req, res, next) => {
  try {
    // Get the token from the cookies
    let token = req.cookies?.AUTHTOKEN;

    // If no token is present, return an unauthorized response
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized', success: false });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    // Add the decoded user to the request object for later use
    req.user = decoded;
    next();
  } catch (error) {
    // Handle any errors that occur during the middleware execution
    console.error('Middleware error:', error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};
