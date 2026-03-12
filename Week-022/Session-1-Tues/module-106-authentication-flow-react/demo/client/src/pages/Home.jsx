import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page">
      <h1>Welcome to Authentication Demo</h1>

      {isAuthenticated ? (
        <div>
          <p>You are logged in as {user.name}!</p>
          <Link to="/dashboard" className="button">
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p>Please login or register to continue</p>
          <div className="button-group">
            <Link to="/login" className="button">
              Login
            </Link>
            <Link to="/register" className="button button-secondary">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
