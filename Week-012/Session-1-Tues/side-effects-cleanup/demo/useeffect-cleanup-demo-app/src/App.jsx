import { useState } from "react";
import "./App.css";
import BadTimer from "./components/BadTimer";
import GoodTimer from "./components/GoodTimer";

function App() {
  // State to control mounting/unmounting of timer demos
  const [showBadTimer, setShowBadTimer] = useState(false);
  const [showGoodTimer, setShowGoodTimer] = useState(false);

  return (
    <>
      <h1>useEffect Cleanup Demo</h1>

      <div className="demo-container">
        <h2>Timer Cleanup Demonstration</h2>
        <p>
          Use the buttons below to mount and unmount timer components. Open your
          browser console to see what happens with and without cleanup
          functions.
        </p>

        <div className="button-group">
          <button
            onClick={() => setShowBadTimer(!showBadTimer)}
            className={showBadTimer ? "btn-unmount" : "btn-mount"}
          >
            {showBadTimer
              ? "Unmount Bad Timer"
              : "Mount Bad Timer (No Cleanup)"}
          </button>

          <button
            onClick={() => setShowGoodTimer(!showGoodTimer)}
            className={showGoodTimer ? "btn-unmount" : "btn-mount"}
          >
            {showGoodTimer
              ? "Unmount Good Timer"
              : "Mount Good Timer (With Cleanup)"}
          </button>
        </div>

        {showBadTimer && (
          <div className="timer-box bad">
            <h3>Bad Timer - No Cleanup</h3>
            <BadTimer />
            <p className="info-box">
              <strong>Problem:</strong> When this component unmounts, the
              interval keeps running, causing memory leaks and errors when it
              tries to update state on an unmounted component.
            </p>
          </div>
        )}

        {showGoodTimer && (
          <div className="timer-box good">
            <h3>Good Timer - With Cleanup</h3>
            <GoodTimer />
            <p className="info-box">
              <strong>Solution:</strong> The cleanup function clears the
              interval when the component unmounts, preventing memory leaks and
              errors.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
