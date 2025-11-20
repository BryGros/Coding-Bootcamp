import { useEffect, useRef } from "react";
import map from "../assets/DemoLower.png";
import hero from "../assets/hero.png";
import shadow from "../assets/shadow.png";
import box from "../assets/box.png";
import drawCharacters from "../helperFunctions/drawCharacters";
import npcMove from "../helperFunctions/npcMove";

export default function Overworld() {
  const sampleObject = {
    hero: {
      id: "Player",
      type: "hero",
      facing: "down",
      xPos: 1,
      yPos: 3,
      src: hero,
      movement: "static",
      lastMoveIndex: 0,
    },
    npc1: {
      id: "npc1",
      type: "npc",
      facing: "up",
      xPos: 10,
      yPos: 8,
      src: hero,
      movement: "static",
      lastMoveIndex: 0,
    },
    npc2: {
      id: "npc1",
      type: "npc",
      facing: "right",
      xPos: 1,
      yPos: 8,
      src: hero,
      movement: [
        [1, 8, "right"],
        [2, 8, "right"],
        [3, 8, "right"],
        [3, 8, "left"],
        [2, 8, "left"],
        [1, 8, "left"],
      ],
      lastMoveIndex: 5,
    },
  };
  // Create a reference that will hold the <canvas> element from the DOM
  const canvasRef = useRef(null);
  // One time setup after the component is rendered
  useEffect(() => {
    // Get the actual <canvas> DOM element from the ref (after it loads-- that's what .current does)
    const canvas = canvasRef.current;
    // Safety in case something goes wrong
    if (!canvas) return;
    // .getCanvas() returns a drawing context on the canvas, or null if the context identifier is not supported
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // create new image objects not yet attached to the DOM (using the Image() function)
    const mapImage = new Image();
    const shadowImage = new Image();
    const charSprite = new Image();

    mapImage.src = map;
    shadowImage.src = shadow;
    charSprite.src = hero;

    mapImage.onload = () => {
      ctx.drawImage(mapImage, 0, 0);
    };

    charSprite.onload = () => {
      drawCharacters(sampleObject, ctx, shadowImage, charSprite);
    };
    // game loop
    function gameLoop() {
      npcMove(sampleObject);
      drawCharacters(sampleObject, ctx, shadowImage, charSprite);
      requestAnimationFrame(gameLoop);
    }
    // game loop
    gameLoop();
  }, []);

  return (
    <div className="game-container">
      <canvas
        // When you render this <canvas>, put its DOM node into canvasRef.current
        ref={canvasRef}
        className="game-canvas"
        width="352"
        height="198"
      ></canvas>
    </div>
  );
}
