// Import required packages
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Middleware
app.use(express.json());
app.use(cors());

// In-memory data storage with sample data
const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    // Password: admin123
    password: '$2a$10$flukbxRFd5CBTY4neUpNvuUaUL1AFTawkjzrudI2XybKz.X9zW7.S', // admin123
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

const lists = [
  {
    id: 1,
    title: 'Best Developer Tools',
    description: 'Essential tools every developer should know',
    category: 'Development',
    websites: [
      {
        name: 'GitHub',
        url: 'https://github.com',
        description: 'Code hosting platform for version control'
      },
      {
        name: 'VS Code',
        url: 'https://code.visualstudio.com',
        description: 'Popular code editor with extensions'
      }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Learning Resources',
    description: 'Top websites for learning web development',
    category: 'Learning',
    websites: [
      {
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Comprehensive web development documentation'
      },
      {
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org',
        description: 'Free coding bootcamp with certifications'
      }
    ],
    createdBy: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Counter for generating unique IDs
let userIdCounter = 2;
let listIdCounter = 3;

// Helper function to generate JWT token
function generateToken(userId, name, email, role) {
  const payload = {
    userId: userId,
    name: name,
    email: email,
    role: role
  };

  // Token expires in 7 days
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  return token;
}

// POST /api/auth/register - Create new user account
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: userIdCounter++,
      name: name,
      email: email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Add user to array
    users.push(newUser);

    // Generate token
    const token = generateToken(newUser.id, newUser.name, newUser.email, newUser.role);

    // Return user data without password
    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/auth/login - Authenticate user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id, user.name, user.email, user.role);

    // Return user data without password
    res.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET /api/auth/me - Verify token and return user data
app.get('/api/auth/me', (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user by id
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data without password
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    console.error('Auth error:', error);
    res.status(500).json({ message: 'Server error during authentication' });
  }
});

// GET /api/lists - Get all website lists (public route)
app.get('/api/lists', (req, res) => {
  res.json({ lists: lists });
});

// POST /api/admin/lists - Create new list (admin only)
app.post('/api/admin/lists', (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { title, description, category, websites } = req.body;

    // Validate required fields
    if (!title || !description || !category || !websites || websites.length === 0) {
      return res.status(400).json({ message: 'Please provide title, description, category, and at least one website' });
    }

    // Create new list
    const newList = {
      id: listIdCounter++,
      title: title,
      description: description,
      category: category,
      websites: websites,
      createdBy: decoded.name,
      createdAt: new Date().toISOString()
    };

    // Add list to array
    lists.push(newList);

    res.status(201).json({
      message: 'List created successfully',
      list: newList
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Create list error:', error);
    res.status(500).json({ message: 'Server error creating list' });
  }
});

// PUT /api/admin/lists/:id - Update list (admin only)
app.put('/api/admin/lists/:id', (req, res) => {
  try {
    // Get token and verify admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const listId = parseInt(req.params.id);
    const { title, description, category, websites } = req.body;

    // Find list
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Update list properties
    if (title) lists[listIndex].title = title;
    if (description) lists[listIndex].description = description;
    if (category) lists[listIndex].category = category;
    if (websites) lists[listIndex].websites = websites;

    res.json({
      message: 'List updated successfully',
      list: lists[listIndex]
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Update list error:', error);
    res.status(500).json({ message: 'Server error updating list' });
  }
});

// DELETE /api/admin/lists/:id - Delete list (admin only)
app.delete('/api/admin/lists/:id', (req, res) => {
  try {
    // Get token and verify admin
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const listId = parseInt(req.params.id);

    // Find list index
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Remove list from array
    lists.splice(listIndex, 1);

    res.json({ message: 'List deleted successfully' });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    console.error('Delete list error:', error);
    res.status(500).json({ message: 'Server error deleting list' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nTest credentials:');
  console.log('Email: admin@example.com');
  console.log('Password: admin123');
});
