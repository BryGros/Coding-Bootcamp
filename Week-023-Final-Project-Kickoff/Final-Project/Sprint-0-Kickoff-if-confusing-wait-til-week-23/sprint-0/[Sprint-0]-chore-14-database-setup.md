# Chore 14: Set Up Database and Test Connection

**Estimated Time:** 20-30 minutes

## Task
Create database instance, configure environment variables, and verify connection

## For MongoDB Atlas

- [ ] Sign up for MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- [ ] Create new cluster (free tier)
- [ ] Create database user with username/password
- [ ] Whitelist IP address (allow access from anywhere: 0.0.0.0/0)
- [ ] Get connection string
- [ ] Update `.env` file with actual connection string:
  ```
  DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/your-database-name
  ```
- [ ] Generate strong JWT secret (random string, 32+ characters)
- [ ] Update `.env` file with JWT secret:
  ```
  JWT_SECRET=your_actual_random_secret_here
  ```
- [ ] Create `config/db.js` file:
  ```javascript
  const mongoose = require('mongoose');

  const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  };

  module.exports = connectDB;
  ```
- [ ] Update `server.js` to connect to database:
  ```javascript
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');
  const connectDB = require('./config/db');

  const app = express();

  // Connect to database
  connectDB();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Test route
  app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```
- [ ] Test database connection: `npm run dev`
- [ ] Verify console shows "MongoDB connected successfully"
- [ ] Stop the dev server (Ctrl+C)

## For Local MongoDB

- [ ] Install MongoDB Community Edition
- [ ] Start MongoDB service: `brew services start mongodb-community` (macOS)
- [ ] Update `.env` with connection string:
  ```
  DATABASE_URL=mongodb://localhost:27017/your-database-name
  ```
- [ ] Follow same steps above to create config/db.js and update server.js
- [ ] Test database connection

## For PostgreSQL/MySQL (only applies to non-Mongo-db users)

- [ ] Install PostgreSQL or MySQL locally
- [ ] Create new database
- [ ] Note username, password, database name
- [ ] Update `.env` with connection string
- [ ] Create config/db.js with Sequelize connection
    - see https://sequelize.org/docs/v6/getting-started/
- [ ] Update server.js to connect to database
- [ ] Test database connection

## Commit to GitHub

- [ ] Navigate to project root
- [ ] Stage all files: `git add .`
- [ ] Check status: `git status` (verify .env is NOT staged)
- [ ] Commit: `git commit -m "Initial project setup with client and server structure"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify commit appears on GitHub

## Acceptance Criteria

- [ ] Database instance created (MongoDB Atlas or local)
- [ ] .env file updated with actual DATABASE_URL
- [ ] .env file updated with strong JWT_SECRET (32+ characters)
- [ ] config/db.js created with connection logic
- [ ] server.js updated to connect to database
- [ ] Server starts successfully and connects to database
- [ ] Console shows successful connection message
- [ ] All files committed (except .env)
- [ ] .env is NOT in Git
- [ ] .env.example IS in Git
- [ ] Commit pushed to GitHub
