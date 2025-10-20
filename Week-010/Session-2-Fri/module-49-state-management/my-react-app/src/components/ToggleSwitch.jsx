import { useState } from "react";

export default function ToggleSwitch() {
  // create a state variable called "is on" using useState

  const [isOn, setIsOn] = useState(false);
  return (
    <div>
      <div className={`switch ${isOn ? "on" : "off"}`}>
        <button onClick={() => setIsOn(!isOn)}>{isOn ? "ON" : "OFF"}</button>
      </div>
      <p>The switch is {isOn ? "ON" : "OFF"}</p>
    </div>
  );
}
