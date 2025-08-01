import urlSchema from '../models/shorturl.model.js';

export const saveShortUrl = async ({ full_url, short_url }) => {
  const newUrl = new urlSchema({
    full_url,
    short_url,
  });
  await newUrl.save();
};

export const findUrlByShortId = async short_url => {
  return await urlSchema.findOne({ short_url });
};
