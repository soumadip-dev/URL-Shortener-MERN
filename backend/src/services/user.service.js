import { findUrlsByUserId } from '../dao/user.dao.js';

export const getUserUrls = async userId => {
  const urls = await findUrlsByUserId(userId);
  return urls;
};
