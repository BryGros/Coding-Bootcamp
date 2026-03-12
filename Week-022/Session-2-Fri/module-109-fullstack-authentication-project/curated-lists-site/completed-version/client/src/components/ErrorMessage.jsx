function ErrorMessage({ error, onRetry = null }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠</div>
      <h3>Something went wrong</h3>
      <p className="error-message">{error}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
