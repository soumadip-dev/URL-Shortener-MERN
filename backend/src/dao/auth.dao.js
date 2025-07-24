import User from '../models/user.model.js';

//* User Data Access Object
const authDAO = {
  //* Find user by email
  findUserByEmail: async email => {
    return await User.findOne({ email });
  },

  //* Find user by ID
  findUserById: async userId => {
    return await User.findById(userId).select('-password');
  },

  //* Create new user
  createUser: async userData => {
    return await User.create(userData);
  },

  //* Find user by verification token
  findUserByVerificationToken: async token => {
    return await User.findOne({ verificationToken: token });
  },

  //* Update user verification status
  updateUserVerification: async (userId, isVerified) => {
    return await User.findByIdAndUpdate(
      userId,
      { isVerified, verificationToken: undefined },
      { new: true }
    );
  },

  //* Find user by reset password token
  findUserByResetToken: async token => {
    return await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() },
    });
  },

  //* Update user password
  updateUserPassword: async (userId, newPassword) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        password: newPassword,
        resetPasswordToken: undefined,
        resetPasswordExpiry: undefined,
      },
      { new: true }
    );
  },

  //* Set reset password token
  setResetPasswordToken: async (userId, token) => {
    return await User.findByIdAndUpdate(
      userId,
      {
        resetPasswordToken: token,
        resetPasswordExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
      },
      { new: true }
    );
  },
};

export default authDAO;
