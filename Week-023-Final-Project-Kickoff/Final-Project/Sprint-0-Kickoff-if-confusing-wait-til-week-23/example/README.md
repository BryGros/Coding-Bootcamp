# Task Manager Application

Full-stack task management application built with React and Express.

## Project Structure

```
example/
├── client/          # Frontend React application
└── server/          # Backend Express server
```

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies for both client and server:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Running the Application

You need to run both the frontend and backend servers independently in separate terminal windows.

### Starting the Backend Server

1. Open a terminal window
2. Navigate to the server directory:
```bash
cd server
```

3. Start the server:
```bash
# For development with auto-restart
npm run dev

# Or for production mode
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your .env file)

### Starting the Frontend Client

1. Open a NEW terminal window (keep the backend running)
2. Navigate to the client directory:
```bash
cd client
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173` (default Vite port)

## Environment Variables

### Server (.env file)

Create a `.env` file in the server directory:

```
PORT=3000
```

## Development Workflow

1. Start the backend server first (in one terminal)
2. Start the frontend client second (in another terminal)
3. Make changes to your code - both servers will auto-reload on file changes
4. Access the application at `http://localhost:5173`

## Available Scripts

### Client

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server

- `npm run dev` - Start server with nodemon (auto-restart)
- `npm start` - Start server in production mode