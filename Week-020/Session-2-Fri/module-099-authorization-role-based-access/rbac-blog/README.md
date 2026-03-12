# RBAC Blog API

A blog API demonstrating Role-Based Access Control (RBAC) and resource ownership protection using JWT authentication.

## Quick Start

```bash
npm install
npm start
```

Server runs on `http://localhost:4200`

## Understanding the Three Roles

The API has three roles with different permission levels:

**User (Basic)**
- Create posts
- Edit and delete ONLY their own posts
- Cannot modify other users' content

**Moderator (Middle)**
- Everything a user can do
- Edit ANY post for content moderation
- Flag posts for review
- Cannot delete posts

**Admin (Full Access)**
- Everything a moderator can do
- Delete ANY post
- Manage all users and view system statistics

## Testing with Postman Collection

The Postman collection provides a complete automated test suite for all RBAC features.

### Import the Collection

1. Open Postman (download from [postman.com](https://www.postman.com/downloads/))
2. Click **Import** button (top left)
3. Select `RBAC-Blog-API.postman_collection.json`
4. Click **Import**

### Configure the Base URL (if needed)

The collection is pre-configured for `http://localhost:4200`. If your server runs on a different port:

1. Click on **RBAC Blog API** collection
2. Go to **Variables** tab
3. Change `baseUrl` value to your port (e.g., `http://localhost:3001`)
4. Click **Save**

### Run the Tests

**Option 1: Run Complete Test Suite**
1. Right-click on **RBAC Blog API** collection
2. Click **Run collection**
3. Click **Run RBAC Blog API** button
4. View results (15+ automated tests)

**Option 2: Run Requests Manually**

The collection has 4 folders:
1. **Authentication** - Register users (admin, moderator, alice, bob)
2. **Post Management** - Create posts and test editing permissions
3. **Admin Operations** - Test admin-only endpoints
4. **Ownership Test Scenarios** - Verify ownership protection and role overrides

Run requests in order. Tokens are automatically saved and used in subsequent requests.

### Viewing Test Results

Each request includes automated tests verifying status codes, error messages, and data structure. Click on any request and view the **Tests** tab to see the test code.

To view saved tokens and IDs: Click collection → **Variables** tab → see `adminToken`, `moderatorToken`, `aliceToken`, etc.

## How It Works

### Middleware Chain

Routes use multiple middleware functions:

```javascript
router.put('/posts/:postId',
  authenticateToken,              // Verify JWT token
  checkPostOwnership(['moderator', 'admin']),  // Check ownership OR role
  postController.updatePost       // Execute if authorized
);
```

### Key Concepts

**Authentication** - Verifies JWT token and extracts user info

**Authorization** - Checks if user has required role for the endpoint

**Ownership Protection** - Users can only modify their own resources unless they have an override role (moderator or admin)

### Permission Examples

| Action | User (Own Post) | User (Other Post) | Moderator | Admin |
|--------|----------------|-------------------|-----------|-------|
| Create Post | Yes | N/A | Yes | Yes |
| Edit Own Post | Yes | No | Yes | Yes |
| Edit Any Post | No | No | Yes | Yes |
| Delete Post | No | No | No | Yes |
| View Users | No | No | No | Yes |
| Change Roles | No | No | No | Yes |

## Project Structure

```
rbac-blog-fixed/
├── server.js                           # Express app
├── routes/index.js                     # All routes with middleware
├── controllers/                        # Business logic
│   ├── authController.js               # Register/login
│   ├── postController.js               # Post CRUD
│   └── adminController.js              # Admin operations
├── middleware/                         # Security middleware
│   ├── auth.js                         # JWT authentication
│   ├── rbac.js                         # Role authorization
│   └── ownership.js                    # Ownership checks
├── models/                             # Data models
│   ├── User.js
│   └── Post.js
└── RBAC-Blog-API.postman_collection.json
```

## Next Steps

1. Run the Postman collection to see RBAC in action
2. Experiment by modifying request data
3. Add new roles or permissions
4. Implement additional features like comments with ownership protection
