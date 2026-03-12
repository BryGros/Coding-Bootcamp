// Post routes with authorization and ownership checks

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');
const { authorize, authorizeOwnerOrRole } = require('../middleware/authorize');
const { validate, validateObjectId } = require('../middleware/validate');
const { createPostSchema, updatePostSchema } = require('../utils/validators');

// GET /api/posts - Get all published posts (public)
router.get('/', optionalAuthenticate, async (req, res) => {
  try {
    // Get pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get posts using static method
    const result = await Post.getPublishedPosts(page, limit);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting posts'
    });
  }
});

// GET /api/posts/trending - Get trending posts (public)
router.get('/trending', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    // Get trending posts using static method
    const trendingPosts = await Post.getTrendingPosts(limit);

    res.status(200).json({
      success: true,
      data: {
        posts: trendingPosts
      }
    });

  } catch (error) {
    console.error('Get trending posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting trending posts'
    });
  }
});

// GET /api/posts/analytics - Get post analytics (admin only)
router.get('/analytics', authenticate, authorize('admin'), async (req, res) => {
  try {
    // Get analytics using static method
    const analytics = await Post.getAnalytics();

    res.status(200).json({
      success: true,
      data: {
        analytics: analytics
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting analytics'
    });
  }
});

// GET /api/posts/search - Search posts by keyword (public)
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.q;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: 'Search keyword is required. Use ?q=keyword'
      });
    }

    // Search posts using static method
    const posts = await Post.searchPosts(keyword);

    res.status(200).json({
      success: true,
      data: {
        keyword: keyword,
        results: posts.length,
        posts: posts
      }
    });

  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching posts'
    });
  }
});

// GET /api/posts/tag/:tag - Get posts by tag (public)
router.get('/tag/:tag', async (req, res) => {
  try {
    const tag = req.params.tag;

    // Get posts by tag using static method
    const posts = await Post.getPostsByTag(tag);

    res.status(200).json({
      success: true,
      data: {
        tag: tag,
        results: posts.length,
        posts: posts
      }
    });

  } catch (error) {
    console.error('Get posts by tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting posts by tag'
    });
  }
});

// GET /api/posts/user/me - Get current user's posts (protected)
router.get('/user/me', authenticate, async (req, res) => {
  try {
    // Find all posts by current user
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        posts: posts,
        count: posts.length
      }
    });

  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting your posts'
    });
  }
});

// GET /api/posts/:id - Get single post by ID (public)
router.get('/:id', validateObjectId('id'), optionalAuthenticate, async (req, res) => {
  try {
    const postId = req.params.id;

    // Find post and populate author
    const post = await Post.findById(postId)
      .populate('author', 'username firstName lastName');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Only show published posts to non-authenticated users
    if (post.status !== 'published' && !req.user) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Only author, moderators, and admins can see unpublished posts
    if (post.status !== 'published' && req.user) {
      const isAuthor = post.isAuthor(req.user._id);
      const isModerator = req.user.role === 'moderator' || req.user.role === 'admin';

      if (!isAuthor && !isModerator) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }
    }

    // Increment view count (only for published posts)
    if (post.status === 'published') {
      await post.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: {
        post: post
      }
    });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error getting post'
    });
  }
});

// POST /api/posts - Create new post (protected)
router.post(
  '/',
  authenticate,
  validate(createPostSchema),
  async (req, res) => {
    try {
      const { title, content, tags, status } = req.body;

      // Create new post with current user as author
      const post = await Post.create({
        title,
        content,
        tags,
        status,
        author: req.user._id
      });

      // Populate author information
      await post.populate('author', 'username firstName lastName');

      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: {
          post: post
        }
      });

    } catch (error) {
      console.error('Create post error:', error);

      // Handle validation errors
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
        message: 'Server error creating post'
      });
    }
  }
);

// PUT /api/posts/:id - Update post (owner, moderator, or admin)
router.put(
  '/:id',
  authenticate,
  validateObjectId('id'),
  authorizeOwnerOrRole('moderator', 'admin'),
  validate(updatePostSchema),
  async (req, res) => {
    try {
      const postId = req.params.id;

      // Find the post
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      // Check ownership using the function from authorize middleware
      if (!req.checkOwnership(post.author)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only update your own posts.'
        });
      }

      // Update only the fields that were provided
      const { title, content, tags, status } = req.body;

      if (title !== undefined) post.title = title;
      if (content !== undefined) post.content = content;
      if (tags !== undefined) post.tags = tags;
      if (status !== undefined) post.status = status;

      // Save the updated post
      await post.save();

      // Populate author information
      await post.populate('author', 'username firstName lastName');

      res.status(200).json({
        success: true,
        message: 'Post updated successfully',
        data: {
          post: post
        }
      });

    } catch (error) {
      console.error('Update post error:', error);

      // Handle validation errors
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
        message: 'Server error updating post'
      });
    }
  }
);

// DELETE /api/posts/:id - Delete post (owner, moderator, or admin)
router.delete(
  '/:id',
  authenticate,
  validateObjectId('id'),
  authorizeOwnerOrRole('moderator', 'admin'),
  async (req, res) => {
    try {
      const postId = req.params.id;

      // Find the post
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      // Check ownership using the function from authorize middleware
      if (!req.checkOwnership(post.author)) {
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only delete your own posts.'
        });
      }

      // Delete the post
      await Post.findByIdAndDelete(postId);

      res.status(200).json({
        success: true,
        message: 'Post deleted successfully',
        data: {
          deletedPost: {
            id: post._id,
            title: post.title
          }
        }
      });

    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error deleting post'
      });
    }
  }
);

module.exports = router;
