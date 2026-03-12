import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated, user, isAdmin } = useAuth();

  return (
    <div className="page">
      <div className="hero">
        <h1>Protected Routes & Role-Based Access Demo</h1>
        <p>Learn how to protect routes and control access based on user roles</p>
      </div>

      {isAuthenticated ? (
        <div className="content-box">
          <h2>Welcome back, {user.name}!</h2>
          <p>You are logged in as: <strong>{user.role}</strong></p>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>Your Dashboard</h3>
              <p>View your personal dashboard with user data</p>
              <Link to="/dashboard" className="button">Go to Dashboard</Link>
            </div>

            <div className="feature-card">
              <h3>Your Profile</h3>
              <p>Manage your profile information</p>
              <Link to="/profile" className="button">View Profile</Link>
            </div>

            {isAdmin && (
              <div className="feature-card admin-card">
                <h3>Admin Panel</h3>
                <p>Manage users (admin only)</p>
                <Link to="/admin" className="button button-admin">Admin Panel</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="content-box">
          <h2>Get Started</h2>
          <p>Login or register to access protected content</p>

          <div className="button-group">
            <Link to="/login" className="button">
              Login
            </Link>
            <Link to="/register" className="button button-secondary">
              Register
            </Link>
          </div>

          <div className="info-box">
            <h4>Demo Credentials:</h4>
            <p><strong>Admin Account:</strong></p>
            <p>Email: admin@test.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
