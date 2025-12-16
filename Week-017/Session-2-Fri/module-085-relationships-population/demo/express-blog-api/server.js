// Express Blog API with Relationships and Population
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// ===== USER ROUTES =====

// GET all users
app.get('/api/users', async (request, response) => {
  try {
    const users = await User.find();
    response.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST create user
app.post('/api/users', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      return response.status(400).json({
        success: false,
        error: error.message
      });
    }
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== POST ROUTES =====

// GET all posts (with author information)
app.get('/api/posts', async (request, response) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email") // populating to the posts that are returned the author
      .sort({ createdAt: -1 });

    // each post w/o populate
    // title - string
    // content - string
    // author - (ObjectId)
    // likes - Number

    // each post w/ .populate("author", "username email")
    // title - string
    // content - string
    // author - Object
    //        - username - string
    //        - email - string
    // likes - Number

    response.json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET single post with author
app.get('/api/posts/:id', async (request, response) => {
  try {
    const post = await Post.findById(request.params.id)
      .populate('author', 'username email');

    if (!post) {
      return response.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    response.json({
      success: true,
      data: post
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST create new post
app.post('/api/posts', async (request, response) => {
  try {
    // Check if author exists
    const user = await User.findById(request.body.author);
    if (!user) {
      return response.status(404).json({
        success: false,
        error: 'Author not found'
      });
    }

    const post = await Post.create(request.body);

    // Populate author before sending response
    await post.populate('author', 'username email');

    response.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({
        success: false,
        error: error.message
      });
    }
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT update post (increment likes)
app.put('/api/posts/:id/like', async (request, response) => {
  try {
    const post = await Post.findByIdAndUpdate(
      request.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate('author', 'username');

    if (!post) {
      return response.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    response.json({
      success: true,
      data: post
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE post
app.delete('/api/posts/:id', async (request, response) => {
  try {
    const post = await Post.findByIdAndDelete(request.params.id);

    if (!post) {
      return response.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    response.json({
      success: true,
      message: 'Post deleted'
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ===== RELATIONSHIP ROUTES =====

// GET all posts by a specific user
app.get('/api/users/:id/posts', async (request, response) => {
  try {
    const user = await User.findById(request.params.id);

    if (!user) {
      return response.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const posts = await Post.find({ author: request.params.id })
      .sort({ createdAt: -1 });

    response.json({
      success: true,
      user: {
        username: user.username,
        email: user.email
      },
      postCount: posts.length,
      data: posts
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('\nAPI Endpoints:');
  console.log('\nUsers:');
  console.log('GET    /api/users          - Get all users');
  console.log('POST   /api/users          - Create user');
  console.log('\nPosts:');
  console.log('GET    /api/posts          - Get all posts (with authors)');
  console.log('GET    /api/posts/:id      - Get post by ID (with author)');
  console.log('POST   /api/posts          - Create post');
  console.log('PUT    /api/posts/:id/like - Like a post');
  console.log('DELETE /api/posts/:id      - Delete post');
  console.log('\nRelationships:');
  console.log('GET    /api/users/:id/posts - Get all posts by user');
});
