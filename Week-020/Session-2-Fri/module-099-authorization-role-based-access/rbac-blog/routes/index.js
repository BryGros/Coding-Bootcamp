// Routes index - combines all routes with RBAC middleware
const express = require('express');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');
const { requireRole, requireAdmin, requireModerator } = require('../middleware/rbac');
const { checkPostOwnership } = require('../middleware/ownership');

const router = express.Router();

// ==========================================
// PUBLIC ROUTES (no authentication)
// ==========================================
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/posts', postController.getAllPosts);

// ==========================================
// AUTHENTICATED ROUTES (any logged-in user)
// ==========================================
router.post('/posts', authenticateToken, postController.createPost);

// ==========================================
// OWNERSHIP + ROLE-BASED ROUTES
// ==========================================

// Update post: Owner OR moderator/admin can edit
// Uses ownership middleware to check:
// - Is user the post owner? OR
// - Does user have moderator/admin role?
router.put(
  '/posts/:postId',
  authenticateToken,
  checkPostOwnership(['moderator', 'admin']), // Allow owner OR these roles
  postController.updatePost
);

// ==========================================
// ROLE-BASED ROUTES (specific roles only)
// ==========================================

// Flag post: Moderator or admin only
router.put('/posts/:postId/flag', authenticateToken, requireModerator, postController.flagPost);

// Delete post: Admin only
router.delete('/posts/:postId', authenticateToken, requireRole('admin'), postController.deletePost);

// Admin user management
router.get('/admin/users', authenticateToken, requireAdmin, adminController.getAllUsers);
router.put('/admin/users/:userId/role', authenticateToken, requireAdmin, adminController.updateUserRole);
router.delete('/admin/users/:userId', authenticateToken, requireAdmin, adminController.deleteUser);
router.get('/admin/stats', authenticateToken, requireAdmin, adminController.getStats);

module.exports = router;
