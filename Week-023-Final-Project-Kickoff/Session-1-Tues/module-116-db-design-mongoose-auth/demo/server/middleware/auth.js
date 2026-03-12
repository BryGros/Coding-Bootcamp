// Authentication middleware to protect routes and verify JWT tokens

const { verifyAccessToken } = require('../utils/generateToken');
const User = require('../models/User');

// Middleware to verify JWT token and authenticate user
const authenticate = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    // Expected format: "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Check if it starts with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format. Use: Bearer <token>'
      });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // Verify the token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please login again.'
      });
    }

    // Get the user from the database using the ID from token
    const user = await User.findById(decoded.userId);

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists'
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated'
      });
    }

    // Attach the user to the request object
    // This makes the user available in subsequent route handlers
    req.user = user;

    // Continue to the next middleware or route handler
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

// Optional authentication middleware
// This allows access even without a token, but attaches user if token is valid
const optionalAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // If no token provided, just continue without user
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    // Extract the token
    const token = authHeader.substring(7);

    // Try to verify the token
    try {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId);

      // If user exists and is active, attach to request
      if (user && user.isActive) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid, but we don't send error
      // Just continue without user attached
    }

    next();

  } catch (error) {
    console.error('Optional authentication error:', error);
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuthenticate
};
