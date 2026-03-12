# Developer Quotes App - Development vs Production

Full-stack application demonstrating environment management with React, Express, and MongoDB Atlas.

## MongoDB Atlas Setup

1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Database" and select "M0 FREE" tier
3. Choose cloud provider and region (closest to you)
4. Create cluster (takes 3-5 minutes)
5. Security Setup:
   - Create database user (remember username and password)
   - Add IP: Database and Nework Access > Click "Network Access" > "Access List" then "Add IP Address" button then "Allow Access from Anywhere" > Confirm
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database-name>` with your values

### If You already have account
1. Login to your cluster on MongoDB Atlas
2. create a database named `quotes` with a collection named `quotes`
3. Go to security DB and Network Access
4. Click "Add New Database User"
5. Add user names "quotes_db_user"
6. Autogenerate Secure password 
7. Select Built-in role > Read and Write to any Database
8. Add User



## Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` file and add your MongoDB connection string to `MONGODB_URI`

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

## Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Start the development server:
```bash
npm run dev
```

Client runs on [http://localhost:5173](http://localhost:5173)

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions for Vercel and Render.

## Features

- Custom React hook (`useQuotes`) for API data fetching
- MongoDB Atlas cloud database integration
- Express REST API with error handling
- Environment-based configuration
- Database seeding script with developer quotes
- Vercel-ready deployment configuration