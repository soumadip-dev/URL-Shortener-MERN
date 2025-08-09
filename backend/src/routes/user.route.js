import { Router } from 'express';
import { getAllUserUrls } from '../controllers/user.controller.js';
import { isLoogedIn } from '../middleware/auth.middleware.js';

const router = Router();

// Define Rouites

router.get('/urls', isLoogedIn, getAllUserUrls);

// Export the router
export default router;
