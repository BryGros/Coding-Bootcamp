# Curated Lists Site - Development Plan

## Project Overview

Build a full-stack web application where users discover and share curated lists of websites. Features include user authentication, protected dashboards, and role-based admin panel for managing website lists.

## Project Setup: Create Folder Structure

**IMPORTANT:** Before coding, set up your project structure. This prevents merge conflicts if working in a team.

### Step 1: Create Project Directory

```bash
mkdir curated-lists-site
cd curated-lists-site
```

### Step 2: Create Server Structure

```bash
mkdir server
cd server
npm init -y
npm install express cors bcryptjs jsonwebtoken dotenv
touch server.js .env
```

**Create .env file:**
```
PORT=3001
JWT_SECRET=your-super-secret-key-change-this
```

### Step 3: Create Client Structure

```bash
cd ..
npm create vite@latest client -- --template react
cd client
npm install axios react-router-dom
```

**Create folder structure:**
```bash
cd src
mkdir components pages context api
touch components/Navigation.jsx
touch components/ProtectedRoute.jsx
touch components/LoadingSpinner.jsx
touch components/ErrorMessage.jsx
touch pages/Home.jsx
touch pages/Login.jsx
touch pages/Register.jsx
touch pages/Dashboard.jsx
touch pages/AdminPanel.jsx
touch pages/Unauthorized.jsx
touch context/AuthContext.jsx
touch api/axios.js
cd ../..
```

### Final Project Structure

```
curated-lists-site/
├── server/
│   ├── node_modules/
│   ├── server.js
│   ├── .env
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Essential State Variables

**IMPORTANT:** Your app needs to track state between user interactions. Create these core structures:

**Backend State:**
- `users`: Array to store user objects
- `lists`: Array to store website list objects

**Frontend State (AuthContext):**
- `user`: Current user object (null if not logged in)
- `loading`: Boolean for async operations
- `isAuthenticated`: Boolean computed from user
- `isAdmin`: Boolean computed from user.role

**User Object Structure:**
```javascript
{
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  password: "$2a$10$hashedPassword",  // Hashed with bcrypt
  role: "admin",  // or "user"
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

**Website List Object Structure:**
```javascript
{
  id: 1,
  title: "Best Developer Tools",
  description: "Essential tools every developer should know",
  category: "Development",
  websites: [
    {
      name: "GitHub",
      url: "https://github.com",
      description: "Code hosting platform"
    }
  ],
  createdBy: "admin",
  createdAt: "2024-01-15T10:30:00.000Z"
}
```

## Core Functionality Requirements

### 1. Backend API Endpoints
- POST /api/auth/register - Create new user with hashed password
- POST /api/auth/login - Authenticate user, return JWT token
- GET /api/auth/me - Verify token, return user data
- GET /api/lists - Return all website lists (public)
- POST /api/admin/lists - Create list (admin only, validate JWT and role)
- PUT /api/admin/lists/:id - Update list (admin only)
- DELETE /api/admin/lists/:id - Delete list (admin only)

### 2. Frontend Authentication Context
- Create AuthContext with user state and auth functions
- Wrap app with AuthProvider to share state globally
- Implement useAuth() custom hook for easy access
- Check localStorage for token on app initialization
- Restore user session by calling GET /api/auth/me

### 3. Protected Routes
- Create ProtectedRoute component that checks authentication
- Redirect to /login if user not authenticated
- Check user role for admin routes, redirect to /unauthorized if lacking permission
- Show loading spinner while checking auth status

### 4. User Interface Pages
- **Home** (public): Welcome page with featured lists
- **Login**: Email/password form with validation
- **Register**: Name/email/password/confirm form with validation
- **Dashboard** (protected): Display all website lists
- **AdminPanel** (admin only): Create, edit, delete website lists
- **Unauthorized**: Access denied message for insufficient permissions

### 5. Error Handling & Loading States
- Use three-state pattern (loading, error, success) for all async operations
- Show loading spinners during API calls
- Display user-friendly error messages
- Disable form inputs and buttons during submission
- Clear errors when user corrects input

## Development Strategy

### Phase 1: Backend Foundation
1. Create Express server with middleware (express.json, cors)
2. Set up user and lists arrays with sample data
3. Implement POST /api/auth/register with bcrypt password hashing
4. Implement POST /api/auth/login with JWT token generation
5. Implement GET /api/auth/me with JWT verification
6. Test auth endpoints with curl or Postman

### Phase 2: Frontend Auth Setup
1. Create React app with Vite
2. Set up Axios instance with baseURL and interceptors
3. Create AuthContext with user state and auth functions
4. Implement login, register, logout functions
5. Add useEffect to check for existing token on mount
6. Test context by logging user state changes

### Phase 3: Authentication UI
1. Set up React Router with routes
2. Create Login page with form and validation
3. Create Register page with password confirmation
4. Create ProtectedRoute component with redirect logic
5. Create Navigation with conditional links based on auth
6. Test login flow and session persistence

### Phase 4: Core Features & Polish
1. Implement GET /api/lists endpoint
2. Create Dashboard page that fetches and displays lists
3. Implement admin endpoints with role validation
4. Create AdminPanel page with CRUD operations
5. Add loading states and error handling throughout
6. Test all scenarios (guest, user, admin access)

## Key React & Express Methods You'll Use

**React Hooks:**
- `useState()` - Component state
- `useEffect()` - Side effects and data fetching
- `useContext()` - Access AuthContext
- `useNavigate()` - Programmatic navigation

**React Router:**
- `<BrowserRouter>` - Enable routing
- `<Routes>` and `<Route>` - Define routes
- `<Navigate>` - Redirect to different route

**Axios:**
- `axios.create()` - Create configured instance
- `api.get/post/put/delete()` - HTTP requests
- `api.interceptors.request.use()` - Add token to requests
- `api.interceptors.response.use()` - Handle 401 errors

**Express:**
- `app.use()` - Add middleware
- `app.get/post/put/delete()` - Define route handlers
- `req.body` - Access request body
- `res.json()` - Send JSON response
- `res.status()` - Set HTTP status code

**Security:**
- `bcrypt.hash()` - Hash passwords
- `bcrypt.compare()` - Verify passwords
- `jwt.sign()` - Create JWT token
- `jwt.verify()` - Verify JWT token

## Testing Your Functions

### Method 1: Chrome Developer Tools Console

Open DevTools (F12) and test functionality:

```javascript
// Check auth state
console.log(localStorage.getItem('token'));

// Monitor API calls
// Network tab shows requests with Authorization headers

// Check context state
// React DevTools shows AuthContext values
```

### Method 2: Interactive Testing

Test user scenarios:
- Register new account (check validation)
- Login with correct credentials
- Login with wrong credentials (check error)
- Refresh page (should stay logged in)
- Visit /dashboard without login (should redirect)
- Visit /admin as regular user (should redirect to /unauthorized)
- Logout (should clear token and redirect)

### Method 3: Backend Testing with curl

```bash
# Test registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected endpoint
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Debugging Tips

1. **Token not persisting**: Check localStorage in Application tab, verify token is saved on login
2. **CORS errors**: Ensure cors() middleware is applied in Express server
3. **401 on protected routes**: Verify Authorization header includes "Bearer " + token
4. **User logged out on refresh**: Check useEffect in AuthContext runs on mount
5. **Role-based access not working**: Validate role check happens on backend, not just frontend

## Common Pitfalls to Avoid

1. **Storing plain text passwords**: Always use bcrypt.hash() before saving passwords
2. **Trusting frontend validation**: Backend must validate all inputs (emails, passwords, required fields)
3. **Role validation in frontend only**: Backend must check user role on admin endpoints
4. **Forgetting async/await**: API calls are asynchronous, use try/catch blocks
5. **Missing finally blocks**: Set loading=false in finally to prevent stuck loading states
6. **Not checking loading state first**: ProtectedRoute should check loading before authentication
