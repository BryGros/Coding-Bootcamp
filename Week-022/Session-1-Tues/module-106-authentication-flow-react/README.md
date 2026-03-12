# Authentication Flow React Demo

A complete authentication system demonstrating JWT-based authentication with React context, protected routes, and persistent login.

## What This Demo Shows

- React Context API for global authentication state
- JWT token storage with localStorage
- Login and registration forms with validation
- Protected routes that redirect unauthenticated users
- Axios interceptors for automatic token attachment
- Session persistence across page refreshes
- Express backend with bcrypt password hashing

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Start the Backend Server

```bash
cd server
npm start
```

Server runs on http://localhost:3001

### 3. Start the Frontend (in a new terminal)

```bash
cd client
npm run dev
```

Frontend runs on http://localhost:5173

### 4. Test the Application

Visit http://localhost:5173 and:

1. **Register a new account** - Click "Register" and create an account
2. **View your dashboard** - After registration, you're automatically logged in
3. **Refresh the page** - Notice you stay logged in (token persistence!)
4. **Logout** - Click the logout button
5. **Login again** - Use your credentials to log back in

## How to Inspect the Demo

### Authentication Flow

**Registration Flow:**
1. User fills out registration form (Register.jsx)
2. Frontend calls register() from AuthContext
3. Request sent to /api/auth/register endpoint
4. Backend hashes password with bcrypt
5. Backend creates user and generates JWT token
6. Token saved to localStorage, user state updated in context
7. User redirected to dashboard

**Login Flow:**
1. User fills out login form (Login.jsx)
2. Frontend calls login() from AuthContext
3. Request sent to /api/auth/login endpoint
4. Backend verifies email and password
5. Backend generates JWT token
6. Token saved to localStorage, user state updated
7. User redirected to dashboard

**Page Refresh Flow:**
1. App loads, AuthProvider runs useEffect
2. Check localStorage for existing token
3. If token exists, send to /api/auth/me endpoint
4. Backend verifies token and returns user data
5. User state restored in context
6. User stays logged in

### Key Files to Inspect

**Backend:**
- server/server.js - Express server with authentication endpoints
- server/.env - Environment variables (JWT secret)

**Frontend:**
- client/src/context/AuthContext.jsx - Global auth state management
- client/src/api/axios.js - Axios instance with interceptors
- client/src/pages/Login.jsx - Login form component
- client/src/pages/Register.jsx - Registration form component
- client/src/pages/Dashboard.jsx - Protected page component
- client/src/components/Navigation.jsx - Nav with conditional rendering

### Testing Token Persistence

1. **Login to the application**
2. **Open DevTools > Application > LocalStorage**
3. You'll see a token key with your JWT
4. **Refresh the page** - you stay logged in
5. **Close the browser and reopen** - you stay logged in
6. **Delete the token manually** - you get logged out

### Testing Axios Interceptors

1. **Login to the application**
2. **Open DevTools > Network tab**
3. **Navigate to Dashboard**
4. **Find the /api/auth/me request**
5. **Check Request Headers** - see Authorization: Bearer token
6. The token was added automatically by the interceptor!

### Testing Protected Routes

1. **Logout if logged in**
2. **Try to visit** http://localhost:5173/dashboard directly
3. **You'll be redirected to /login**
4. This protection happens in Dashboard.jsx

## Architecture Overview

```
Client (React + Vite)
  |
  ├── AuthContext (Global State)
  |     ├── user
  |     ├── login()
  |     ├── register()
  |     └── logout()
  |
  ├── Axios Interceptors
  |     ├── Add token to requests
  |     └── Handle 401 errors
  |
  └── Pages
        ├── Login (Public)
        ├── Register (Public)
        └── Dashboard (Protected)

Server (Express)
  |
  ├── /api/auth/register - Create new user
  ├── /api/auth/login - Authenticate user
  └── /api/auth/me - Verify token
```

## Common Modifications

**Add a profile update feature:**
1. Create /api/auth/profile PUT endpoint in server
2. Add updateProfile() function to AuthContext
3. Create Profile page component with form

**Add password reset:**
1. Create /api/auth/forgot-password endpoint
2. Create /api/auth/reset-password/:token endpoint
3. Create ForgotPassword and ResetPassword page components

**Add role-based access:**
1. Add role field to user object
2. Check role in protected routes
3. Conditionally render UI based on role

## Security Notes

- Passwords are hashed with bcrypt before storage
- JWT tokens expire after 7 days
- Tokens stored in localStorage (vulnerable to XSS)
- For production: use httpOnly cookies instead
- Always use HTTPS in production
- Never commit .env files with real secrets

## Troubleshooting

**CORS error:** Make sure both servers are running and backend has cors() enabled

**Token invalid:** Check JWT_SECRET matches between requests, restart backend after changing .env

**User stays logged out:** Check browser console for errors, verify localStorage has token

**401 on protected routes:** Token may be expired, logout and login again
