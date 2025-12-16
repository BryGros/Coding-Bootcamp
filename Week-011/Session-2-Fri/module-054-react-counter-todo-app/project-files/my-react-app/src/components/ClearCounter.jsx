export default function ClearCounter({ total, reset }) {
  return (
    <div className="counter-wrapper">
      <h1 className="count-text">
        Total Count: <span className="total-count">{total}</span>
      </h1>
      <button className="clear-btn" onClick={reset}>
        Clear All Counters
      </button>
    </div>
  );
}
