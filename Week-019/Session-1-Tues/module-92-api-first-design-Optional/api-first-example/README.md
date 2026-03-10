# API-First Design Example with Swagger

A simple example demonstrating API-First design: define your API in swagger.yaml BEFORE writing code, then organize implementation with routes and controllers.

## Project Structure

```
api-first-example/
├── swagger.yaml              # API definition (created FIRST)
├── controllers/
│   └── postController.js     # Business logic
├── routes/
│   └── postRoutes.js        # Route definitions
├── server.js                # Express setup
├── package.json
└── README.md
```

## The API-First Workflow

### 1. Design API First (swagger.yaml)

```yaml
paths:
  /posts:
    get:
      summary: Get all posts
      responses:
        '200':
          description: List of all posts
```

### 2. View in Swagger UI

Visit http://localhost:3000/api-docs to see interactive documentation

### 3. Implement Code

Write routes and controllers to match swagger.yaml

## Setup

### Install Dependencies

```bash
npm install
```

### Start Server

```bash
npm start
```

Visit:
- http://localhost:3000 - API info
- http://localhost:3000/api-docs - Interactive Swagger UI

## API Endpoints

All endpoints are defined in [swagger.yaml](swagger.yaml) first, then implemented in code.

### GET /posts

Get all blog posts

**Response:**
```json
[
  {
    "id": 1,
    "title": "First Post",
    "content": "This is my first post",
    "author": "Alice"
  }
]
```

### POST /posts

Create a new post

**Request:**
```json
{
  "title": "My Post",
  "content": "Post content here",
  "author": "Charlie"
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "title": "My Post",
  "content": "Post content here",
  "author": "Charlie"
}
```

### GET /posts/:id

Get a single post by ID

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "First Post",
  "content": "This is my first post",
  "author": "Alice"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

## Code Organization

### swagger.yaml - API Definition

Defines the API structure BEFORE coding:
- Endpoints (GET /posts, POST /posts, GET /posts/:id)
- Request formats
- Response formats
- Status codes

### routes/postRoutes.js - Route Definitions

Connects HTTP endpoints to controller functions:
```javascript
router.get('/', postController.getAllPosts)
router.post('/', postController.createPost)
router.get('/:id', postController.getPostById)
```

### controllers/postController.js - Business Logic

Contains all the logic for handling requests:
```javascript
function getAllPosts(req, res) {
  res.json(posts)
}

function createPost(req, res) {
  // Validation and creation logic
}
```

### server.js - Express Setup

Minimal setup that loads Swagger and routes:
```javascript
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/posts', postRoutes)
```

## Using Swagger UI

1. Open http://localhost:3000/api-docs
2. Click on an endpoint to expand it
3. Click "Try it out"
4. For POST requests, edit the request body
5. Click "Execute"
6. See the actual response

**Example: Creating a Post**
1. Find "POST /posts"
2. Click "Try it out"
3. Edit request body:
```json
{
  "title": "Test Post",
  "content": "Testing the API",
  "author": "Me"
}
```
4. Click "Execute"
5. See the created post with ID

## Why API-First?

### Traditional Approach (Code-First)
1. Write code
2. Figure out what it does
3. Maybe document it later
4. Docs get out of sync

### API-First Approach
1. Design API in swagger.yaml
2. Review and agree on design
3. View interactive docs in Swagger UI
4. Write code that implements the design
5. Docs always match code

## Benefits Demonstrated

**1. Design Before Code**
- swagger.yaml created first
- Team can review design before implementation
- Catch issues early

**2. Interactive Documentation**
- Swagger UI provides visual docs
- Test endpoints without writing code
- Get code examples automatically

**3. Clear Organization**
- Routes define endpoints
- Controllers contain logic
- Server.js stays minimal
- Easy to find and update code

**4. Always Up-to-Date Docs**
- Documentation written first
- Code implements documentation
- No sync issues

## Learning Exercises

1. **Add a new endpoint:**
   - Add PUT /posts/:id to swagger.yaml
   - Implement in postController.js
   - Add route in postRoutes.js

2. **Add validation:**
   - Require minimum title length in swagger.yaml
   - Implement validation in controller

3. **Add query parameters:**
   - Add ?author=Alice filter to GET /posts
   - Define in swagger.yaml
   - Implement in controller

## Key Takeaways

**API-First Workflow:**
1. Define API in swagger.yaml FIRST
2. View in Swagger UI at /api-docs
3. Implement in controllers
4. Connect via routes
5. Keep server.js simple

**MVC Organization:**
- **swagger.yaml** - API contract
- **routes/** - Endpoint definitions
- **controllers/** - Business logic
- **server.js** - Setup and configuration

This pattern scales to any size API and ensures documentation always matches implementation!
