require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDatabase = require('../config/database');
const quoteRoutes = require('../routes/quoteRoutes');

const app = express();

// Connect to MongoDB database
connectDatabase();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Quote routes
app.use('/api/quotes', quoteRoutes);

// Export the Express app for Vercel serverless
module.exports = app;
