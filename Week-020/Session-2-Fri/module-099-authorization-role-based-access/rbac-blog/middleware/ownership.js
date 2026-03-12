// Ownership Middleware - Checks if user owns a resource or has elevated role

const Post = require('../models/Post');

// Check if user owns the post OR has elevated role (moderator/admin)
function checkPostOwnership(allowedRoles = []) {
  return (req, res, next) => {
    const postId = parseInt(req.params.postId);
    const post = Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user owns the post
    const isOwner = post.author === req.user.userId;

    // Check if user has an allowed role that can override ownership
    const hasAllowedRole = allowedRoles.includes(req.user.role);

    // Allow if owner OR has allowed role
    if (isOwner || hasAllowedRole) {
      // Attach post to request for controller use
      req.post = post;
      return next();
    }

    // Access denied
    return res.status(403).json({
      error: 'Access denied. You can only modify your own posts.'
    });
  };
}

module.exports = {
  checkPostOwnership
};
