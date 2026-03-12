# Chore 13: Initialize Express Backend with Folder Structure

**Estimated Time:** 15 minutes

## Task
Set up Express server, install dependencies, create folder structure, and add a test route

## Steps

- [ ] Navigate to server folder: `cd server`
- [ ] Initialize npm: `npm init -y`
- [ ] Install backend dependencies:
  ```bash
  npm install express dotenv cors bcrypt jsonwebtoken
  ```
- [ ] Install security dependencies:
  ```bash
  npm install helmet express-rate-limit
  ```
- [ ] Install database dependency (choose one):
  ```bash
  # For MongoDB:
  npm install mongoose

  # For PostgreSQL/MySQL:
  npm install sequelize pg
  # OR
  npm install sequelize mysql2
  ```
- [ ] Install dev dependencies:
  ```bash
  npm install --save-dev nodemon
  ```
- [ ] Update package.json scripts:
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```
- [ ] Create folder structure:
  ```bash
  mkdir models routes middleware config controllers utils
  ```
- [ ] Create `.env` file in server folder with:
  ```
  PORT=3001
  NODE_ENV=development
  DATABASE_URL=temporary_placeholder
  JWT_SECRET=temporary_placeholder
  ```
- [ ] Create `.env.example` file in server folder:
  ```
  PORT=3001
  NODE_ENV=development
  DATABASE_URL=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_here
  ```
- [ ] Create `server.js` file with basic Express setup and test route:
  ```javascript
  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const helmet = require('helmet');

  const app = express();

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
- [ ] Test server: `npm run dev`
- [ ] Verify server starts without errors
- [ ] Test route in browser: http://localhost:3001/api/test
- [ ] Stop the dev server (Ctrl+C)

## Folder Structure

```
server/
├── models/         (Database schemas/models)
├── controllers/    (Business logic for routes)
├── routes/         (API route handlers)
├── middleware/     (Authentication, validation, error handling)
├── config/         (Database connection, config files)
├── utils/          (Helper functions, validators, token generators)
├── server.js       (Main server file)
├── .env            (Environment variables - NOT committed)
├── .env.example    (Example env file - committed)
└── package.json
```

## Acceptance Criteria

- [ ] package.json created in server folder
- [ ] All core dependencies installed (express, dotenv, cors, bcrypt, jsonwebtoken)
- [ ] All security dependencies installed (helmet, express-rate-limit)
- [ ] Database ORM installed (mongoose OR sequelize)
- [ ] nodemon installed as dev dependency
- [ ] Scripts added to package.json
- [ ] All folders created (models, controllers, routes, middleware, config, utils)
- [ ] .env and .env.example files created
- [ ] server.js created with test route
- [ ] Server runs successfully on port 3001
- [ ] Test route returns JSON response
