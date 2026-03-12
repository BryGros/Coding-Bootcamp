# Curated Lists Site - Full Stack Authentication Project

A full-stack web application where users discover and share curated lists of websites. Features include JWT authentication, protected dashboards, and role-based admin panel for managing website lists.

## Project Structure

```
curated-lists-site/
├── completed-version/     # Complete working solution (reference only)
│   ├── server/            # Express backend complete
│   └── client/            # React frontend complete
├── PLAN.md                # Development guide with setup instructions
├── PLAN-TEAM.md           # Team collaboration strategies
└── curated-lists-site-rubric-individual.md  # Assessment rubric
```

**Note:** This project does NOT include starter files. Students should create their own project structure from scratch using the instructions in [PLAN.md](PLAN.md). The completed version is provided as a reference for comparison only.

## Quick Start

**IMPORTANT:** Before following these quick start instructions, you must first create your project structure. See [PLAN.md](PLAN.md#project-setup-create-folder-structure) for detailed setup instructions.

These instructions assume you're testing the completed version or have already built your project following PLAN.md.

### Backend Setup

1. Navigate to server directory
```bash
cd completed-version/server
# OR if you built your own
cd your-project-folder/server
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
# The default JWT_SECRET works for development/testing
# Only change it for production deployment to a secure random string
```

4. Start server
```bash
npm start
# OR for development with auto-restart
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

### Frontend Setup (New Terminal)

1. Navigate to client directory
```bash
cd completed-version/client
# OR if you built your own
cd your-project-folder/client
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

Frontend runs on [http://localhost:5173](http://localhost:5173)

**Note:** If port 5173 is in use, Vite will automatically use the next available port (5174, 5175, etc.). Check the console output for the actual URL.

## Understanding the Proxy Setup

The frontend uses a **proxy configuration** in `vite.config.js` to communicate with the backend:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true
  }
}
```

**What this means:**
- Frontend code can use relative paths like `/api/auth/login` instead of `http://localhost:3001/api/auth/login`
- Vite dev server forwards all `/api/*` requests to the backend
- Prevents CORS issues during development
- In production, you'd configure your hosting platform to handle this routing

**Important:** If you change the backend port, update the `target` in `vite.config.js` to match.

## Test Credentials

**Admin Account:**
- Email: admin@example.com
- Password: admin123

## Features

### Authentication System
- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Token-based session persistence
- Automatic token refresh on page reload
- Logout functionality

### Protected Routes
- Dashboard accessible only to authenticated users
- Admin panel restricted to admin role
- Automatic redirect to login for unauthenticated users
- Unauthorized page for insufficient permissions

### Admin Panel (Admin Only)
- Create new website lists
- Add multiple websites to each list
- Delete existing lists
- Manage list categories

### User Dashboard (All Users)
- View all curated website lists
- Browse websites in each list
- See list details (category, creator, description)

## API Endpoints

### Authentication Endpoints

**POST /api/auth/register**
- Create new user account
- Body: `{ name, email, password }`
- Returns: `{ token, user }`

**POST /api/auth/login**
- Authenticate user
- Body: `{ email, password }`
- Returns: `{ token, user }`

**GET /api/auth/me**
- Verify token and return user data
- Headers: `Authorization: Bearer {token}`
- Returns: `{ user }`

### Public Endpoints

**GET /api/lists**
- Get all website lists
- No authentication required
- Returns: `{ lists: [] }`

### Admin Endpoints (Require Admin Role)

**POST /api/admin/lists**
- Create new list
- Headers: `Authorization: Bearer {token}`
- Body: `{ title, description, category, websites }`
- Returns: `{ list }`

**PUT /api/admin/lists/:id**
- Update existing list
- Headers: `Authorization: Bearer {token}`
- Body: `{ title, description, category, websites }`
- Returns: `{ list }`

**DELETE /api/admin/lists/:id**
- Delete list
- Headers: `Authorization: Bearer {token}`
- Returns: `{ message }`

## Testing the Application

### Method 1: Interactive Testing

1. **Register new account**
   - Go to [http://localhost:5173/register](http://localhost:5173/register)
   - Fill in name, email, password
   - Submit form
   - Should redirect to dashboard

2. **Test authentication persistence**
   - Refresh the page
   - Should stay logged in (token persists in localStorage)

3. **Visit dashboard**
   - Should see list of websites
   - Can view all list details

4. **Try accessing admin panel as regular user**
   - Go to [http://localhost:5173/admin](http://localhost:5173/admin)
   - Should redirect to unauthorized page

5. **Login as admin**
   - Logout first
   - Login with admin@example.com / admin123
   - Visit admin panel
   - Should have access

6. **Create new list (admin only)**
   - Fill in list title and description
   - Add websites one by one
   - Submit form
   - Should see success message and new list appears

7. **Delete list (admin only)**
   - Click delete button on any list
   - Confirm deletion
   - List should be removed

8. **Test logout**
   - Click logout button
   - Should redirect to home page
   - Token should be removed from localStorage

### Method 2: Backend Testing with curl

**Note**: These examples show how to test endpoints with proper token handling. You'll need `jq` installed to extract JSON values, or manually copy tokens from responses.

```bash
# 1. Register new user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}' \
  -s | python3 -m json.tool

# 2. Login as admin and save token
# Method A: Using jq (if installed)
TOKEN=$(curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  -s | jq -r '.token')

# Method B: Manual (copy token from output)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' \
  -s | python3 -m json.tool
# Copy the "token" value from the response

# 3. Verify token (replace with your actual token if not using METHOD A)
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer $TOKEN" \
  -s | python3 -m json.tool

# 4. Get all lists (public - no token required)
curl http://localhost:3001/api/lists -s | python3 -m json.tool

# 5. Create list (admin only - requires token)
curl -X POST http://localhost:3001/api/admin/lists \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test List","description":"Test description","category":"Development","websites":[{"name":"GitHub","url":"https://github.com","description":"Code hosting"}]}' \
  -s | python3 -m json.tool

# 6. Delete list (admin only - requires token)
curl -X DELETE http://localhost:3001/api/admin/lists/3 \
  -H "Authorization: Bearer $TOKEN" \
  -s | python3 -m json.tool
```

**Expected Responses:**

Success (Register/Login):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "name": "Admin User", "email": "admin@example.com", "role": "admin" }
}
```

Error (Invalid credentials):
```json
{
  "message": "Invalid email or password"
}
```

### Method 3: Chrome DevTools Console

Open DevTools (F12) and test:

```javascript
// Check if token is stored
console.log(localStorage.getItem('token'));

// Manually decode JWT token (DO NOT use in production - for learning only)
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);

// Check React DevTools for AuthContext values
// Navigate to Components tab, find AuthProvider, inspect state
```

## Key Technical Concepts

### JWT Authentication Flow
1. User submits login credentials
2. Server verifies credentials and generates JWT token
3. Token is sent to client and stored in localStorage
4. Client includes token in Authorization header for all requests
5. Server verifies token on protected routes

### React Context API
- AuthContext stores user state globally
- AuthProvider wraps entire app
- useAuth hook provides access to user and auth functions
- Loading state prevents flash of unauthenticated content

### Protected Routes
- ProtectedRoute component checks authentication before rendering
- Redirects to /login if not authenticated
- Checks role for admin routes
- Shows loading spinner while checking auth status

### Axios Interceptors
- Request interceptor automatically adds token to headers
- Response interceptor handles 401 errors globally
- Automatic logout and redirect on token expiration

## Common Issues and Solutions

### Cannot Login as Admin
**Problem:** Getting "Invalid email or password" when trying to login with admin@example.com / admin123

**Solution:** This should work with the completed version. If you're getting this error:
1. Check the server console for any errors
2. Verify the server is running on port 3001
3. Try registering a new user first to confirm the backend is working
4. If you built your own version, ensure the admin user's password hash is correct

**For Developers:** The admin user's password hash must match "admin123". Use bcrypt.hash('admin123', 10) to generate the correct hash, or copy from the completed version: `$2a$10$flukbxRFd5CBTY4neUpNvuUaUL1AFTawkjzrudI2XybKz.X9zW7.S`

### Port Already in Use
**Problem:** Error "EADDRINUSE: address already in use :::3001" when starting backend

**Solution:**
```bash
# Find and kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Or use a different port by editing .env:
PORT=3002
```

### Frontend Running on Different Port
**Problem:** Vite starts on port 5185 instead of 5173

**Solution:** This is normal when port 5173 is in use. Vite automatically finds an available port. The app will work fine on any port. If you need a specific port:
```bash
# Kill processes using ports 5173-5185
lsof -ti:5173 | xargs kill -9
```

### Token not persisting after refresh
**Problem:** User gets logged out on page refresh

**Solution:** Check that checkAuth runs in AuthContext useEffect on mount

### CORS errors
**Problem:** Browser blocks API requests with CORS policy errors

**Solution:** Ensure cors() middleware is added to Express server. The completed version already includes this. If you see CORS errors, check:
1. Backend has `app.use(cors())` before route definitions
2. Frontend is using the proxy in vite.config.js (should use `/api/` paths)
3. Both servers are running (backend on 3001, frontend on 5173+)

### 401 on protected routes
**Problem:** Protected routes return unauthorized even when logged in

**Solution:** Verify Authorization header includes "Bearer " prefix before token. Check browser DevTools Network tab to see the actual header being sent.

### Admin routes accessible to regular users
**Problem:** Regular users can access admin panel

**Solution:** Backend must validate user role, not just frontend. Always implement role checks on the server.

### Token expired errors
**Problem:** Token expires after some time

**Solution:** Token expires in 7 days by default. For production, implement refresh tokens.

## Development Notes

### State Management
Backend uses in-memory arrays (users, lists). **Data resets when server restarts.** This is intentional for learning purposes - you can test without database setup. For production, use a database like MongoDB.

### JWT Secret Configuration
The `JWT_SECRET` in `.env` is used to sign and verify JWT tokens.

**For Development/Testing:** The default value `your-secret-key-change-this-in-production` works fine. You don't need to change it.

**For Production:** MUST use a strong random string (at least 32 characters). Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Why it matters:** Anyone with the secret can create valid tokens. In production, keep it secret and never commit it to git.

### Password Security
Passwords are hashed with bcrypt (10 salt rounds) before storage. Never store plain text passwords. The admin user's pre-hashed password demonstrates this pattern.

### Role-Based Access Control
Role validation must happen on backend. Frontend role checks are for UX only, not security. Always verify roles on the server before allowing access to protected resources.

### Error Handling
Three-state pattern (loading, error, success) used for all async operations. Errors display user-friendly messages. Check browser console for detailed error logs during development.

## Files Reference

### Backend Key Files
- [server/server.js](completed-version/server/server.js) - Express server with all endpoints
- [server/package.json](completed-version/server/package.json) - Dependencies and scripts

### Frontend Key Files
- [client/src/context/AuthContext.jsx](completed-version/client/src/context/AuthContext.jsx) - Global auth state
- [client/src/api/axios.js](completed-version/client/src/api/axios.js) - Axios instance with interceptors
- [client/src/components/ProtectedRoute.jsx](completed-version/client/src/components/ProtectedRoute.jsx) - Route protection
- [client/src/pages/Login.jsx](completed-version/client/src/pages/Login.jsx) - Login form
- [client/src/pages/Register.jsx](completed-version/client/src/pages/Register.jsx) - Registration form
- [client/src/pages/Dashboard.jsx](completed-version/client/src/pages/Dashboard.jsx) - User dashboard
- [client/src/pages/AdminPanel.jsx](completed-version/client/src/pages/AdminPanel.jsx) - Admin interface

## Additional Resources

- [PLAN.md](PLAN.md) - Detailed development guide with phases
- [curated-lists-site-rubric-individual.md](curated-lists-site-rubric-individual.md) - Assessment criteria
