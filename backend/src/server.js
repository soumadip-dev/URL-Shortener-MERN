// Import necessary modules
import express from 'express';
import { nanoid } from 'nanoid';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';

// Initialize an Express application
const app = express();

// Set the port to listen on
const PORT = ENV.PORT || 8080;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('<h1>Hello From URL Shortener Backend!</h1>');
});

app.post('/api/create', (req, res) => {
  const url = req.body;
  console.log(url);
  res.send(nanoid(7));
});

// Function to connect to DB and start the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting the server
    app.listen(PORT, () => {
      console.info(`✔️ Server is up and running on port: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
