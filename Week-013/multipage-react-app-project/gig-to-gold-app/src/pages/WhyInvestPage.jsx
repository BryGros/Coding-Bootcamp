import { useEffect, useState } from "react";

export default function WhyInvest() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://icanhazdadjoke.com/", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP! error!  status: ${response.status}`);
        }
        const jokeJson = await response.json();
        setJoke(jokeJson.joke);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const loadingBar = (
    <div className="loading-bar">
      <div className="loader"></div>
    </div>
  );
  return (
  <div className="sm-wrapper">
  {joke == null ? loadingBar : joke}</div>);
}
