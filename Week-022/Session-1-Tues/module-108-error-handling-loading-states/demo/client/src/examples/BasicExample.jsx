import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function BasicExample() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (loading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  // Show error state
  if (error) {
    return <ErrorMessage error={error} onRetry={fetchUsers} />;
  }

  // Show success state
  return (
    <div className="example-section">
      <h2>Basic Three-State Pattern</h2>
      <p className="example-description">
        This example demonstrates the fundamental pattern: loading, error, and success states.
      </p>

      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <span className={`status ${user.status}`}>{user.status}</span>
          </div>
        ))}
      </div>

      <button onClick={fetchUsers} className="button">
        Refresh Data
      </button>
    </div>
  );
}

export default BasicExample;
