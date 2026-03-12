// Utility functions for generating and verifying JWT tokens

const jwt = require('jsonwebtoken');

// Generate an access token for a user
// Access tokens are short-lived (15 minutes) for security
const generateAccessToken = (userId) => {
  // Make sure JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Create a payload with user information
  const payload = {
    userId: userId,
    type: 'access'
  };

  // Sign the token with the secret key and set expiration
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '15m'
    }
  );

  return token;
};

// Generate a refresh token for a user
// Refresh tokens are long-lived (7 days) to avoid frequent re-authentication
const generateRefreshToken = (userId) => {
  // Make sure JWT_REFRESH_SECRET exists
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not defined in environment variables');
  }

  // Create a payload with user information
  const payload = {
    userId: userId,
    type: 'refresh'
  };

  // Sign the token with a different secret key
  const token = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    }
  );

  return token;
};

// Verify an access token
const verifyAccessToken = (token) => {
  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Make sure it's an access token
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }

    return decoded;
  } catch (error) {
    // If token is expired or invalid, throw error
    throw new Error('Invalid or expired token');
  }
};

// Verify a refresh token
const verifyRefreshToken = (token) => {
  try {
    // Verify the token with the refresh secret key
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Make sure it's a refresh token
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }

    return decoded;
  } catch (error) {
    // If token is expired or invalid, throw error
    throw new Error('Invalid or expired refresh token');
  }
};

// Generate both access and refresh tokens at once
const generateTokenPair = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);

  return {
    accessToken,
    refreshToken
  };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair
};
