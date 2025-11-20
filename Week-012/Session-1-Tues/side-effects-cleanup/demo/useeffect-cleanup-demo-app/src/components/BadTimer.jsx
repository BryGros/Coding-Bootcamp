import { useState, useEffect } from "react";

export default function BadTimer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  }, []);

  return <div>Count: {count}</div>;
}
