# Curated Lists Site - Assessment Rubric

## Project Overview

This rubric evaluates the Curated Lists Site project based on full-stack authentication, protected routes, role-based access control, error handling, and loading states.

---

## **Must Have (Required for Passing):**

### **Authentication System Integration**

- [ ] **User Registration** - Implements registration with name, email, password validation
- [ ] **User Login** - Authenticates users with email/password and returns JWT token
- [ ] **Password Security** - Hashes passwords with bcrypt before storage
- [ ] **Token Management** - Generates JWT tokens on auth, stores in localStorage
- [ ] **Session Persistence** - Checks for existing token on app load, restores user session
- [ ] **Logout Functionality** - Clears token from localStorage and resets auth state

### **Backend API Implementation**

- [ ] **Auth Endpoints** - POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- [ ] **Public Endpoints** - GET /api/lists returns all website lists
- [ ] **Protected Endpoints** - Admin routes validate JWT token and user role
- [ ] **Error Responses** - Returns appropriate HTTP status codes (400, 401, 403, 404, 500)
- [ ] **Input Validation** - Validates required fields, email format, password requirements

### **React Authentication Context**

- [ ] **Context Setup** - Creates AuthContext with user state, loading, and auth functions
- [ ] **Provider Component** - Wraps app with AuthProvider to share auth state globally
- [ ] **Custom Hook** - Implements useAuth() hook for easy context access
- [ ] **State Management** - Manages user object, loading states, isAuthenticated flag
- [ ] **Token Restoration** - useEffect checks localStorage on mount, verifies token with backend

### **Protected Routes and Authorization**

- [ ] **ProtectedRoute Component** - Checks authentication before rendering protected pages
- [ ] **Login Redirect** - Redirects unauthenticated users to /login page
- [ ] **Role-Based Access** - Validates user role for admin-only routes
- [ ] **Unauthorized Page** - Shows access denied page when user lacks required role
- [ ] **Conditional Navigation** - Displays different nav links based on auth status and role

### **Error Handling and Loading States**

- [ ] **Three-State Pattern** - Uses loading, error, and success states for all async operations
- [ ] **Loading Indicators** - Shows spinners during API calls, disables buttons during submission
- [ ] **Error Messages** - Displays user-friendly error messages with specific feedback
- [ ] **Form Validation Feedback** - Shows inline errors for invalid inputs
- [ ] **Retry Logic** - Provides retry buttons for failed requests

### **Core Application Features**

- [ ] **Public Homepage** - Displays welcome message and featured lists
- [ ] **User Dashboard** - Shows all website lists after authentication
- [ ] **Admin Panel** - Allows admins to create, edit, and delete website lists
- [ ] **List Display** - Renders website lists with title, description, category, and websites
- [ ] **Responsive Design** - Works on mobile and desktop screen sizes

---

## **Could Have (Bonus Features):**

- [ ] **Edit Lists** - PUT /api/admin/lists/:id endpoint with authorization, pre-filled forms, and validation
- [ ] **Create Admin Users** - POST /api/admin/users endpoint to create new admins with role validation
- [ ] **Dynamic Categories** - GET/POST/DELETE /api/categories endpoints with dynamic dropdown population
- [ ] **MongoDB Integration** - Replace in-memory arrays with MongoDB using Mongoose schemas
- [ ] **User Schema** - Mongoose model with validators for name, email, password, role fields
- [ ] **List Schema** - Mongoose model with validators for title, description, category, websites
- [ ] **Category Schema** - Mongoose model for managing category types with duplicate prevention

---

## **Code Quality Standards:**

### **Code Organization**

- [ ] **Clear Variable Names** - Uses descriptive names (userEmail, listTitle, not x, y)
- [ ] **Focused Functions** - Each function has single, clear purpose
- [ ] **Logical Structure** - Components organized in folders (components/, pages/, context/, api/)
- [ ] **Conversational Comments** - Explains "why" not just "what" in complex logic

### **Best Practices**

- [ ] **Async Error Handling** - try/catch blocks around all async operations
- [ ] **Data-First Approach** - Updates state before rendering UI
- [ ] **Security Measures** - Passwords hashed, JWT secret in .env, role validation on backend
- [ ] **Axios Interceptors** - Request interceptor adds token, response interceptor handles 401s

---

## **Submission Requirements**

**Due Date:** Week 24 end of at the latest
**Submission Method:** GitHub repository link on projects channel
