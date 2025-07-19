import User from '../models/user.model.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';
import generateMailOptions from '../utils/mailTemplates.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isValidEmail, isStrongPassword } from '../utils/validation.js';
import authDAO from '../dao/auth.dao.js';

//* Email transporter configuration
const transporter = nodemailer.createTransport({
  host: ENV.MAILTRAP_HOST,
  port: ENV.MAILTRAP_PORT,
  auth: {
    user: ENV.MAILTRAP_USERNAME,
    pass: ENV.MAILTRAP_PASSWORD,
  },
});

//* Register a new user
const register = async userData => {
  const { name, email, password } = userData;

  // Validate input
  if (!name || !email || !password) throw new Error('All fields are required');
  if (!isValidEmail(email)) throw new Error('Email is not valid');
  if (!isStrongPassword(password)) throw new Error('Password is not strong enough');

  // Check if user exists
  const existingUser = await authDAO.findUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  // Create new user
  const newUser = await authDAO.createUser({ name, email, password });
  if (!newUser) throw new Error('User not registered');

  // Generate and save verification token
  const token = crypto.randomBytes(32).toString('hex');
  newUser.verificationToken = token;
  await newUser.save();

  // Send verification email
  const mailOptions = generateMailOptions({
    user: newUser,
    token,
    type: 'verify',
    companyName: 'URL Shortener',
  });

  await transporter.sendMail(mailOptions);

  return { message: 'User created successfully', user: newUser };
};

//* Verify a user
const verify = async token => {
  if (!token) throw new Error('Token is required');

  const user = await authDAO.findUserByVerificationToken(token);
  if (!user) throw new Error('User not found');

  await authDAO.updateUserVerification(user._id, true);

  return { message: 'User verified successfully', user };
};

//* Login a user
const login = async (email, password) => {
  // Check if both email and password are provided
  if (!email || !password) throw new Error('Email and password are required');

  // Find the user by email
  const user = await authDAO.findUserByEmail(email);

  // If user is not found, throw an error
  if (!user) throw new Error('User not found');

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // If password is incorrect, throw an error
  if (!isPasswordCorrect) throw new Error('Password is incorrect');

  // Generate JWT token
  const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET, { expiresIn: '1d' });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

//* Get current user
const getCurrentUser = async userId => {
  const user = await authDAO.findUserById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

//* Forgot Password
const forgotPass = async email => {
  if (!email) throw new Error('Email is required');

  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found with this email');

  // Generate and save reset token
  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  // Send reset email
  const mailOptions = generateMailOptions({
    user,
    token,
    type: 'reset',
    companyName: 'Auth System',
  });

  await transporter.sendMail(mailOptions);

  return { message: 'Password reset email sent successfully' };
};

//* Reset Password
const resetPass = async (token, newPassword) => {
  if (!token) throw new Error('Reset token is required');

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) throw new Error('User not found with this reset token');
  if (!isStrongPassword(newPassword)) throw new Error('Password is not strong enough');

  // Check if password is same as old password
  const isSamePassword = await bcrypt.compare(newPassword, user.password);
  if (isSamePassword) throw new Error('Password is same as old password');

  // Update password and clear reset token
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  return { message: 'Password reset successfully' };
};

export { register, verify, login, getCurrentUser, forgotPass, resetPass };
