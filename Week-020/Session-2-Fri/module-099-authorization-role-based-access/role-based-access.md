# Before and after RBAC (Role based access control)

**Before (No Role System)**

```javascript
// Everyone who's logged in can delete any post
app.delete("/posts/:id", authenticateToken, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
});
```

**After (Role-Based Access):**

```javascript
// Only admins can delete any post, users can only delete their own
app.delete(
  "/posts/:id",
  authenticateToken, 
  requireRole("admin"), // you are admin, or...
  isPostAuthor(), // You are the post Author
  async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted by admin" });
  }
);
```

## Security Misconfiguration

```js
// WRONG - Exposing detailed errors in production
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Sending full error stack to client - DANGEROUS
  res.status(500).json({
    error: err.message,
    stack: err.stack, // Exposes internal structure
    details: err,
  });
});

// WRONG - Permissive CORS
app.use(
  cors({
    origin: "*", // Allows any origin
    credentials: true,
  })
);
```
