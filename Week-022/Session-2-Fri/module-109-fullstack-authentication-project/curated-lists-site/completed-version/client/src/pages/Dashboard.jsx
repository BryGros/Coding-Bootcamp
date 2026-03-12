import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user } = useAuth();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all website lists
  const fetchLists = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/lists');
      setLists(response.data.lists);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to load lists';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch lists on component mount
  useEffect(() => {
    fetchLists();
  }, []);

  // If loading, return LoadingSpinner component
  if (loading) {
    return <LoadingSpinner message="Loading website lists..." />;
  }

  // If error, return ErrorMessage component with error and onRetry
  if (error) {
    return <ErrorMessage error={error} onRetry={fetchLists} />;
  }

  return (
    <div>
      <h1>Website Lists Dashboard</h1>
      <p className="mb-3">Welcome, {user.name}!</p>

      {/* If lists array is empty, show message */}
      {lists.length === 0 && (
        <div className="card text-center">
          <p>No lists available yet. Check back later!</p>
        </div>
      )}

      {/* Map over lists and display each list in a card */}
      <div className="grid grid-2">
        {lists.map((list) => (
          <div key={list.id} className="card">
            <h3>{list.title}</h3>
            <p className="mb-2">{list.description}</p>
            <p className="mb-2">
              <strong>Category:</strong> {list.category}
            </p>
            <p className="mb-2">
              <strong>Created by:</strong> {list.createdBy}
            </p>

            <h4 className="mt-3 mb-2">Websites ({list.websites.length}):</h4>
            <ul style={{ paddingLeft: '20px' }}>
              {list.websites.map((website, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  <a href={website.url} target="_blank" rel="noopener noreferrer">
                    {website.name}
                  </a>
                  {' - '}
                  {website.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
