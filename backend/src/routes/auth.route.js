import { Router } from 'express';
import { registerUser, loginUser, logout } from '../controllers/auth.controller.js';
import { isLoogedIn } from '../middleware/auth.middleware.js';

const router = Router();

// Define Rouites
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

// Export the router
export default router;
