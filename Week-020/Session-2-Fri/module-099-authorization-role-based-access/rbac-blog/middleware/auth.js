// Authentication Middleware
// This middleware verifies JWT tokens

const jwt = require('jsonwebtoken');

// Secret key for JWT verification
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Authentication middleware function
function authenticateToken(request, response, next) {
  // Get the Authorization header from the request
  const authHeader = request.headers.authorization;

  // Extract the token from "Bearer TOKEN" format
  const token = authHeader && authHeader.split(' ')[1];

  // Check if token was provided
  if (!token) {
    return response.status(401).json({
      error: 'Access token required'
    });
  }

  // Verify the token using the secret key
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user data to the request object
    // This includes userId, username, and role
    request.user = decoded;

    // Continue to the next middleware or route handler
    next();

  } catch (error) {
    // Handle different types of token errors
    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'Token expired. Please login again.'
      });
    }

    return response.status(403).json({
      error: 'Invalid token'
    });
  }
}

// Export the JWT secret so it can be used in auth controller
module.exports = {
  authenticateToken,
  JWT_SECRET
};
