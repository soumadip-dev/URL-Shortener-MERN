import {
  createAnonymousShortUrl,
  getFullUrl,
  createUserShortUrl,
} from '../services/shortUrl.service.js';
import { ENV } from '../config/env.js';

//* Controller for anonymous users to create short URL
const shortUrlController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const shortUrl = await createAnonymousShortUrl(url);

    if (!shortUrl) {
      return res.status(500).json({ error: 'Failed to create short URL' });
    }

    res.status(201).json({
      shortUrl: `${ENV.APP_URL}/shorturl/${shortUrl}`,
      message: 'Short URL created successfully (anonymous)',
    });
  } catch (error) {
    console.error('Error creating anonymous short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//* Controller for authenticated users to create short URL
const UserShortUrlController = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'User authentication required' });
  }

  try {
    const shortUrl = await createUserShortUrl(url, req.user.id);

    if (!shortUrl) {
      return res.status(500).json({ error: 'Failed to create short URL' });
    }

    res.status(201).json({
      shortUrl: `${ENV.APP_URL}/shorturl/${shortUrl}`,
      message: 'Short URL created successfully (user)',
    });
  } catch (error) {
    console.error('Error creating user short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//* Controller for redirecting to the full URL using the short URL
const redirectController = async (req, res) => {
  const { id } = req.params; // Extract the short URL ID from the request parameters

  try {
    const url = await getFullUrl(id);

    if (!url) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.redirect(url.full_url); // Redirect to the full URL if found
  } catch (error) {
    console.error('Failed to redirect:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the controllers
export { shortUrlController, redirectController, UserShortUrlController };
