import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  APP_URL: process.env.APP_URL,
  MAILTRAP_HOST: process.env.MAILTRAP_HOST,
  MAILTRAP_PORT: process.env.MAILTRAP_PORT,
  MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
  MAILTRAP_SENDEREMAIL: process.env.MAILTRAP_SENDEREMAIL,
  JWT_SECRET: process.env.JWT_SECRET,
};
