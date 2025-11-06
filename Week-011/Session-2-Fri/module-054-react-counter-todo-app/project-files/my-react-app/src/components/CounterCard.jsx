import { useState } from "react";

export default function CounterCard({ updateTotal }) {
  const [count, setCounter] = useState(0);

  const add = () => {
    setCounter(count + 1);
    updateTotal(+1);
  };
  const minus = () => {
    setCounter(count - 1);
    updateTotal(-1);
  };
  const reset = () => {
    setCounter((count) => {
      updateTotal(-count);
      return 0;
    });
  };

  return (
    <div className="card-wrapper">
      <h1 className="counter-name">Counter Name</h1>
      <p className="counter-number">
        {count}
        <span className="number-text">times</span>
      </p>
      <div className="btn-cont">
        <button className="minus" onClick={minus}>
          -1
        </button>
        <button className="plus" onClick={add}>
          +1
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
}
