// Role-Based Access Control Middleware
// This middleware checks if a user has the required role to access a route

// Middleware factory function that creates role-checking middleware
function requireRole(...allowedRoles) {
  // Return a middleware function
  return function(request, response, next) {
    // Get the user's role from the JWT token (set by authenticateToken middleware)
    const userRole = request.user.role;

    // Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(userRole)) {
      return response.status(403).json({
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    // User has the required role - continue to route handler
    next();
  };
}

// Middleware to check if user is admin
function requireAdmin(request, response, next) {
  if (request.user.role !== 'admin') {
    return response.status(403).json({
      error: 'Access denied. Admin role required.'
    });
  }

  next();
}

// Middleware to check if user is moderator or admin
function requireModerator(request, response, next) {
  const userRole = request.user.role;

  if (userRole !== 'moderator' && userRole !== 'admin') {
    return response.status(403).json({
      error: 'Access denied. Moderator or admin role required.'
    });
  }

  next();
}

// Middleware to check if user owns resource OR is moderator/admin
function requireOwnerOrModerator(resourceOwnerId) {
  return function(request, response, next) {
    const userId = request.user.userId;
    const userRole = request.user.role;

    // Check if user is the owner
    const isOwner = userId === resourceOwnerId;

    // Check if user is moderator or admin
    const isModerator = userRole === 'moderator' || userRole === 'admin';

    if (!isOwner && !isModerator) {
      return response.status(403).json({
        error: 'Access denied. You must be the owner, moderator, or admin.'
      });
    }

    next();
  };
}

// Export middleware functions
module.exports = {
  requireRole,
  requireAdmin,
  requireModerator,
  requireOwnerOrModerator
};
