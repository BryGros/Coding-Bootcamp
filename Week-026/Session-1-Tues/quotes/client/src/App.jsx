import { useState } from 'react';
import useQuotes from './hooks/useQuotes';
import Quote from './components/Quote';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { quotes, loading, error } = useQuotes();

  const handleNextQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handlePreviousQuote = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading quotes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error Loading Quotes</h2>
          <p>{error}</p>
          <p>Make sure the backend server is running and MongoDB is connected.</p>
        </div>
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="app">
        <div className="no-quotes">
          <h2>No Quotes Available</h2>
          <p>Run the seed script to add quotes to the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Quote
        quote={quotes[currentIndex]}
        currentIndex={currentIndex}
        totalQuotes={quotes.length}
        onNext={handleNextQuote}
        onPrevious={handlePreviousQuote}
      />
    </div>
  );
}

export default App;
