// User management routes (admin only)

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');
const { requireAdmin, preventSelfRoleChange } = require('../middleware/authorize');
const { validate, validateObjectId } = require('../middleware/validate');
const { updateRoleSchema } = require('../utils/validators');

// All routes require authentication and admin role
// We apply these middleware to all routes in this file
router.use(authenticate);
router.use(requireAdmin);

// GET /api/users - Get all users with pagination
router.get('/', async (req, res) => {
  try {
    // Get pagination parameters from query string
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get filter parameter for role
    const roleFilter = req.query.role;
    const query = {};

    // Add role filter if provided
    if (roleFilter && ['user', 'moderator', 'admin'].includes(roleFilter)) {
      query.role = roleFilter;
    }

    // Get users with pagination
    const users = await User.find(query)
      .select('-password -refreshTokens')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        users: users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit),
          totalUsers: totalUsers,
          usersPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting users'
    });
  }
});

// GET /api/users/statistics - Get user statistics
router.get('/statistics', async (req, res) => {
  try {
    // Use the static method to get statistics
    const statistics = await User.getUserStatistics();

    // Get total user count
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers: totalUsers,
        byRole: statistics
      }
    });

  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting statistics'
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID, exclude sensitive fields
    const user = await User.findById(userId)
      .select('-password -refreshTokens')
      .populate('postCount');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: user
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting user'
    });
  }
});

// PUT /api/users/:id/role - Update user role
router.put(
  '/:id/role',
  validateObjectId('id'),
  preventSelfRoleChange,
  validate(updateRoleSchema),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const { role } = req.body;

      // Find user
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update role
      user.role = role;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        }
      });

    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error updating user role'
      });
    }
  }
);

// PUT /api/users/:id/deactivate - Deactivate user account
router.put('/:id/deactivate', validateObjectId('id'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deactivating their own account
    if (userId === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You cannot deactivate your own account'
      });
    }

    // Find and update user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User account deactivated successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          isActive: user.isActive
        }
      }
    });

  } catch (error) {
    console.error('Deactivate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deactivating user'
    });
  }
});

// PUT /api/users/:id/activate - Activate user account
router.put('/:id/activate', validateObjectId('id'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and update user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User account activated successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          isActive: user.isActive
        }
      }
    });

  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error activating user'
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', validateObjectId('id'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting their own account
    if (userId === req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    // Find and delete user
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUser: {
          id: user._id,
          username: user.username
        }
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting user'
    });
  }
});

module.exports = router;
