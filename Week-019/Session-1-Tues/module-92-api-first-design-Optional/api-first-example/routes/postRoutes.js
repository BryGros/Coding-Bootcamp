const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

// GET /posts - Get all posts
router.get('/', postController.getAllPosts)

// POST /posts - Create new post
router.post('/', postController.createPost)

// GET /posts/:id - Get post by ID
router.get('/:id', postController.getPostById)

module.exports = router
