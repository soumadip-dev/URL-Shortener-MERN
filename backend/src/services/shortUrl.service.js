import urlSchema from '../models/shorturl.model.js';
import { generateNanoid } from '../utils/helper.js';
import { saveShortUrl } from '../dao/shortUrl.dao.js';

// Function to create a short URL from a full URL
export const createShortUrl = async url => {
  const shortUrl = generateNanoid(7); // Generate a unique short URL using Nanoid
  await saveShortUrl({ full_url: url, short_url: shortUrl });
  return shortUrl; // Return the generated short URL
};

// Function to retrieve the full URL using the short URL ID
export const getFullUrl = async shortUrlId => {
  return await urlSchema.findOne({ short_url: shortUrlId }); // Find and return the document with the matching short URL
};
