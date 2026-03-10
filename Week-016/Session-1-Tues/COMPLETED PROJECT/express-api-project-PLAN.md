# Blog Post API - Project Planning Guide

## Project Overview

Build a RESTful API for managing blog posts and users using Express.js. This project demonstrates Express routing, middleware, controllers, and MVC architecture.

**No frontend required** - Test your API using Postman

---

## Setup Options

Choose one of the following:

- **Option A: Start from Scratch** - Build everything from the ground up (recommended for full learning)
- **Option B: Use Template** - Copy the project structure and clear out the code for faster setup

---

## Option A: Start from Scratch

```bash
# 1. Create project
mkdir blog-api-project
cd blog-api-project

# 2. Initialize npm
npm init -y

# 3. Install dependencies
npm install express
npm install --save-dev nodemon newman

# 4. Create folder structure
mkdir routes controllers middleware
```

**Configure package.json scripts:**

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "newman run Blog-Post-API.postman_collection.json"
}
```

**Copy test collection (optional):**
Copy `complete-example/Blog-Post-API.postman_collection.json` to your project root.

---

## Option B: Use Template

```bash
# 1. Copy template
mkdir blog-api-project
cp -r complete-example/* blog-api-project/
cd blog-api-project

# 2. Clear out implementation files
# Delete all code from these files (keep the files):
# - app.js
# - controllers/postsController.js
# - controllers/usersController.js
# - routes/posts.js
# - routes/users.js
# - middleware/errorHandler.js

# 3. Install dependencies
npm install
```

---

## Project Structure

Your final project should look like this:

```
blog-api-project/
├── app.js
├── package.json
├── Blog-Post-API.postman_collection.json
├── routes/
│   ├── posts.js
│   └── users.js
├── controllers/
│   ├── postsController.js
│   └── usersController.js
└── middleware/
    └── errorHandler.js
```

---

## Implementation Checklist

**Recommended approach:** Implement one endpoint at a time, starting with the health endpoints, then test it before moving to the next. This helps catch errors early.

### Step 1: Create Main Server (`app.js`)

- [x] Require Express and create app instance
- [x] Set PORT with environment variable (default 3000)
- [x] Add `express.json()` middleware
- [x] Create request logging middleware
- [x] Mount routes: `/api/posts` and `/api/users`
- [x] Add root route (`/`) with API documentation
- [x] Add health check route (`/health`)
- [x] Add 404 handler for unknown routes
- [x] Add error handling middleware (must be last)
- [x] Start server with `app.listen()`

**Test:**

1. Run `npm run dev` and visit `http://localhost:3000/`
2. Test `/health` endpoint in Postman (see [Testing Your API](#testing-your-api) below)
3. Once these work, move to the next step

---

### Step 2: Create Posts Controller (`controllers/postsController.js`)

**Strategy:** Implement one function at a time. Start with `getAllPosts()`, test it, then move to `getPostById()`, and so on.

**Implement these functions:**

- [x] `getAllPosts()` - Return all posts
- [x] `getPostById()` - Find and return specific post
- [x] `createPost()` - Validate and add new post
- [x] `updatePost()` - Find and update existing post
- [x] `deletePost()` - Find and remove post

**Post structure:**

```javascript
{
  id: number,
  title: string,           // required, min 3 chars
  content: string,         // required, min 10 chars
  author: string,          // required
  published: boolean,      // optional, default false
  createdAt: string
}
```

**Tip:** Copy sample data from `sample-data.js` in the module folder.

**Test each function:** After implementing each controller function, test it in Postman before moving to the next.

---

### Step 3: Create Users Controller (`controllers/usersController.js`)

**Strategy:** Follow the same one-at-a-time approach as with Posts Controller.

**Implement these functions:**

- [x] `getAllUsers()` - Return all users
- [x] `getUserById()` - Find and return specific user
- [x] `createUser()` - Validate and add new user
- [x] `updateUser()` - Find and update existing user
- [x] `deleteUser()` - Find and remove user

**User structure:**

```javascript
{
  id: number,
  name: string,            // required, min 2 chars
  email: string,           // required, valid email
  role: string,            // optional: admin|author|reader (default: author)
  createdAt: string
}
```

**Tip:** Copy sample data from `sample-data.js` in the module folder.

**Test each function:** After implementing each controller function, test it in Postman before moving to the next.

---

### Step 4: Create Posts Routes (`routes/posts.js`)

- [x] Create Express router
- [x] Import posts controller functions
- [x] Define routes:
  - `GET /` → getAllPosts
  - `GET /:id` → getPostById
  - `POST /` → createPost
  - `PUT /:id` → updatePost
  - `DELETE /:id` → deletePost
- [x] Export router

---

### Step 5: Create Users Routes (`routes/users.js`)

- [x] Create Express router
- [x] Import users controller functions
- [x] Define routes:
  - `GET /` → getAllUsers
  - `GET /:id` → getUserById
  - `POST /` → createUser
  - `PUT /:id` → updateUser
  - `DELETE /:id` → deleteUser
- [x] Export router

---

### Step 6: Create Error Handler (`middleware/errorHandler.js`)

- [x] Create function with 4 parameters: (err, req, res, next)
- [x] Log error to console
- [x] Return JSON error response
- [x] Use appropriate HTTP status codes

**Error format:**

```javascript
{
  error: "Error message",
  details: "Additional context (optional)"
}
```

---

## Testing Your API

### Using Postman

1. **Import the collection:**

   - Open Postman
   - Click **Import**
   - Select `Blog-Post-API.postman_collection.json`

2. **Start your server:**

   ```bash
   npm run dev
   ```

3. **Test endpoints:**
   - Collection includes all endpoints organized by resource
   - Each request has pre-configured URLs and example data
   - Click **Send** to test individual endpoints

### Automated Testing with Newman

```bash
# Terminal 1: Start server
npm run dev

# Terminal 2: Run tests
npm test
```

The test suite includes 17 tests covering all endpoints, validation, and error handling.

---

## Submission Checklist

- [x] All 10 endpoints work correctly (5 posts + 5 users)
- [x] Proper HTTP status codes (200, 201, 400, 404, 500)
- [x] Input validation implemented
- [x] Error handling implemented
- [x] MVC architecture (separate routes and controllers)
- [x] Code is clean and readable
- [x] Project pushed to GitHub
- [x] GitHub repo link shared in #projects channel
