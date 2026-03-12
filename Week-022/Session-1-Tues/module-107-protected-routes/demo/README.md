# Protected Components & Role-Based Access Control Demo

A complete demonstration of protected routes and role-based access control (RBAC) in React with JWT authentication.

## What This Demo Shows

- ProtectedRoute component that redirects unauthenticated users
- Role-based access control (admin vs user roles)
- Conditional UI rendering based on authentication and role
- Unauthorized page for insufficient permissions
- Admin panel with user management
- Loading states during authentication checks
- Backend role validation on protected endpoints

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

### 2. Start the Backend

```bash
cd server
npm start
```

Server runs on http://localhost:3001

**Pre-seeded Admin Account:**
- Email: admin@test.com
- Password: admin123

### 3. Start the Frontend (new terminal)

```bash
cd client
npm run dev
```

Frontend runs on http://localhost:5173

### 4. Test the Demo

Visit http://localhost:5173 and:

1. **Test as Guest** - Try accessing /dashboard or /admin directly (you'll be redirected to login)
2. **Register as User** - Create a normal user account (role: user)
3. **Access Protected Pages** - Dashboard and Profile work for any authenticated user
4. **Try Admin Panel** - Regular users get redirected to /unauthorized
5. **Login as Admin** - Use admin@test.com / admin123
6. **Access Admin Panel** - Now you can see and manage all users

## How to Inspect Protected Routes

### ProtectedRoute Component

Key file: client/src/components/ProtectedRoute.jsx

**Three Protection Levels:**

1. **Loading Check** - Shows spinner while verifying authentication
2. **Authentication Check** - Redirects to /login if no user
3. **Role Check** - Redirects to /unauthorized if wrong role

```javascript
// Basic protection (any authenticated user)
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Role-based protection (admin only)
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

### Testing Authentication Protection

1. **Logout** if logged in
2. **Copy this URL:** http://localhost:5173/dashboard
3. **Paste in new incognito window**
4. **Result:** Redirected to /login
5. **Why:** ProtectedRoute detected no user and redirected

### Testing Role-Based Protection

1. **Register** a new user (gets role: user)
2. **Try to access:** http://localhost:5173/admin
3. **Result:** Redirected to /unauthorized
4. **Why:** User doesn't have role="admin"

5. **Logout** and login as admin@test.com
6. **Try to access:** http://localhost:5173/admin
7. **Result:** Admin panel loads successfully
8. **Why:** Admin has correct role

### Testing Backend Protection

Open DevTools > Network tab:

1. **As User** - Try visiting /admin
2. Watch network: Frontend makes GET /api/admin/users
3. **Result:** 403 Forbidden from backend
4. Backend validates role server-side (not just frontend!)

### Conditional UI Rendering

Check Navigation component:

**Admin Link Only Shows for Admins:**
```javascript
{isAdmin && (
  <Link to="/admin" className="admin-link">
    Admin Panel
  </Link>
)}
```

**Test:** Login as user vs admin - see navigation change!

### Admin Panel Features

- Fetches all users from /api/admin/users endpoint
- Shows user table with roles
- Can delete users (except yourself)
- Backend validates admin role on every request

## Architecture

```
Request Flow:

1. User navigates to /admin
   |
2. ProtectedRoute checks authentication
   - If not logged in > redirect to /login
   - If not admin > redirect to /unauthorized
   - If admin > render AdminPanel
   |
3. AdminPanel makes API call to /api/admin/users
   |
4. Axios interceptor adds JWT token
   |
5. Backend verifies token and checks role
   - If not admin > 403 Forbidden
   - If admin > return user list
   |
6. Frontend displays users
```

## Key Files

**Frontend:**
- client/src/components/ProtectedRoute.jsx - Route protection wrapper
- client/src/context/AuthContext.jsx - Auth state with isAdmin helper
- client/src/components/Navigation.jsx - Conditional navigation
- client/src/pages/AdminPanel.jsx - Admin-only page
- client/src/pages/Unauthorized.jsx - Permission denied page

**Backend:**
- server/server.js - Role-based endpoint protection

## Testing Scenarios

**Scenario 1: Guest tries protected page**
1. Open incognito window
2. Visit http://localhost:5173/dashboard
3. Gets redirected to /login

**Scenario 2: User tries admin page**
1. Register new user
2. Try to visit /admin
3. Gets redirected to /unauthorized

**Scenario 3: Admin accesses everything**
1. Login as admin@test.com
2. Can access /dashboard, /profile, and /admin
3. Admin link appears in navigation

**Scenario 4: Refresh protected page**
1. Login and visit /dashboard
2. Refresh the page
3. Still on dashboard (token persistence works!)

## Security Notes

- Frontend protection is for UX only (can be bypassed in browser)
- Backend MUST validate roles on every endpoint
- Never trust role from frontend - always check JWT token
- Admins should not be able to delete themselves
- Use HTTPS in production

## Troubleshooting

**Can't access admin panel as admin:** Check token has role claim, restart backend

**Always redirected to login:** Token may be expired, check localStorage

**Regular user sees admin link:** Verify user.role value in AuthContext

**403 on admin endpoints:** Backend is correctly blocking non-admins (expected!)
