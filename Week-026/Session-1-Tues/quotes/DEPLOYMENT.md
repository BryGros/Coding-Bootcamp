# Complete Deployment Guide

This guide walks you through deploying the Quotes application to production using GitHub, MongoDB Atlas, and Render.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Repository Setup](#github-repository-setup)
3. [MongoDB Atlas Configuration](#mongodb-atlas-configuration)
4. [Local Testing](#local-testing)
5. [Backend Deployment (Render)](#backend-deployment-render)
6. [MongoDB Network Access](#mongodb-network-access)
7. [Frontend Deployment (Render)](#frontend-deployment-render)
8. [Verification](#verification)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, make sure you have:

- GitHub account
- GitHub Desktop installed
- MongoDB Atlas account (free tier)
- Render.com account (free tier)
- Node.js and npm installed locally

## GitHub Repository Setup

Skip this section if your repository is already on GitHub.

### Step 1: Download and Extract Project

1. Download the `quotes.zip` file
2. Extract the zip file to your main GitHub folder

### Step 2: Create Repository in GitHub Desktop

1. Open GitHub Desktop
2. Click "Add New Repository"
3. Configure the repository:
   - Path: Your root GitHub folder
   - Name: `quotes-demo`
   - Git Ignore: Select "Node"
4. Click "Create Repository"

### Step 3: Publish to GitHub

1. Click the "Publish" button in GitHub Desktop
2. Click "View on GitHub" to confirm the repository is created

## MongoDB Atlas Configuration

### Step 1: Access Connection String

1. Login to [MongoDB Cloud](https://cloud.mongodb.com)
2. Navigate to: Cluster > Cluster0 > Connect > Drivers
3. Copy the connection string from step 3
4. The connection string looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```

### Step 2: Create Database User

1. Go to: Security > Database Access
2. Click "Add New Database User"
3. Select "Password Authentication"
4. Configure the user:
   - Username: `quotes_db_user`
   - Click "Auto Generate Secure Password"
   - Copy the generated password (you will need this)
5. Select Built-in Role: "Read and write to any database"
6. Click "Add User"

### Step 3: Update Server Environment Variables

1. Navigate to the `server` folder
2. Create a `.env` file (copy from `.env.example`)
3. Update the `.env` file with your MongoDB credentials:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://quotes_db_user:<your-password>@<cluster-url>/quotes?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Replace `<your-password>` with the password you copied
5. Replace `<cluster-url>` with your cluster URL
6. Remove all `<>` symbols and their contents

## Local Testing

Test your application locally before deploying to ensure everything works.

### Step 1: Setup Server

1. Open a new terminal in the `server` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed the database:
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. You should see "Connected to MongoDB" in the terminal

### Step 2: Setup Client

1. Open terminal in the `client` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The client will run on http://localhost:5173



### Step 3: Verify Local Connection

1. Keep both terminals running
2. Open http://localhost:5173 in your browser
3. You should see quotes displayed from the database
4. If you encounter authentication or connection issues:
   - Double-check your connection string in `.env`
   - Test the connection using MongoDB Compass first
   - Verify your username and password are correct

## Backend Deployment (Render)

### Step 1: Access Render

1. Visit [render.com](https://render.com)
2. Login to your account

### Step 2: Create Web Service

1. Click "Create a new Service"
2. Select "Web Services"
3. Click "Connect Git Provider" > GitHub
4. Click "Install Render"
5. Select repository access:
   - Choose "All Repos" (easiest option)
   - Or select only the `quotes-demo` repository

### Step 3: Configure Web Service

1. Select the `quotes-demo` repository
2. Configure the service:
   - Name: `quotes-demo-backend` (or your preferred name)
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

### Step 4: Add Environment Variables

Click "Add Environment Variable" and add the following:

1. `MONGODB_URI`
   - Value: Your complete MongoDB connection string
2. `PORT`
   - Value: `3001`

You can also use the "Add from .env" option and paste your server `.env` file contents.

### Step 5: Deploy Backend

1. Click "Deploy Web Service"
2. Wait for the deployment to complete (this may take several minutes)
3. Once deployed, you will see a URL like: `https://quotes-demo-backend.onrender.com`

### Step 6: Test Backend

1. Visit your Render backend URL
2. Add `/api/test` to the end: `https://quotes-demo-backend.onrender.com/api/test`
3. You should see a test message
4. Try `/api/quotes` to verify quotes are working: `https://quotes-demo-backend.onrender.com/api/quotes`

### Step 7: Copy Backend URL

Copy your complete Render backend URL (without any path). You will need this for the frontend deployment.

Example: `https://quotes-demo-backend.onrender.com`

## MongoDB Network Access

If your backend logs show "no access" or connection errors:

1. Login to MongoDB Cloud/Atlas
2. Navigate to: Security > Network Access
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere"
5. Click "Confirm"

This allows Render servers to connect to your MongoDB database.

## Frontend Deployment (Render)

### Step 1: Create Static Site

1. On Render dashboard, click "+ New"
2. Select "Static Site"
3. Select the `quotes-demo` repository

### Step 2: Configure Static Site

Configure the following settings:

- Name: `quotes-demo-frontend` (or your preferred name)
- Project: Select the same project as your backend Web Service
- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

### Step 3: Add Environment Variable

1. Click "Add Environment Variable"
2. Add the following:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from earlier (e.g., `https://quotes-demo-backend.onrender.com`)

### Step 4: Deploy Frontend

1. Click "Deploy Static Site"
2. Wait for the deployment to complete
3. Once deployed, you will receive a frontend URL like: `https://quotes-demo-frontend.onrender.com`

## Verification

### Backend Verification

1. Visit: `https://your-backend.onrender.com/api/test`
   - Should see: API test message
2. Visit: `https://your-backend.onrender.com/api/quotes`
   - Should see: Array of quote objects

### Frontend Verification

1. Visit: `https://your-frontend.onrender.com`
2. You should see:
   - Quotes displayed on the page
   - Quotes loaded from your MongoDB database
   - No console errors

### Full Integration Test

1. Open your frontend URL
2. Open browser Developer Tools (F12)
3. Check the Network tab
4. You should see successful API calls to your backend
5. Quotes should display without errors

## Troubleshooting

### Common Issues and Solutions

#### Problem: Backend shows "Connection Refused" or "No Access"

**What this means:** MongoDB is blocking the connection from Render servers

**How to fix:**
1. Go to MongoDB Atlas > Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere"
4. Wait 2-3 minutes for changes to propagate
5. Restart your Render backend service

#### Problem: Frontend shows "Network Error" or "Failed to fetch"

**What this means:** Frontend cannot connect to backend API

**How to fix:**
1. Check that `VITE_API_URL` is set correctly in Render frontend settings
2. Verify your backend URL is correct and accessible
3. Make sure your backend URL does NOT have a trailing slash
4. Redeploy the frontend after making changes

#### Problem: Backend deployment fails

**What this means:** Build or start command is failing

**How to fix:**
1. Check Render logs for specific error messages
2. Verify `package.json` has correct scripts
3. Ensure all environment variables are set
4. Check that Root Directory is set to `server`

#### Problem: Quotes not displaying on frontend

**What this means:** Database connection or seeding issue

**How to fix:**
1. Check if backend `/api/quotes` endpoint returns data
2. Verify MongoDB connection string is correct
3. Run `npm run seed` locally to seed the database
4. Check MongoDB Atlas to see if data exists in the database

#### Problem: MongoDB authentication failed

**What this means:** Username or password is incorrect in connection string

**How to fix:**
1. Verify username is `quotes_db_user`
2. Check that password in connection string matches MongoDB user password
3. Ensure all `<>` symbols are removed from connection string
4. Create a new database user if needed

#### Problem: "Cannot read database name" error

**What this means:** This is NOT an error - MongoDB creates databases automatically

**No action needed:** The database will be created when you first write data to it

## Environment Variables Reference

### Server (.env)

```
PORT=3001
MONGODB_URI=mongodb+srv://quotes_db_user:<password>@<cluster-url>/quotes?retryWrites=true&w=majority&appName=<app-name>
```

### Client (.env)

```
VITE_API_URL=http://localhost:3001
```

### Render Backend Environment Variables

- `MONGODB_URI`: Your complete MongoDB connection string
- `PORT`: `3001`

### Render Frontend Environment Variables

- `VITE_API_URL`: Your backend Render URL (e.g., `https://quotes-demo-backend.onrender.com`)

## Success Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with correct permissions
- [ ] Network access configured to allow all IPs
- [ ] Local testing completed successfully
- [ ] Backend deployed to Render
- [ ] Backend `/api/test` endpoint working
- [ ] Backend `/api/quotes` endpoint returning data
- [ ] Frontend deployed to Render
- [ ] Frontend displaying quotes correctly
- [ ] No console errors in browser

## Support

If you continue to experience issues:

1. Check Render logs for both frontend and backend
2. Verify all environment variables are set correctly
3. Test your MongoDB connection using MongoDB Compass
4. Ensure your GitHub repository is up to date
5. Review the troubleshooting section above

Remember: Render free tier services may take 30-60 seconds to wake up after periods of inactivity.
