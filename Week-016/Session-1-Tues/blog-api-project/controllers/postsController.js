let posts = [
  {
    id: 1,
    title: "I like Pancakes", // required, min 3 chars
    content: "They are light and fluffy", // required, min 10 chars
    author: "John Doe", // required
    published: false, // optional, default false
    createdAt: "Dec 12, 2025",
    lastUpdated: "Dec 12, 2025",
  },
];

const getAllPosts = (req, res) => {
  // getAllPosts() - Return all posts and count of posts
  res.json({
    count: posts.length,
    posts: posts,
  });
};

const getPostById = (req, res) => {
  // getPostById() - Find and return specific post
  const { id } = req.params;
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return res.status(404).json({
      error: "Post not found",
      requestedId: id,
    });
  }
  res.json({
    post: {
      id: post.id,
      title: post.title, // required, min 3 chars
      content: post.content, // required, min 10 chars
      author: post.author, // required
      published: post.published, // optional, default false
      createdAt: post.createdAt,
      lastUpdated: post.lastUpdated,
    },
  });
};

const createPost = (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    let message;
    if (!title) {
      message = "A title for your Post is required";
    } else if (!content) {
      message = "Your Post must have some content";
    } else {
      message = "Your Post must have an author";
    }
    return res.status(400).json({
      error: message,
      recieved: { title, content, author },
    });
  }
  if (title.length < 3 || content.length < 10) {
    let message;
    if (title.length < 3) {
      message = "The title of the post must be at least 3 characters long";
    } else {
      message = "The content of the post must be at least 10 characters long";
    }
    return res.status(411).json({
      error: message,
      titleLength: title.length,
      contentLength: content.length,
    });
  }
  const creationDate = new Date().toDateString();
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author,
    published: false,
    createdAt: creationDate,
    lastUpdated: creationDate,
  };

  posts.push(newPost);
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
};

const updatePost = (req, res) => {
  // updatePost() - Find and update existing post
  const { id } = req.params;
  const { title, content } = req.body;

  let postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({
      error: "Post not found",
      requestedId: id,
    });
  }
  if ((title && title.length < 3) || (content && content.length < 10)) {
    let message;
    if (title.length < 3) {
      message = "The title of the post must be at least 3 characters long";
    } else {
      message = "The content of the post must be at least 10 characters long";
    }
    return res.status(411).json({
      error: message,
      titleLength: title.length,
      contentLength: content.length,
    });
  }

  const updateDate = new Date().toDateString();
  const initPostDet = posts[postIndex];

  posts[postIndex] = {
    id: parseInt(id),
    title: title || initPostDet.title,
    content: content || initPostDet.content,
    author: initPostDet.author,
    published: initPostDet.published,
    createdAt: initPostDet.createdAt,
    lastUpdated: updateDate,
  };
  res.json({
    message: "Post Updated Succesfully!",
    post: posts[postIndex],
  });
};

const deletePost = (req, res) => {
  // deletePost() - Find and remove post
  const { id } = req.params;

  let postIndex = posts.findIndex((post) => post.id === parseInt(id));

  if (postIndex === -1) {
    return res.status(404).json({
      error: "Post not found",
      requestedId: id,
    });
  }

  const deletedPost = posts.splice(postIndex, 1)[0];
  res.json({
    message: "Post deleted successfully",
    deletedPost,
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
