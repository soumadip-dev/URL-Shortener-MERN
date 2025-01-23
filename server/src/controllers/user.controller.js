import { getUserUrls } from '../services/user.service.js';

//* Coontroller for getting all Url of the user
const getAllUserUrls = async (req, res) => {
  try {
    const { id } = req.user;
    const userUrls = await getUserUrls(id);
    res.status(200).json({ userUrls, success: true });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.message.includes('not found') ? 404 : 400;
    res.status(statusCode).json({ message: error.message, success: false });
  }
};

//* Export the controllers
export { getAllUserUrls };
