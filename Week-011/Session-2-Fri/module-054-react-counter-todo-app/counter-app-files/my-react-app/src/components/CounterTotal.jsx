export default function ClearCounter({
  currTotal,
  adjustTotal,
  adjustCounters,
}) {
  const handleClear = () => {
    adjustCounters((currArray) => {
      const newArray = [];
      for (const index in currArray) {
        const object = currArray[index];
        // Set object count to 0
        object.count = 0;
        // Push to new array
        newArray.push(object);
      }
      adjustTotal(0);
      return newArray;
    });
  };
  return (
    <div className="counter-wrapper">
      <h1 className="count-text">
        Total Count: <span className="total-count">{currTotal}</span>
      </h1>
      <button className="clear-btn" onClick={handleClear}>
        Clear All Counters
      </button>
    </div>
  );
}
