import './Quote.css';

function Quote({ quote, currentIndex, totalQuotes, onNext, onPrevious }) {
  return (
    <div className="quote-container">
      <h1>Developer Quotes</h1>

      <div className="quote-card">
        <p className="quote-text">"{quote.text}"</p>
        <p className="quote-author">- {quote.author}</p>
        <span className="quote-category">{quote.category}</span>
      </div>

      <div className="quote-navigation">
        <button onClick={onPrevious} className="nav-button">
          <span>Previous</span>
        </button>
        <span className="quote-counter">
          {currentIndex + 1} / {totalQuotes}
        </span>
        <button onClick={onNext} className="nav-button">
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default Quote;
