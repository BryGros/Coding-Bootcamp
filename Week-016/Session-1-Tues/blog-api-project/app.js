const express = require("express");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

const PORT = 3000;
const app = express();
// Built in Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log("Request: ", req);
  console.log("Response: ", res);
  next();
});

app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);
// Base URL endpoint
app.get("/", (req, res) => {
  res.json({
    title: "Blog Posting API",
    version: "1.0.0",
    endpoints: {
      posts: {
        "GET /api/posts": "Get all blog posts",
        "GET /api/posts/:id": "Get a specific blog post",
        "POST /api/posts": "Add a new blog post",
        "PUT api/posts/:id": "Update a specific blog post",
        "DELETE /api/posts/:id": "Delete a specific blog post",
      },
      users: {
        "GET /api/users": "Get all Users",
        "POST /api/users": "Add a new User",
        "GET /api/users/:id": "Get a specific User",
        "PUT /api/users/:id": "Update a specific User",
        "DELETE /api/users/:id": "Delete a specific user",
      },
      general: {
        "GET /health":
          "Get the health of the API server, including uptime (in seconds)",
        "GET /": "Get Documentation and other route details for the API",
      },
    },
    documentation: {
      post: {},
      updatePost: {},
      user: {},
      updateUser: {},
    },
  });
});

// Health endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "LIVE",
    timestamp: new Date(),
    uptime: Math.floor(process.uptime()),
  });
});

// 404 for any other route (as of Express 5.x, we have to do it this way for all other routes)
app.use(/(.*)/, (req, res) => {
  res.status(404).json({
    error: `The route ${req.method} ${req.originalUrl} does not exist`,
    validRoutes: [
      "GET /",
      "GET /health",
      "GET /api/posts",
      "POST /api/posts",
      "GET /api/posts/:id",
      "PUT /api/posts/:id",
      "DELETE /api.posts/:id",
      "GET /api/users",
      "POST /api/users",
      "GET /api/users/:id",
      "PUT /api/users/:id",
      "DELETE /api/users/:id",
    ],
  });
});

// Error handling middleare (must be last)

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
});
