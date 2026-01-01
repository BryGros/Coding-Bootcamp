// MongoDB Authentication Example
// This demonstrates user authentication with MongoDB and bcrypt

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const connectionString = 'mongodb://localhost:27017/auth-example';
mongoose.connect(connectionString);

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Signup endpoint - creates a new user account
app.post('/signup', async (request, response) => {
  try {
    // Get the username and password from the request body
    const username = request.body.username;
    const password = request.body.password;

    // Check if username and password were provided
    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required'
      });
    }

    // Check if password is long enough
    if (password.length < 6) {
      return response.status(400).json({
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return response.status(400).json({
        message: 'Username already exists'
      });
    }

    // Hash the password with bcrypt (10 is the salt rounds)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user document
    const newUser = new User({
      username: username,
      hashedPassword: hashedPassword
    });

    // Save the user to MongoDB
    await newUser.save();

    // Send success response (never send back the password!)
    response.status(201).json({
      message: 'User created successfully',
      username: username,
      userId: newUser._id
    });

  } catch (error) {
    console.error('Signup error:', error);

    // Handle duplicate key error (happens if two requests try to create same username)
    if (error.code === 11000) {
      return response.status(400).json({
        message: 'Username already exists'
      });
    }

    response.status(500).json({ message: 'Server error during signup' });
  }
});

// Login endpoint - verifies user credentials
app.post('/login', async (request, response) => {
  try {
    // Get the username and password from the request body
    const username = request.body.username;
    const password = request.body.password;

    // Check if username and password were provided
    if (!username || !password) {
      return response.status(400).json({
        message: 'Username and password are required'
      });
    }

    // Find the user in MongoDB
    const user = await User.findOne({ username: username });
    if (!user) {
      return response.status(401).json({
        message: 'Invalid username or password'
      });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordMatch) {
      return response.status(401).json({
        message: 'Invalid username or password'
      });
    }

    // If we get here, login was successful
    response.status(200).json({
      message: 'Login successful',
      username: username,
      userId: user._id
    });

  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ message: 'Server error during login' });
  }
});

// Test endpoint to see all users (FOR DEVELOPMENT ONLY - never do this in production!)
app.get('/users', async (request, response) => {
  try {
    // Get all users but only return username and creation date
    const users = await User.find({}, 'username createdAt');

    response.json({
      message: 'Current users',
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    response.status(500).json({ message: 'Server error fetching users' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Try these endpoints:');
  console.log('  POST /signup - Create a new user');
  console.log('  POST /login - Login with existing user');
  console.log('  GET /users - View all users');
});
