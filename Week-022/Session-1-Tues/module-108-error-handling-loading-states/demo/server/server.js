require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Sample data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', status: 'inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', status: 'active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', status: 'active' }
];

const posts = [
  { id: 1, title: 'Getting Started with React', author: 'Alice Johnson', views: 1250 },
  { id: 2, title: 'Understanding JavaScript Closures', author: 'Bob Smith', views: 980 },
  { id: 3, title: 'CSS Grid Layout Guide', author: 'Carol Williams', views: 1540 },
  { id: 4, title: 'Async/Await Best Practices', author: 'David Brown', views: 2100 }
];

// Helper to simulate delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Success endpoint - fast response
app.get('/api/fast', async (req, res) => {
  await delay(500);
  res.json({ message: 'Fast response!', timestamp: new Date().toISOString() });
});

// Success endpoint - slow response
app.get('/api/slow', async (req, res) => {
  await delay(3000);
  res.json({ message: 'This took 3 seconds', data: users });
});

// Get all users (success)
app.get('/api/users', async (req, res) => {
  await delay(1500);
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  await delay(1000);

  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
      error: `No user exists with ID ${userId}`
    });
  }

  res.json(user);
});

// Get all posts
app.get('/api/posts', async (req, res) => {
  await delay(1200);
  res.json(posts);
});

// Endpoint that randomly fails
app.get('/api/random', async (req, res) => {
  await delay(1000);

  const shouldFail = Math.random() > 0.5;

  if (shouldFail) {
    return res.status(500).json({
      message: 'Random server error',
      error: 'The server randomly decided to fail. Try again!'
    });
  }

  res.json({
    message: 'Success!',
    luckyNumber: Math.floor(Math.random() * 100)
  });
});

// Create user endpoint (validation errors)
app.post('/api/users', async (req, res) => {
  await delay(1000);

  const { name, email } = req.body;

  // Validation errors
  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      message: 'Validation failed',
      error: 'Name must be at least 2 characters long'
    });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({
      message: 'Validation failed',
      error: 'Please provide a valid email address'
    });
  }

  // Check for duplicate email
  if (users.find(u => u.email === email)) {
    return res.status(409).json({
      message: 'Conflict',
      error: 'A user with this email already exists'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    status: 'active'
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint that always fails (500)
app.get('/api/error', async (req, res) => {
  await delay(1000);
  res.status(500).json({
    message: 'Internal server error',
    error: 'This endpoint always fails for demo purposes'
  });
});

// Endpoint that returns 404
app.get('/api/notfound', async (req, res) => {
  await delay(800);
  res.status(404).json({
    message: 'Not found',
    error: 'The requested resource does not exist'
  });
});

// Endpoint with network timeout simulation
app.get('/api/timeout', async (req, res) => {
  // Never respond (simulates timeout)
  // Client should handle this with timeout logic
  await delay(30000);
  res.json({ message: 'This will never arrive' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nAvailable endpoints for testing:');
  console.log('- GET  /api/fast        (500ms delay, always succeeds)');
  console.log('- GET  /api/slow        (3s delay, always succeeds)');
  console.log('- GET  /api/users       (1.5s delay, returns user list)');
  console.log('- GET  /api/users/:id   (1s delay, 404 if user not found)');
  console.log('- GET  /api/posts       (1.2s delay, returns posts)');
  console.log('- GET  /api/random      (1s delay, randomly fails)');
  console.log('- POST /api/users       (1s delay, validation errors)');
  console.log('- GET  /api/error       (1s delay, always returns 500)');
  console.log('- GET  /api/notfound    (800ms delay, always returns 404)');
  console.log('- GET  /api/timeout     (never responds, simulates timeout)');
});
