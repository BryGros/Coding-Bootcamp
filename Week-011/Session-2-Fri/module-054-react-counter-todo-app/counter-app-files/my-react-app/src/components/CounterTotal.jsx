export default function ClearCounter() {
  return (
    <div className="counter-wrapper">
      <h1 className="count-text">
        Total Count: <span className="total-count">0</span>
      </h1>
      <button className="clear-btn">Clear All Counters</button>
    </div>
  );
}
