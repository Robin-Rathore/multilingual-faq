require('dotenv').config(); // Ensure this is included at the top if you don't already have it

const mongoose = require('mongoose');
const redis = require('redis');

const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_URL = process.env.REDIS_URL;

const connectDatabase = async () => {
  try {
    // MongoDB connection
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Redis connection
    const redisClient = redis.createClient({ url: REDIS_URL });
    await redisClient.connect();
    console.log('Redis connected successfully');

    return { mongoose, redisClient };
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
