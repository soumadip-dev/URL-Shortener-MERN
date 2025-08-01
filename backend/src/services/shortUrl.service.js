import { generateNanoid } from '../utils/helper.js';
import { saveShortUrl, findUrlByShortId } from '../dao/shortUrl.dao.js';

// Function to Creates a short URL for an anonymous (non-authenticated) user.
export const createAnonymousShortUrl = async url => {
  const shortUrl = generateNanoid(7); // Generate a unique short URL using Nanoid
  await saveShortUrl({ full_url: url, short_url: shortUrl });
  return shortUrl; // Return the generated short URL
};

// Function to Creates a short URL for an authenticated user (logic can be extended later)
export const createUserShortUrl = async (url, userId) => {
  const shortUrl = generateNanoid(7); // Generate a unique short URL using Nanoid
  await saveShortUrl({ full_url: url, short_url: shortUrl, user: userId });
  return shortUrl; // Return the generated short URL
};

// Function to retrieve the full URL using the short URL ID
export const getFullUrl = async shortUrlId => {
  return await findUrlByShortId(shortUrlId); // Find and return the document with the matching short URL
};
