import urlSchema from '../models/shorturl.model.js';

export const findUrlsByUserId = async userId => {
  return await urlSchema.find({ user: userId });
};
