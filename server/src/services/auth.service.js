import { ENV } from '../config/env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isValidEmail, isStrongPassword } from '../utils/validation.js';
import authDAO from '../dao/auth.dao.js';

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

  // Return success message
  return { message: 'User created successfully', user: newUser };
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

export { register, login };
