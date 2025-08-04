import axios from 'axios';

export const getShortUrl = async url => {
  const response = await axios.post('http://localhost:8080/shorturl/create', {
    url: url,
  });
  return response.data;
};
