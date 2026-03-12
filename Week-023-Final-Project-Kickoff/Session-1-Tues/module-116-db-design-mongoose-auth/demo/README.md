# Advanced Database Design, Mongoose, and Authentication Demo

This demo demonstrates advanced Mongoose schema design, JWT authentication, role-based access control (RBAC), and security best practices for building secure full-stack applications.

## Features Demonstrated

### Database Design
- Complex Mongoose schemas with validation and middleware
- Schema relationships (User, Post, Comment)
- Indexes for query optimization
- Virtual properties for computed fields
- Instance methods and static methods
- Pre-save middleware for password hashing
- Aggregation pipelines for complex queries

### Authentication & Security
- JWT token generation and validation
- Bcrypt password hashing with salt rounds
- Authentication middleware for protected routes
- Token refresh strategy for long-lived sessions
- Secure environment variable management
- Security headers with Helmet
- Rate limiting to prevent abuse

### Authorization
- Role-based access control (Admin, Moderator, User)
- Resource ownership verification
- Permission middleware for different access levels
- Protected routes with authorization checks

### Input Validation
- Joi schemas for request validation
- Express-validator for route-level validation
- Input sanitization to prevent attacks
- Custom validation error handling

## Project Structure

```
demo/
├── README.md
└── server/
    ├── package.json
    ├── .env.example
    ├── server.js
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── User.js
    │   ├── Post.js
    │   └── Comment.js
    ├── middleware/
    │   ├── auth.js
    │   ├── authorize.js
    │   └── validate.js
    ├── routes/
    │   ├── auth.js
    │   ├── users.js
    │   └── posts.js
    └── utils/
        ├── generateToken.js
        └── validators.js
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher) running locally or MongoDB Atlas account

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables file:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-demo
JWT_SECRET=your-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-change-this
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux with systemd
sudo systemctl start mongod

# Windows
net start MongoDB
```

6. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes (Public)

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

Response includes:
- `token` - Access token (expires in 15 minutes)
- `refreshToken` - Refresh token (expires in 7 days)
- `user` - User object without password

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token-here"
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer your-access-token
```

#### Logout (Protected)
```http
POST /api/auth/logout
Authorization: Bearer your-access-token
```

### User Routes (Admin Only)

#### Get All Users
```http
GET /api/users
Authorization: Bearer admin-access-token
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer admin-access-token
```

#### Update User Role
```http
PUT /api/users/:id/role
Authorization: Bearer admin-access-token
Content-Type: application/json

{
  "role": "moderator"
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer admin-access-token
```

### Post Routes

#### Get All Posts (Public)
```http
GET /api/posts
```

#### Get Single Post (Public)
```http
GET /api/posts/:id
```

#### Create Post (Protected - User, Moderator, Admin)
```http
POST /api/posts
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post.",
  "tags": ["javascript", "mongodb"]
}
```

#### Update Post (Protected - Owner, Moderator, Admin)
```http
PUT /api/posts/:id
Authorization: Bearer your-access-token
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete Post (Protected - Owner, Moderator, Admin)
```http
DELETE /api/posts/:id
Authorization: Bearer your-access-token
```

#### Get User's Posts (Protected)
```http
GET /api/posts/user/me
Authorization: Bearer your-access-token
```

## Testing the Demo

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

Save the `token` from the response.

### 3. Access Protected Route
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Create a Post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Test Post",
    "content": "This is a test post.",
    "tags": ["test", "demo"]
  }'
```

### 5. Try Admin Route (Should Fail)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

This will fail because new users have "user" role, not "admin".

## Role Hierarchy

- **User** - Can create and manage their own posts
- **Moderator** - Can manage all posts, but not user accounts
- **Admin** - Full access to all resources

## Security Features

### Password Security
- Passwords hashed with bcrypt (10 salt rounds)
- Never stored or transmitted in plain text
- Password validation (minimum length, complexity)

### JWT Security
- Short-lived access tokens (15 minutes)
- Long-lived refresh tokens (7 days)
- Tokens signed with secret keys
- Token verification on protected routes

### API Security
- Helmet for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- Environment variable protection

### Database Security
- Connection pooling for efficiency
- Indexed fields for performance
- Validation at schema level
- Sanitized user input

## Common Problems and Solutions

### Problem: Connection Refused Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**What this means:** MongoDB server is not running

**How to fix:**
1. Check if MongoDB is running: `brew services list` (macOS)
2. Start MongoDB: `brew services start mongodb-community`
3. Verify port is 27017 in connection string

### Problem: JWT Secret Not Set
```
Error: JWT secret is not defined
```

**What this means:** Environment variable JWT_SECRET is missing

**How to fix:**
1. Create `.env` file from `.env.example`
2. Set a strong JWT_SECRET value
3. Restart the server

### Problem: Validation Error
```
Error: User validation failed: email: Email is required
```

**What this means:** Required field is missing from request

**How to fix:**
1. Check the API documentation for required fields
2. Ensure all required fields are included in request body
3. Verify field names match exactly (case-sensitive)

### Problem: Unauthorized Access
```
Error: Not authorized to access this route
```

**What this means:** Token is missing, invalid, or expired

**How to fix:**
1. Ensure token is included in Authorization header
2. Use format: `Authorization: Bearer YOUR_TOKEN`
3. Check if token has expired (login again)
4. Verify token was copied completely

### Problem: Forbidden - Insufficient Permissions
```
Error: User role 'user' is not authorized
```

**What this means:** User doesn't have required role for this action

**How to fix:**
1. Check which role is required for the endpoint
2. Admin routes require 'admin' role
3. Contact an admin to change your role
4. Use endpoints appropriate for your role level

## Learning Objectives Covered

1. **Complex Schema Design** - User, Post, and Comment models with relationships
2. **Schema Validation** - Built-in and custom validators with meaningful error messages
3. **Indexes** - Optimized queries with indexes on frequently queried fields
4. **Virtual Properties** - Computed fields like fullName that don't store in database
5. **Middleware** - Pre-save hooks for password hashing
6. **Instance Methods** - Methods on document instances (matchPassword, generateAuthToken)
7. **Static Methods** - Methods on model itself (User.findByCredentials)
8. **Password Hashing** - Bcrypt for secure password storage
9. **JWT Authentication** - Token-based authentication with access and refresh tokens
10. **Authorization** - Role-based access control with permission checks
11. **Input Validation** - Joi and Express-validator for request validation
12. **Security Best Practices** - Helmet, rate limiting, environment variables
13. **Connection Pooling** - Efficient database connections
14. **Aggregation Pipelines** - Complex queries for analytics and reporting

## Next Steps

To extend this demo:
1. Add comment functionality with nested relationships
2. Implement password reset via email
3. Add OAuth2 integration (Google, GitHub)
4. Implement refresh token rotation
5. Add API documentation with Swagger
6. Set up logging with Winston or Morgan
7. Add unit and integration tests
8. Implement caching with Redis
9. Add file upload for user avatars
10. Create audit logs for admin actions

## Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)
