const mongoose = require('mongoose');
const redis = require('redis');
const express = require('express');
const cors = require('cors');
const faqRoutes = require('./routes/faq.routes');
const connectDatabase = require('../config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173' || 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use('/api', faqRoutes);

// Database connection
connectDatabase();

// Server setup
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing connections...');
  await mongoose.disconnect();
  await redisClient.quit();
  console.log('Connections closed');
  process.exit(0);
});

module.exports = app;
