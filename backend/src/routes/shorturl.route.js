import { Router } from 'express';

// Import the controller to create a short URL
import { shortUrlController } from '../controllers/shorturl.controller.js';

// Create a new Express router
const router = Router();

// Handle POST requests to the '/create' endpoint
router.post('/create', shortUrlController);

// Export the router as the default export
export default router;
