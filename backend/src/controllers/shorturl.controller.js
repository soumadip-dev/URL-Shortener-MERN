import { createShortUrl, getFullUrl } from '../services/shortUrl.service.js';
import { ENV } from '../config/env.js';

// Controller for creating a new short URL
const shortUrlController = async (req, res) => {
  const { url } = req.body;
  try {
    const shortUrl = await createShortUrl(url);
    res.status(201).json({ shortUrl: `${ENV.APP_URL}/shorturl/${shortUrl}` }); // Return the short URL in the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
};

// Controller for redirecting to the full URL using the short URL
const redirectController = async (req, res) => {
  const { id } = req.params; // Extract the short URL ID from the request parameters
  try {
    const url = await getFullUrl(id);
    if (url) {
      res.redirect(url.full_url); // Redirect to the full URL if found
    } else {
      throw new Error('Short URL not found');
    }
  } catch (error) {
    console.error('Failed to redirect:', error);
    res.status(404).json({ error: error.message });
  }
};

// Export the controllers
export { shortUrlController, redirectController };
