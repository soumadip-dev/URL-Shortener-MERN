import { nanoid } from 'nanoid';
import urlSchema from '../models/shorturl.model.js';

// Controller for creating a new short URL
const shortUrlController = async (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(7); // Generate a 7 character long short URL
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

// Export the controller
export { shortUrlController };
