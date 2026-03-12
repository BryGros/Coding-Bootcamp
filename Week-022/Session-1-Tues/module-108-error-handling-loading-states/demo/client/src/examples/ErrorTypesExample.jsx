import { useState } from 'react';
import api from '../api/axios';

function ErrorTypesExample() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = async (endpoint, description) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await api.get(endpoint);
      setResult({ type: 'success', message: response.data.message || 'Request successful' });
    } catch (err) {
      let errorType = 'Unknown Error';
      let errorMessage = err.message;

      if (err.code === 'ECONNABORTED') {
        errorType = 'Timeout Error';
        errorMessage = 'Request took too long. The server did not respond in time.';
      } else if (err.response) {
        // Server responded with error
        errorType = `HTTP ${err.response.status}`;
        errorMessage = err.response.data?.error || err.response.data?.message || err.message;
      } else if (err.request) {
        // Request made but no response
        errorType = 'Network Error';
        errorMessage = 'Unable to reach the server. Check your internet connection.';
      }

      setError({ type: errorType, message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="example-section">
      <h2>Different Error Types</h2>
      <p className="example-description">
        Demonstrates handling different types of errors with specific messages.
      </p>

      <div className="button-grid">
        <button
          onClick={() => makeRequest('/fast', 'Success')}
          className="button"
          disabled={loading}
        >
          Success (fast)
        </button>

        <button
          onClick={() => makeRequest('/slow', 'Success')}
          className="button"
          disabled={loading}
        >
          Success (slow)
        </button>

        <button
          onClick={() => makeRequest('/random', 'Random')}
          className="button button-warning"
          disabled={loading}
        >
          Random (50% fail)
        </button>

        <button
          onClick={() => makeRequest('/error', 'Error')}
          className="button button-danger"
          disabled={loading}
        >
          500 Server Error
        </button>

        <button
          onClick={() => makeRequest('/notfound', 'Not Found')}
          className="button button-danger"
          disabled={loading}
        >
          404 Not Found
        </button>

        <button
          onClick={() => makeRequest('/timeout', 'Timeout')}
          className="button button-danger"
          disabled={loading}
        >
          Timeout (10s)
        </button>
      </div>

      {loading && (
        <div className="status-box loading-box">
          <div className="spinner-small"></div>
          <span>Loading...</span>
        </div>
      )}

      {result && (
        <div className="status-box success-box">
          <span className="status-icon">✓</span>
          <div>
            <strong>Success</strong>
            <p>{result.message}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="status-box error-box">
          <span className="status-icon">✗</span>
          <div>
            <strong>{error.type}</strong>
            <p>{error.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorTypesExample;
