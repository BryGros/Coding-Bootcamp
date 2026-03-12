import { useState } from 'react';
import api from '../api/axios';

function FormSubmissionExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError(null);
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.post('/users', formData);
      setSuccess(true);
      setFormData({ name: '', email: '' });

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="example-section">
      <h2>Form Submission with Feedback</h2>
      <p className="example-description">
        Shows loading during submission, displays errors, and confirms success.
      </p>

      {success && (
        <div className="success-message">
          User created successfully!
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter name (min 2 chars)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter email"
          />
        </div>

        <button type="submit" disabled={loading} className="button">
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Creating...
            </>
          ) : (
            'Create User'
          )}
        </button>
      </form>

      <div className="form-tips">
        <h4>Try these to trigger errors:</h4>
        <ul>
          <li>Name with 1 character (validation error)</li>
          <li>Email without @ symbol (validation error)</li>
          <li>Email alice@example.com (duplicate error)</li>
        </ul>
      </div>
    </div>
  );
}

export default FormSubmissionExample;
