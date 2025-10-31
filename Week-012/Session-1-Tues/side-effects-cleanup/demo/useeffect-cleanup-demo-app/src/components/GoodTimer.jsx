import { useState, useEffect } from "react";

export default function GoodTimer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("GoodTimer: Component mounted - starting interval");

    // WITH CLEANUP - This is the solution
    const timerId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // CLEANUP FUNCTION - This prevents memory leaks
    // React will run this function when GoodTimer is removed from the page
    // This happens when you switch to a page without GoodTimer or unmount the component
    return () => {
      console.log(
        "GoodTimer: Cleanup running - clearing interval with ID",
        timerId
      );
      clearInterval(timerId);
      console.log("GoodTimer: Cleanup complete - timer stopped");
    };
  }, []);

  return (
    <div>
      <p>
        <strong>Good Timer - Count:</strong> {count}
      </p>
      <p>This timer has a proper cleanup function</p>
    </div>
  );
}
