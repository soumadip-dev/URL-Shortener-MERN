import { Router } from 'express';
import { registerUser, loginUser, logout, getCurrentUser } from '../controllers/auth.controller.js';
import { isLoogedIn } from '../middleware/auth.middleware.js';

const router = Router();

// Define Rouites
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/check', isLoogedIn, getCurrentUser);

// Export the router
export default router;
