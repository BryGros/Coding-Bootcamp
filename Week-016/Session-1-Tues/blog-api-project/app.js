const express = require("express");
const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;
// Built in Middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log("Request: ", req);
  console.log("Response: ", res);
  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

// Base URL endpoint
app.get("/", (req, res) => {
  res.json({
    title: "Blog Posting API",
    version: "1.0.0",
    endpoints: {
      posts: {
        "GET /api/posts": "Get all blog posts",
        "GET /api/posts/postId": "Get a specific blog post",
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
      addPost: {
        body: {
          title: "string, required, min 3 chars",
          content: "string, required, min 10 chars",
          author: "string, required",
        },
      },
      updatePost: {
        param: "/postId",
        body: {
          title: "string, required, min 3 chars",
          content: "string, required, min 10 chars",
        },
      },
      deletePost: {
        param: "/postId",
      },
      addUser: {
        body: {
          name: "string, required, min 2 chars",
          email:
            "string, required, must be a valid email address (includes @ and a '.' afterwards)",
          role: "string, optional, must be author, admin, or reader (defaulted)",
        },
      },
      updateUser: {
        param: "/userId",
        body: {
          name: "string, required, min 2 chars",
          email:
            "string, required, must be a valid email address (includes @ and a '.' afterwards)",
          role: "string, optional, must be author, admin, or reader (defaulted)",
        },
      },
      deleteUser: {
        param: "/userId",
      },
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
    error: "Route not found",
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
