import User from '../models/user.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';
import generateMailOptions from '../utils/mailTemplates.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isValidEmail, isStrongPassword } from '../utils/validation.js';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: ENV.MAILTRAP_HOST,
  port: ENV.MAILTRAP_PORT,
  auth: {
    user: ENV.MAILTRAP_USERNAME,
    pass: ENV.MAILTRAP_PASSWORD,
  },
});
const register = async userData => {
  const { name, email, password } = userData;

  // Validate Input
  if (!name || !email || !password) throw new Error('All fields are required');
  if (!isValidEmail(email)) throw new Error('Email is not valid');
  if (!isStrongPassword(password)) throw new Error('Password is not strong enough');

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  // Create a new User
  const newUser = await User.create({ name, email, password });
  if (!newUser) throw new Error('Failed to create user');

  // Generate a verification token
  const token = crypto.randomBytes(32).toString('hex');

  // save the token in the database
  newUser.verificationToken = token;
  await newUser.save();

  // Send verification email
  const mailOptions = generateMailOptions({
    user: newUser,
    token,
    type: 'verify',
    companyName: 'Auth System',
  });

  await transporter.sendMail(mailOptions);

  return { message: 'User created successfully', user: newUser };
};
const login = async () => {};
const logout = async () => {};
const forgotPassword = async () => {};
const resetPassword = async () => {};
