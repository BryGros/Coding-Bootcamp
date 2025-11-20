
import { useEffect, useRef } from "react";

export default function PlayerCharacter() {
  const canvasRef = useRef(null);
  // Get the actual <canvas> DOM element from the ref (after it loads-- that's what .current does)
  const canvas = canvasRef.current;
  // Safety in case something goes wrong
  if (!canvas) return;
  // .getCanvas() returns a drawing context on the canvas, or null if the context identifier is not supported
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  // init
  // save map image to a new image object not yet attached to the DOM (using the Image() function)
  useEffect(() => {
    // Player's initial position (hard-coded for now)
    
  }, []);
}
