import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
export const attachUser = async (req, res, next) => {
  const token = req.cookies?.AUTHTOKEN;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    console.log('Akhane aschi');
  } catch (error) {
    console.error('Error attaching user:', error.message);
    return res.status(401).json({ message: 'Unauthorized', success: false });
  }
  next();
};
