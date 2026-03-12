import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="error-page">
        <div className="error-icon">🚫</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>

        {user && (
          <div className="content-box">
            <p>Your current role: <strong>{user.role}</strong></p>
            <p>This page requires: <strong>admin</strong> role</p>
          </div>
        )}

        <div className="button-group">
          <Link to="/" className="button">
            Go Home
          </Link>
          <Link to="/dashboard" className="button button-secondary">
            Go to Dashboard
          </Link>
        </div>

        <div className="info-box">
          <h3>About Role-Based Access Control</h3>
          <p>This page demonstrates role-based access control (RBAC).</p>
          <p>The admin panel is protected and only accessible to users with the "admin" role.</p>
          <p>Regular users are redirected to this page if they try to access admin-only content.</p>
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
