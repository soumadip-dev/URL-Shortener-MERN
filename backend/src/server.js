// Import necessary modules
import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import shortUrlRoutes from './routes/shorturl.route.js';
import auth_routes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import { attachUser } from './utils/attachUser.js';

// Initialize an Express application
const app = express();

// Set the port to listen on
const PORT = ENV.PORT || 8080;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

app.use(attachUser);

// Enable CORS
app.use(
  cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true,
  })
);

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('<h1>Hello From URL Shortener Backend!</h1>');
});

// Use the short URL routes
app.use('/shorturl', shortUrlRoutes);
app.use('/auth', auth_routes);

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
