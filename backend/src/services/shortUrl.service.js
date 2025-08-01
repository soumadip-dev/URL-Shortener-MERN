import urlSchema from '../models/shorturl.model.js';
import { generateNanoid } from '../utils/helper.js';

export const createShortUrl = async url => {
  const shortUrl = generateNanoid(7);
  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  await newUrl.save(); // Save the new URL to the database
  return shortUrl;
};

export const getFullUrl = async shortUrlId => {
  return await urlSchema.findOne({ short_url: shortUrlId });
};
