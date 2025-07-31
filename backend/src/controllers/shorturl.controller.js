import { nanoid } from 'nanoid';

const shortUrlController = async (req, res) => {
  const { url } = req.body;
  console.log(url);
  res.send(nanoid(7));
};

export { shortUrlController };
