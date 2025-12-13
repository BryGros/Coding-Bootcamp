import { useContext } from "react";
import { useNavigate } from "react-router";
import { ThemeContext } from "../context/PlayerContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/play");
  };

  return (
    <div className="component-wrap">
      <h1>Welcome to Code-Cracker!</h1>
      <h2> How to Play (Rules) </h2>
      <div className="rule-wrap">
        <p>
          You’re a{" "}
          <span className={`themed-text theme-${theme}`}>passcode-cracker</span>{" "}
          racing against a firewall trace. Your mission: uncover as many
          passcodes as possible before time runs out!
        </p>{" "}
        <p>
          Crack passcodes by making words out of the 7 letters you're given. To
          uncover a passcode, you must submit a valid word built from those
          letters. Words must be{" "}
          <span className={`themed-text theme-${theme}`}>
            at least 4 letters long
          </span>
          , and you{" "}
          <span className={`themed-text theme-${theme}`}>
            can only use each letter once{" "}
          </span>{" "}
          in a word. Uncovered passcodes award points - longer words = more
          points! If you use{" "}
          <span className={`themed-text theme-${theme}`}>all 7 letters </span>in
          a single word, you earn a “full-set” bonus.
        </p>
        <p>
          If you’ve earned enough points before the time is up, you can keep
          playing to increase your total score. Otherwise, your score is logged
          and your run ends.
        </p>
        <p>
          <span className={`themed-text theme-${theme}`}>NOTE:</span> you must
          generate an API key from
          <a href="https://rapidapi.com/wordcheckerio/api/word-checker-api?ref=producthunt](https://rapidapi.com/wordcheckerio/api/word-checker-api?ref=producthunt">
            {" "}
            <span className={`themed-text theme-${theme}`}>
              RapidAPI (Word Checker API)
            </span>
          </a>{" "}
          to play!
        </p>
      </div>
      <button className="play-btn" onClick={handleClick}>
        Play
      </button>
    </div>
  );
}
