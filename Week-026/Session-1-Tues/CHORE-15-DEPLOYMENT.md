# Chore 15: Deploy Application to Production
Estimated Time: 45-60 minutes

## Task
Deploy backend and frontend to production hosting services and verify full application functionality

---

## Pre-Deployment Checklist

[ ] All code committed and pushed to GitHub
[ ] `.env` files NOT committed to Git
[ ] `.env.example` files ARE committed to Git
[ ] Application works correctly in local development
[ ] Database seeding script tested (if applicable)
[ ] All tests passing (if applicable)

### Minimum Project Requirements

Before deploying, your application must have:

[ ] **At least one database collection/model** with sample data
[ ] **At least one API endpoint** that reads from that collection
[ ] **At least one frontend component or hook** that displays the data

If you do not have these yet, see the "Minimum Working Setup" section below before proceeding.

---

## Minimum Working Setup

If your project skeleton does not include a complete data flow, use this minimal example to get started.

### Step 1: Create Database Model

Create `server/models/Item.js`:

```javascript
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
```

### Step 2: Create Seed Script

Create `server/seed.js`:

```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const sampleItems = [
  {
    name: 'First Item',
    description: 'This is the first item in our collection'
  },
  {
    name: 'Second Item',
    description: 'This is the second item in our collection'
  },
  {
    name: 'Third Item',
    description: 'This is the third item in our collection'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    await Item.deleteMany({});
    console.log('Cleared existing items');

    await Item.insertMany(sampleItems);
    console.log('Sample items inserted');

    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
```

Add to `server/package.json` scripts:

```json
"scripts": {
  "seed": "node seed.js"
}
```

### Step 3: Create API Endpoint

Add to `server/server.js`:

```javascript
const Item = require('./models/Item');

// Get all items endpoint
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items' });
  }
});
```

### Step 4: Create Frontend Hook

Create `client/src/hooks/useItems.js`:

```javascript
import { useState, useEffect } from 'react';

function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/items`);

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
}

export default useItems;
```

### Step 5: Create Display Component

Update `client/src/App.jsx`:

```javascript
import { useState, useEffect } from 'react';
import useItems from './hooks/useItems';
import './App.css';

function App() {
  const { items, loading, error } = useItems();

  if (loading) {
    return <div className="container">Loading items...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>My Items</h1>
      <div className="items-list">
        {items.map((item) => (
          <div key={item._id} className="item-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <small>Created: {new Date(item.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

Add basic styles to `client/src/App.css`:

```css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.item-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.item-card h2 {
  margin-top: 0;
  color: #333;
}

.item-card p {
  color: #666;
}

.item-card small {
  color: #999;
}
```

### Step 6: Test Locally

[ ] Run seed script: `cd server && npm run seed`
[ ] Start backend: `npm start`
[ ] Start frontend: `cd client && npm run dev`
[ ] Visit http://localhost:5173 and verify items display
[ ] Commit all changes: `git add . && git commit -m "Add minimal working setup"`
[ ] Push to GitHub: `git push origin main`

Now you are ready to proceed with deployment.

---

## For Render Deployment

### Backend Deployment (Web Service)

[ ] Sign up for Render account (https://render.com)
[ ] Connect GitHub account to Render
[ ] Click "New +" > "Web Service"
[ ] Select your repository
[ ] Configure Web Service:
  - Name: `your-app-backend` (or your preferred name)
  - Root Directory: `server` (or your backend folder name)
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: `Free`

[ ] Add environment variables (click "Advanced" or "Environment"):
  - `DATABASE_URL` = Your production database connection string
  - `JWT_SECRET` = Your JWT secret (same as local or generate new for production)
  - `PORT` = `3001` (or your preferred port)
  - Add any other environment variables from your `.env` file

[ ] Click "Create Web Service"
[ ] Wait for deployment to complete (5-10 minutes)
[ ] Copy your backend URL (e.g., `https://your-app-backend.onrender.com`)

### Test Backend Deployment

[ ] Visit: `https://your-backend.onrender.com/api/test`
[ ] Verify test endpoint returns expected response
[ ] Visit: `https://your-backend.onrender.com/api/[your-main-endpoint]`
[ ] Verify main endpoint works (may need to seed database first)

### Frontend Deployment (Static Site)

[ ] On Render dashboard, click "New +" > "Static Site"
[ ] Select your repository
[ ] Configure Static Site:
  - Name: `your-app-frontend` (or your preferred name)
  - Root Directory: `client` (or your frontend folder name)
  - Build Command: `npm install && npm run build`
  - Publish Directory: `dist` (for Vite) or `build` (for Create React App)

[ ] Add environment variables:
  - `VITE_API_URL` = Your backend URL from above (for Vite projects)
  - `REACT_APP_API_URL` = Your backend URL from above (for CRA projects)
  - Add any other frontend environment variables

[ ] Click "Create Static Site"
[ ] Wait for deployment to complete (5-10 minutes)
[ ] Copy your frontend URL (e.g., `https://your-app-frontend.onrender.com`)

---

## CORS Configuration

[ ] Verify backend has CORS configured for production frontend URL
[ ] Update server.js if needed:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',           // Local development
    'http://localhost:3000',           // Alternative local port
    'https://your-app-frontend.onrender.com',  // Production frontend
    'https://your-app.vercel.app'      // Alternative frontend
  ],
  credentials: true
}));
```
[ ] Commit and push CORS changes
[ ] Backend automatically redeploys (most platforms have auto-deploy enabled)

---

## Post-Deployment Testing

### Backend Verification

[ ] Visit backend URL in browser
[ ] Test all API endpoints using browser or Postman:
  - [ ] GET /api/test
  - [ ] GET /api/[your-resource]
  - [ ] POST /api/[your-resource] (if applicable)
  - [ ] Other endpoints as needed
[ ] Check hosting platform logs for errors
[ ] Verify database connection successful in logs

### Frontend Verification

[ ] Visit frontend URL in browser
[ ] Test all pages and routes
[ ] Open Browser DevTools (F12) > Console tab
[ ] Verify no console errors
[ ] Check Network tab for successful API calls
[ ] Test all user interactions and features
[ ] Verify data loads from production database

### Full Integration Test

[ ] Create new resource via frontend (if applicable)
[ ] Verify it appears in database
[ ] Refresh page and verify data persists
[ ] Test all CRUD operations (Create, Read, Update, Delete)
[ ] Test on different devices/browsers if possible
[ ] Verify responsive design works

---

## Update Repository with Deployment URLs

[ ] Create or update README.md with deployment links:
```markdown
## Live Demo

- Frontend: https://your-app-frontend.onrender.com
- Backend API: https://your-app-backend.onrender.com

## API Documentation

Base URL: https://your-app-backend.onrender.com

### Endpoints
- GET /api/test - Test endpoint
- GET /api/[resource] - Get all items
- POST /api/[resource] - Create new item
```

[ ] Commit and push README updates
[ ] Verify links work in GitHub README

---

## Acceptance Criteria

### Repository
[ ] All code committed and pushed to GitHub
[ ] `.env` files NOT in repository
[ ] `.env.example` files ARE in repository
[ ] README.md updated with live deployment URLs

### Backend Deployment
[ ] Backend deployed successfully to hosting platform
[ ] Backend URL accessible and working
[ ] All environment variables configured correctly
[ ] Database connection working in production
[ ] All API endpoints tested and functional
[ ] Logs show no critical errors

### Frontend Deployment
[ ] Frontend deployed successfully to hosting platform
[ ] Frontend URL accessible and working
[ ] Environment variables configured with production backend URL
[ ] Application loads without console errors
[ ] All pages and routes working
[ ] API calls successfully reaching backend

### Database
[ ] Production database configured and accessible
[ ] Network access allows connections from hosting platform
[ ] Database user has correct permissions
[ ] Data seeded if required
[ ] Data persists correctly

### Integration
[ ] Frontend successfully communicates with backend
[ ] CORS configured correctly
[ ] All features work end-to-end
[ ] No critical errors in browser console
[ ] No critical errors in backend logs
[ ] Application performs as expected

---

## Troubleshooting Common Issues

### Backend deployment fails
- Check logs on hosting platform for specific error
- Verify `package.json` has correct start script
- Verify all environment variables are set
- Check Node.js version compatibility

### Frontend can't connect to backend
- Verify `VITE_API_URL` or `REACT_APP_API_URL` is set correctly
- Ensure URL does NOT have trailing slash
- Check CORS configuration on backend
- Verify backend is actually running and accessible

### Database connection errors
- Verify database URL is correct in environment variables
- Check network access/IP whitelist on database service
- Verify database user credentials are correct
- Check database service is running

### 404 errors on deployed frontend
- For Render: Verify Publish Directory is correct (`dist` or `build`)
- Check build command produced files in correct directory

### Environment variables not working
- Restart/redeploy after adding environment variables
- Verify variable names are exact (case-sensitive)
- For frontend: Must prefix with `VITE_` or `REACT_APP_`
- Check for typos in variable names
