import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/">Protected Routes Demo</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>

            {/* Show admin link only for admins */}
            {isAdmin && (
              <Link to="/admin" className="admin-link">
                Admin Panel
              </Link>
            )}

            <span className="user-info">
              {user.name} ({user.role})
            </span>

            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
