import { useState, useEffect } from 'react';
import api from '../api/axios';

function InlineLoadingExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/posts');
      setPosts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="example-section">
      <h2>Inline Loading Pattern</h2>
      <p className="example-description">
        Instead of replacing the entire component, show loading/error inline alongside content.
      </p>

      <div className="controls">
        <button onClick={fetchPosts} disabled={loading} className="button">
          {loading ? 'Loading...' : 'Refresh Posts'}
        </button>
      </div>

      {error && (
        <div className="error-inline">
          <span>Error: {error}</span>
          <button onClick={fetchPosts} className="button-small">
            Retry
          </button>
        </div>
      )}

      {loading && posts.length === 0 ? (
        <div className="skeleton-list">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-item"></div>
          ))}
        </div>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p className="post-meta">
                By {post.author} • {post.views} views
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InlineLoadingExample;
