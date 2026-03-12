# Team Project Plan - Curated Lists Site

## Strategy 1: Specialized Roles (2-3 People)

Best for teams with clear frontend/backend preferences.

### Frontend Developer
- React components and pages
- Authentication context and hooks
- Protected routes and navigation
- Forms and error handling
- CSS styling and responsiveness

### Backend Developer
- Express server setup
- Authentication endpoints
- Protected routes and middleware
- JWT token generation
- Input validation and error handling

### Full-Stack Developer (if 3 people)
- Integration between frontend and backend
- Testing all endpoints with frontend
- Loading states and error messages
- Admin features and authorization
- Documentation and deployment

---

## Strategy 2: Skeleton-First Approach (Recommended)

Build the skeleton together first to prevent merge conflicts, then work in parallel.

### Phase 0: Skeleton Setup (Everyone Together - 1-2 hours)
1. Create repository and project structure
2. Backend: Create empty route files (authRoutes.js, listRoutes.js, middleware/auth.js)
3. Frontend: Create empty component files (Login.jsx, Register.jsx, Dashboard.jsx, AdminPanel.jsx)
4. Frontend: Setup folder structure (components/, pages/, context/, api/)
5. Create empty CSS files for each component
6. Setup basic imports and exports (no logic yet)
7. Commit skeleton to main branch

### After Skeleton: Parallel Full-Stack Work
Now everyone can work on different files without conflicts.

**Person 1: Authentication System**
- server/routes/authRoutes.js - register, login, me endpoints
- client/src/context/AuthContext.jsx - authentication state
- client/src/pages/Login.jsx and Register.jsx - forms
- client/src/api/auth.js - axios auth functions

**Person 2: Lists & Admin Features**
- server/routes/listRoutes.js - CRUD endpoints
- client/src/pages/Dashboard.jsx - display lists
- client/src/pages/AdminPanel.jsx - create/delete forms
- client/src/api/lists.js - axios list functions

**Person 3: Integration & Polish (if 3 people)**
- client/src/components/ProtectedRoute.jsx - route guards
- client/src/components/Navigation.jsx - dynamic nav
- All CSS files - styling and responsiveness
- Error handling and loading states
- Testing and documentation

## Development Workflow

### Phase 1: Setup (Day 1)
1. Create GitHub repository, add all team members
2. Initialize project structure: client/ and server/ folders
3. Backend: Install Express, bcrypt, jsonwebtoken, cors, dotenv
4. Frontend: Create React app with React Router
5. Setup .env files for both frontend and backend

### Phase 2: Backend Authentication (Day 1-2)
1. Create user data array with admin user
2. Build POST /api/auth/register endpoint
3. Build POST /api/auth/login endpoint with JWT
4. Build GET /api/auth/me endpoint with auth middleware
5. Test all endpoints with curl or Postman

### Phase 3: Frontend Authentication (Day 2-3)
1. Create AuthContext with login, logout functions
2. Build Login and Register pages with forms
3. Create axios instance with interceptors
4. Implement token storage in localStorage
5. Build ProtectedRoute component

### Phase 4: Core Features (Day 3-4)
1. Backend: Build GET /api/lists and admin CRUD endpoints
2. Frontend: Build Dashboard to display lists
3. Frontend: Build Admin panel with create/delete forms
4. Add role-based access control
5. Test complete flow from login to admin actions

### Phase 5: Polish (Day 4-5)
1. Add loading states and error handling everywhere
2. Improve styling and responsiveness
3. Test all features thoroughly
4. Write README with setup instructions
5. Deploy or present project

## Git Strategy

- main branch: production-ready code only
- dev branch: integration branch for features
- Feature branches: feature/login, feature/admin-panel, etc.
- Pull requests required before merging to dev
- Daily standup: sync progress and blockers
