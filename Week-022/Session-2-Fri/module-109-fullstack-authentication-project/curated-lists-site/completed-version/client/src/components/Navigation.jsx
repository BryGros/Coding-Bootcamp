import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-brand">Curated Lists</div>

        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          {/* Show Dashboard link when user is logged in */}
          {user && (
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          )}

          {/* Show Admin link only when user role is admin */}
          {user && user.role === 'admin' && (
            <NavLink to="/admin" className="nav-link">
              Admin Panel
            </NavLink>
          )}

          {/* Show Login and Register when user is NOT logged in */}
          {!user && (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </>
          )}

          {/* Show Logout button when user IS logged in */}
          {user && (
            <button onClick={handleLogout} className="nav-link btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
