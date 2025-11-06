import { useState } from "react";

export default function Counter() {
  //set our counter state
  const [count, setCount] = useState(0);
  // onClick event functions
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };

  //return of elements
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
      {/* Example of inline onClick Event */}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
