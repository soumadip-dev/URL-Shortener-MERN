import urlSchema from '../models/shorturl.model.js';

//* Saves a new short URL to the database
export const saveShortUrl = async ({ full_url, short_url }) => {
  const newUrl = new urlSchema({
    full_url,
    short_url,
  });
  await newUrl.save();
};

//* Finds a document in the database with the matching short URL
export const findUrlByShortId = async short_url => {
  return await urlSchema.findOneAndUpdate({ short_url }, { $inc: { clicks: 1 } });
};

//* Finds a document in the database with the matching short URL
export const getCustomeShortUrl = async slug => {
  return await urlSchema.findOne({ short_url: slug });
};
