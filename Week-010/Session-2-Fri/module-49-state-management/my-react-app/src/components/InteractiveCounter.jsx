import { useState } from "react";

export default function InteractiveCounter() {
  const [count, setCount] = useState(100);
  // useState returns an array that has a value (any data type) and a function.  So we need to do an array destructuring to reference specific pieces (create variables for each piece returned)
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 5)}>+</button>
      <button onClick={() => setCount(count - 5)}>-</button>
    </div>
  );
}
