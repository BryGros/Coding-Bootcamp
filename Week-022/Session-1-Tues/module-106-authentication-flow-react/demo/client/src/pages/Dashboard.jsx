import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page">
      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="user-info">
          <h2>User Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="dashboard-content">
          <h2>Welcome to your dashboard</h2>
          <p>This is a protected page that only authenticated users can see.</p>
          <p>Try refreshing the page - you will stay logged in!</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
