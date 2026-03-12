// Authorization middleware for role-based access control (RBAC)

// Middleware to check if user has one of the required roles
// Usage: authorize('admin', 'moderator')
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Make sure user is authenticated first
    // The authenticate middleware should run before this
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login first.'
      });
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. User role '${req.user.role}' is not authorized to access this resource.`,
        requiredRoles: allowedRoles
      });
    }

    // User has the required role, continue
    next();
  };
};

// Middleware to check resource ownership or admin/moderator access
// This allows users to access their own resources, or admins/moderators to access any
const authorizeOwnerOrRole = (...allowedRoles) => {
  return (req, res, next) => {
    // Make sure user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please login first.'
      });
    }

    // Store ownership check function for route handlers
    // The route handler will call this to verify ownership
    req.checkOwnership = (resourceOwnerId) => {
      // Convert both IDs to strings for comparison
      const userId = req.user._id.toString();
      const ownerId = resourceOwnerId.toString();

      // Allow if user is the owner
      if (userId === ownerId) {
        return true;
      }

      // Allow if user has one of the allowed roles
      if (allowedRoles.includes(req.user.role)) {
        return true;
      }

      return false;
    };

    next();
  };
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please login first.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }

  next();
};

// Middleware to check if user is moderator or admin
const requireModeratorOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please login first.'
    });
  }

  if (req.user.role !== 'moderator' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Moderator or Admin privileges required.'
    });
  }

  next();
};

// Middleware to prevent users from modifying their own role
const preventSelfRoleChange = (req, res, next) => {
  // Get the user ID from the route parameter
  const targetUserId = req.params.id;
  const currentUserId = req.user._id.toString();

  // Check if user is trying to modify their own role
  if (targetUserId === currentUserId) {
    return res.status(403).json({
      success: false,
      message: 'You cannot change your own role. Ask another admin for help.'
    });
  }

  next();
};

// Middleware to check account ownership
// Only allows users to access/modify their own account
const requireAccountOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please login first.'
    });
  }

  // Get the user ID from route parameters
  const targetUserId = req.params.id;
  const currentUserId = req.user._id.toString();

  // Allow if user is accessing their own account
  if (targetUserId === currentUserId) {
    return next();
  }

  // Also allow admins to access any account
  if (req.user.role === 'admin') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. You can only access your own account.'
  });
};

module.exports = {
  authorize,
  authorizeOwnerOrRole,
  requireAdmin,
  requireModeratorOrAdmin,
  preventSelfRoleChange,
  requireAccountOwnership
};
