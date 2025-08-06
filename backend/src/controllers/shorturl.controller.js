import {
  createAnonymousShortUrl,
  getFullUrl,
  createUserShortUrl,
} from '../services/shortUrl.service.js';
import { ENV } from '../config/env.js';

//* Controller for creating a new short URL
const shortUrlController = async (req, res) => {
  const data = req.body;
  if (!data.url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    let shortUrl;
    if (req.user) {
      shortUrl = await createUserShortUrl(data.url, req.user.id, data.slug);
    } else {
      shortUrl = await createAnonymousShortUrl(data.url);
    }

    if (!shortUrl) {
      return res.status(500).json({ error: 'Failed to create short URL' });
    }

    res.status(201).json({
      shortUrl: `${ENV.APP_URL}/shorturl/${shortUrl}`,
      message: 'Short URL created successfully',
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
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
export { shortUrlController, redirectController };
