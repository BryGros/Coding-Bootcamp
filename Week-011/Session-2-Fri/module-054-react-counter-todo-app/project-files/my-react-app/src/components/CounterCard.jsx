import { useState } from "react";

export default function CounterCard({ updateTotal, object, deleteClick }) {
  const [count, setCounter] = useState(0);

  const add = () => {
    setCounter(count + Number(object.increment));
    updateTotal(+object.increment);
  };
  const minus = () => {
    setCounter(count - object.increment);
    updateTotal(-object.increment);
  };
  const reset = () => {
    setCounter((count) => {
      updateTotal(-count);
      return 0;
    });
  };
  object.count = count;

  return (
    <div className="card-wrapper" id={object.id}>
      <h1 className="counter-name">{object.id}</h1>
      <p className="counter-number">
        {count}
        <span className="number-text">times</span>
      </p>
      <div className="btn-cont">
        <button className="minus" onClick={minus}>
          -{object.increment}
        </button>
        <button className="plus" onClick={add}>
          +{object.increment}
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
        <button className="delete" onClick={deleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
