import { useState, useEffect } from 'react';

// Custom hook to fetch quotes from the API
const useQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/quotes`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setQuotes(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch quotes');
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return { quotes, loading, error };
};

export default useQuotes;
