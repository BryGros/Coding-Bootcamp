import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth();

  // If still loading, show a loading spinner
  if (loading) {
    return <LoadingSpinner message="Checking authentication..." />;
  }

  // If no user is logged in, redirect to /login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If requiredRole is specified and user role doesn't match, redirect to /unauthorized
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  // If all checks pass, render the children
  return children;
}

export default ProtectedRoute;
