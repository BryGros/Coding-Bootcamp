// Authentication routes: register, login, logout, refresh token, get current user

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateTokenPair, verifyRefreshToken } = require('../utils/generateToken');
const { validate } = require('../middleware/validate');
const { registerSchema, loginSchema, refreshTokenSchema } = require('../utils/validators');
const { authenticate } = require('../middleware/auth');

// POST /api/auth/register - Register a new user
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    // Check if user with this email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists'
      });
    }

    // Check if user with this username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: 'A user with this username already exists'
      });
    }

    // Create new user
    // Password will be automatically hashed by the pre-save middleware
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    });

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokenPair(user._id);

    // Save refresh token to user document
    await user.addRefreshToken(refreshToken);

    // Send response with tokens and user data
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role
        },
        token: accessToken,
        refreshToken: refreshToken
      }
    });

  } catch (error) {
    console.error('Register error:', error);

    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by credentials (static method that checks password)
    const user = await User.findByCredentials(email, password);

    // Update last login time
    await user.updateLastLogin();

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = generateTokenPair(user._id);

    // Save refresh token to user document
    await user.addRefreshToken(refreshToken);

    // Send response with tokens and user data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          lastLogin: user.lastLogin
        },
        token: accessToken,
        refreshToken: refreshToken
      }
    });

  } catch (error) {
    console.error('Login error:', error);

    // Return generic error message for security
    // We don't want to tell attackers if email or password is wrong
    res.status(401).json({
      success: false,
      message: error.message || 'Invalid email or password'
    });
  }
});

// POST /api/auth/refresh - Refresh access token using refresh token
router.post('/refresh', validate(refreshTokenSchema), async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Verify the refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token'
      });
    }

    // Get the user
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    // Verify that the refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(rt => rt.token === refreshToken);

    if (!tokenExists) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token has been revoked'
      });
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokenPair(user._id);

    // Remove old refresh token and add new one
    await user.removeRefreshToken(refreshToken);
    await user.addRefreshToken(newRefreshToken);

    // Send response with new tokens
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: accessToken,
        refreshToken: newRefreshToken
      }
    });

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token refresh'
    });
  }
});

// GET /api/auth/me - Get current user profile (protected)
router.get('/me', authenticate, async (req, res) => {
  try {
    // User is already attached to req by authenticate middleware
    const user = req.user;

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user profile'
    });
  }
});

// POST /api/auth/logout - Logout user (protected)
router.post('/logout', authenticate, async (req, res) => {
  try {
    // Get refresh token from request body
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Remove the refresh token from user document
      await req.user.removeRefreshToken(refreshToken);
    }

    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

module.exports = router;
