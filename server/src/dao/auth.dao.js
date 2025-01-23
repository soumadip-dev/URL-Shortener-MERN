import User from '../models/user.model.js';

//* User Data Access Object
const authDAO = {
  //* Find user by email
  findUserByEmail: async email => {
    return await User.findOne({ email });
  },

  //* Create new user
  createUser: async userData => {
    return await User.create(userData);
  },
};

export default authDAO;
