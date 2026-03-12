import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="profile">
        <h1>User Profile</h1>
        <p className="subtitle">This is another protected page</p>

        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{user.name}</h2>
              <span className={`role-badge ${user.role}`}>{user.role}</span>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{user.email}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">User ID:</span>
              <span className="detail-value">{user.id}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Role:</span>
              <span className="detail-value">{user.role}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="info-box">
          <h3>About Protected Pages</h3>
          <p>This profile page is protected and can only be viewed by authenticated users.</p>
          <p>Try accessing this URL directly in an incognito window - you'll be redirected to the login page!</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
