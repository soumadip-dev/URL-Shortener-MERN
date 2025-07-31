import { nanoid } from 'nanoid';
import urlSchema from '../models/shorturl.model.js';

const shortUrlController = async (req, res) => {
  const { url } = req.body;
  const shortUrl = nanoid(7);
  const newUrl = new urlSchema({
    full_url: url,
    short_url: shortUrl,
  });
  newUrl.save();
  res.status(201).json({ shortUrl });
};

export { shortUrlController };
