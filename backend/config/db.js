const mongoose = require('mongoose');

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds between each retry

const connectDB = async (retryCount = 0) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // If connection drops after successful connect, auto-reconnect
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
      setTimeout(() => connectDB(), RETRY_DELAY);
    });

    mongoose.connection.on('error', (err) => {
      console.log(`MongoDB error: ${err.message}. Retrying...`);
      setTimeout(() => connectDB(), RETRY_DELAY);
    });

  } catch (err) {
    if (retryCount < MAX_RETRIES) {
      console.log(`MongoDB connection failed. Retry ${retryCount + 1}/${MAX_RETRIES} in 5 seconds...`);
      setTimeout(() => connectDB(retryCount + 1), RETRY_DELAY);
    } else {
      console.error('MongoDB failed to connect after 5 attempts. Check your internet or Atlas settings.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
