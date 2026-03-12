import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <p className="subtitle">This page is protected - only authenticated users can see it</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Welcome</h3>
            <p className="stat-value">{user.name}</p>
          </div>

          <div className="stat-card">
            <h3>Role</h3>
            <p className="stat-value">{user.role}</p>
          </div>

          <div className="stat-card">
            <h3>Member Since</h3>
            <p className="stat-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="content-box">
          <h2>Protected Content</h2>
          <p>This is a protected page that requires authentication.</p>
          <ul>
            <li>Only logged-in users can access this page</li>
            <li>If you're not authenticated, you'll be redirected to login</li>
            <li>Try refreshing the page - you'll stay logged in</li>
            <li>Try accessing this page in an incognito window - you'll be redirected</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
