import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  APP_URL: process.env.APP_URL,
};
