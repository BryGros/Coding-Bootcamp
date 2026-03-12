# Quotes App - Client

React frontend for the Developer Quotes application, built with Vite.

## Quick Start

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your API URL:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Environment Variables

The application requires the following environment variable:

- `VITE_API_URL` - Backend API URL (default: http://localhost:3001)

For production deployment, this should be your deployed backend URL (e.g., https://your-backend.onrender.com)

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable React components
│   ├── hooks/          # Custom React hooks (useQuotes)
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   └── main.jsx        # Application entry point
├── public/             # Static assets
├── .env.example        # Environment variables template
└── vite.config.js      # Vite configuration
```

## Features

- Custom `useQuotes` hook for fetching quotes from API
- Responsive design with professional styling
- Error handling for API requests
- Environment-based configuration
- Fast development with Vite HMR (Hot Module Replacement)

## Technology Stack

- React 18
- Vite 6
- ESLint for code quality
- CSS3 for styling

## Deployment

For complete deployment instructions to production (Render, Vercel, etc.), see the main [DEPLOYMENT.md](../DEPLOYMENT.md) file in the project root.

Quick deployment checklist:
1. Update `VITE_API_URL` to your production backend URL
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting service

## Backend Connection

This frontend connects to the backend API at the URL specified in `VITE_API_URL`. Make sure:
1. Backend server is running
2. Backend URL is correct in `.env`
3. CORS is configured on the backend to allow requests from your frontend domain

## Troubleshooting

### Quotes not displaying

1. Check that backend server is running
2. Verify `VITE_API_URL` in `.env` is correct
3. Check browser console for error messages
4. Verify backend `/api/quotes` endpoint is working

### Environment variable not loading

1. Restart the development server after changing `.env`
2. Ensure variable name starts with `VITE_`
3. Check that `.env` file is in the `client` folder

### Build errors

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check Node.js version (requires Node 18+)

## Learn More

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Vite + React Guide](https://vite.dev/guide/)
