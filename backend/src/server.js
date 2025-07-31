// Imports
import express from 'express';

// Create an Express app
const app = express();

// Respond to GET requests to the root URL
app.get('/', (req, res) => {
  res.send('<h1>Hello From URL Shortener Backend!</h1>');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
