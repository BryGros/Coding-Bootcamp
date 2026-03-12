// Post Controller with RBAC
const Post = require('../models/Post');

// Get all posts (public)
function getAllPosts(req, res) {
  const posts = Post.getAllSorted();
  res.json({ count: posts.length, posts });
}

// Create post (authenticated users)
function createPost(req, res) {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  const newPost = Post.create({
    title,
    content,
    author: req.user.userId,
    authorName: req.user.username
  });

  res.status(201).json({ message: 'Post created', post: newPost });
}

// Update post (owner or moderator/admin)
// NOTE: Ownership check handled by middleware in routes/index.js
function updatePost(req, res) {
  const postId = parseInt(req.params.postId);
  const { title, content } = req.body;

  // Post already verified by ownership middleware
  // Middleware ensures user owns post OR has moderator/admin role
  const updatedPost = Post.updateById(postId, { title, content });
  res.json({ message: 'Post updated', post: updatedPost });
}

// Delete post (admin only - enforced by RBAC middleware)
function deletePost(req, res) {
  const postId = parseInt(req.params.postId);

  // Admin role already verified by requireRole middleware
  Post.deleteById(postId);
  res.json({ message: 'Post deleted' });
}

// Flag post (moderator/admin only)
function flagPost(req, res) {
  const postId = parseInt(req.params.postId);
  const post = Post.updateById(postId, { status: 'flagged' });

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.json({ message: 'Post flagged', post });
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  flagPost
};
