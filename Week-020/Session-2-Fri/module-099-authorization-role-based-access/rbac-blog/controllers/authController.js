// Authentication Controller with RBAC
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

// Register a new user
async function register(request, response) {
  try {
    const { username, email, password, role } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({
        error: 'All fields are required'
      });
    }

    const existingUser = User.findByUsernameOrEmail(username, email);
    if (existingUser) {
      return response.status(400).json({
        error: 'Username or email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with default role 'user'
    const newUser = User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'  // Default to 'user' if no role specified
    });

    // Create JWT token with role included
    const token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
        role: newUser.role  // Include role in token
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    response.status(201).json({
      message: 'Registration successful',
      token,
      user: User.getSafeUser(newUser)
    });

  } catch (error) {
    console.error('Registration error:', error);
    response.status(500).json({ error: 'Registration failed' });
  }
}

// Login user
async function login(request, response) {
  try {
    const { username, email, password } = request.body;

    // Accept either username or email for login
    const loginIdentifier = email || username;

    if (!loginIdentifier || !password) {
      return response.status(400).json({
        error: 'Username/email and password are required'
      });
    }

    // Try to find user by email first, then by username
    const user = email ? User.findByEmail(email) : User.findByUsername(username);
    if (!user) {
      return response.status(401).json({
        error: 'Invalid credentials'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Create JWT token with role included
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role  // Include role in token
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    response.json({
      message: 'Login successful',
      token,
      user: User.getSafeUser(user)
    });

  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ error: 'Login failed' });
  }
}

module.exports = { register, login };
