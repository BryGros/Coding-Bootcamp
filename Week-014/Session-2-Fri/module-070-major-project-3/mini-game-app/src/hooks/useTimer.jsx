import { useEffect, useState } from "react";

export default function useTimer() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    console.log("60 second timer started");
    const timer = setInterval(() => {
      setTimeLeft((curr) => {
        if (curr <= 0) {
          return 0;
        } else {
          return curr - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return timeLeft;
}
