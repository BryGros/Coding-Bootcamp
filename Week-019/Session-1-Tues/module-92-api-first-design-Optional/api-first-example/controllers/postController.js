// In-memory data store
let posts = [
  { id: 1, title: 'First Post', content: 'This is my first post', author: 'Alice' },
  { id: 2, title: 'Second Post', content: 'Another great post', author: 'Bob' }
]

let nextId = 3

// GET all posts
function getAllPosts(req, res) {
  res.json(posts)
}

// GET post by ID
function getPostById(req, res) {
  const postId = parseInt(req.params.id)
  const post = posts.find(p => p.id === postId)

  if (!post) {
    return res.status(404).json({ error: 'Post not found' })
  }

  res.json(post)
}

// POST create new post
function createPost(req, res) {
  const { title, content, author } = req.body

  // Validation
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  // Create new post
  const newPost = {
    id: nextId++,
    title: title,
    content: content,
    author: author || 'Anonymous'
  }

  posts.push(newPost)

  res.status(201).json(newPost)
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost
}
