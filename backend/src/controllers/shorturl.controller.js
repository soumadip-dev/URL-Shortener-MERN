import { nanoid } from 'nanoid';
import urlSchema from '../models/shorturl.model.js';
import { generateNanoid } from '../utils/helper.js';

// Controller for creating a new short URL
const shortUrlController = async (req, res) => {
  const { url } = req.body;
  const shortUrl = generateNanoid(7);
  try {
    const newUrl = new urlSchema({
      full_url: url,
      short_url: shortUrl,
    });
    await newUrl.save(); // Save the new URL to the database
    res.status(201).json({ shortUrl }); // Return the short URL in the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
};

// Controller for redirecting to the full URL using the short URL
const redirectController = async (req, res) => {
  const { id } = req.params; // Extract the short URL ID from the request parameters
  try {
    const url = await urlSchema.findOne({ short_url: id }); // Find the full URL associated with the short URL ID
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
