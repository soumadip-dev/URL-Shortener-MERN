import { Router } from 'express';
import {
  registerUser,
  verifyUser,
  loginUser,
  getMe,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/auth.controller.js';
import { isLoogedIn } from '../middleware/auth.middleware.js';

const router = Router();

// Define Rouites
router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.get('/me', isLoogedIn, getMe);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Export the router
export default router;
