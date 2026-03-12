import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function AdminPanel() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for creating new list
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Development');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');
  const [websites, setWebsites] = useState([]);

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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

  const handleAddWebsite = (event) => {
    event.preventDefault();

    // Validate website fields are not empty
    if (!websiteName || !websiteUrl || !websiteDescription) {
      setFormError('Please fill in all website fields');
      return;
    }

    // Create website object
    const newWebsite = {
      name: websiteName,
      url: websiteUrl,
      description: websiteDescription
    };

    // Add website to websites array
    setWebsites([...websites, newWebsite]);

    // Clear website form fields
    setWebsiteName('');
    setWebsiteUrl('');
    setWebsiteDescription('');
    setFormError(null);
  };

  const handleRemoveWebsite = (index) => {
    // Remove website at given index from websites array
    const updatedWebsites = websites.filter((website, i) => i !== index);
    setWebsites(updatedWebsites);
  };

  const handleCreateList = async (event) => {
    event.preventDefault();

    // Validate title, description, and at least one website
    if (!title || !description) {
      setFormError('Please provide title and description');
      return;
    }

    if (websites.length === 0) {
      setFormError('Please add at least one website to the list');
      return;
    }

    // Set form loading to true, clear errors
    setFormLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      // POST /api/admin/lists with title, description, category, websites
      await api.post('/api/admin/lists', {
        title: title,
        description: description,
        category: category,
        websites: websites
      });

      // If successful:
      // Set success message
      setSuccessMessage('List created successfully!');

      // Clear form fields
      setTitle('');
      setDescription('');
      setCategory('Development');
      setWebsites([]);

      // Refresh lists
      fetchLists();

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      // If error, set form error
      const errorMessage = error.response?.data?.message || 'Failed to create list';
      setFormError(errorMessage);
    } finally {
      // Set form loading to false
      setFormLoading(false);
    }
  };

  const handleDeleteList = async (listId) => {
    // Confirm deletion with user
    const confirmed = window.confirm('Are you sure you want to delete this list?');
    if (!confirmed) {
      return;
    }

    try {
      // DELETE /api/admin/lists/:id
      await api.delete(`/api/admin/lists/${listId}`);

      // If successful, refresh lists
      fetchLists();
    } catch (error) {
      // If error, show error message
      const errorMessage = error.response?.data?.message || 'Failed to delete list';
      alert(errorMessage);
    }
  };

  // If loading lists, return LoadingSpinner
  if (loading) {
    return <LoadingSpinner message="Loading admin panel..." />;
  }

  // If error loading lists, return ErrorMessage
  if (error) {
    return <ErrorMessage error={error} onRetry={fetchLists} />;
  }

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Create New List Form */}
      <div className="card mb-4">
        <h2>Create New List</h2>

        {/* Display form error if exists */}
        {formError && <div className="form-error">{formError}</div>}

        {/* Display success message if exists */}
        {successMessage && (
          <div
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--border-radius)',
              marginBottom: 'var(--spacing-sm)',
              textAlign: 'center'
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleCreateList}>
          <div className="form-group">
            <label htmlFor="title">List Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={formLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={formLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={formLoading}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--color-neutral-border)',
                borderRadius: 'var(--border-radius)',
                fontSize: '16px'
              }}
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Productivity">Productivity</option>
              <option value="Learning">Learning</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <h3>Add Websites</h3>

          {/* Display current websites list */}
          {websites.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <h4>Current Websites:</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {websites.map((website, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>
                    <strong>{website.name}</strong> - {website.url}
                    <button
                      type="button"
                      onClick={() => handleRemoveWebsite(index)}
                      className="btn btn-danger"
                      style={{ marginLeft: '8px', padding: '4px 8px', fontSize: '14px' }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="websiteName">Website Name</label>
            <input
              type="text"
              id="websiteName"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="websiteUrl">Website URL</label>
            <input
              type="url"
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="websiteDescription">Website Description</label>
            <input
              type="text"
              id="websiteDescription"
              value={websiteDescription}
              onChange={(e) => setWebsiteDescription(e.target.value)}
            />
          </div>

          <button type="button" onClick={handleAddWebsite} className="btn btn-success mb-3">
            Add Website to List
          </button>

          <button type="submit" className="submit-button" disabled={formLoading}>
            {formLoading ? 'Creating...' : 'Create List'}
          </button>
        </form>
      </div>

      {/* Existing Lists */}
      <h2>Existing Lists</h2>

      {/* If no lists, show message */}
      {lists.length === 0 && (
        <div className="card text-center">
          <p>No lists created yet.</p>
        </div>
      )}

      {/* Map over lists and show each in a card with delete button */}
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

            <h4 className="mt-2 mb-1">Websites ({list.websites.length}):</h4>
            <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
              {list.websites.map((website, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {website.name}
                </li>
              ))}
            </ul>

            <button onClick={() => handleDeleteList(list.id)} className="btn btn-danger">
              Delete List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
