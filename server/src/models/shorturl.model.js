import mongoose from 'mongoose';

// Define the schema for the ShortUrl model
const shorturlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true, // Ensure short_url is unique
    index: true, // Create an index for the short_url field
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

// Create the ShortUrl model
const ShortUrl = mongoose.model('ShortUrl', shorturlSchema);

// Export the ShortUrl model
export default ShortUrl;
