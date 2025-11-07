export default function ClearCounter(currTotal, adjustTotal, setCounterData) {
  return (
    <div className="counter-wrapper">
      <h1 className="count-text">
        Total Count: <span className="total-count">{currTotal.currTotal}</span>
      </h1>
      <button className="clear-btn">Clear All Counters</button>
    </div>
  );
}
