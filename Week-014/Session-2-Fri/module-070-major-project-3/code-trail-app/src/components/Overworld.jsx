import { useEffect, useRef } from "react";
import map from "../assets/DemoLower.png";
import hero from "../assets/hero.png";
import shadow from "../assets/shadow.png";
import box from "../assets/box.png";
import drawCharacters from "../helperFunctions/drawCharacters";

export default function Overworld() {
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
    // const heroShadow = new Image();
    // const heroImage = new Image();

    // onload runs this function when the image src is loaded

    // reference the imported image

    // const x = 1;
    // const y = 4;

    // heroShadow.onload = () => {
    //   ctx.drawImage(heroShadow, 0, 0, 32, 32, x * 16 - 8, y * 16 - 18, 32, 32);
    // };

    // heroImage.onload = () => {
    //   ctx.drawImage(
    //     heroImage,
    //     //starting points of left and top crop
    //     0, // left crop of src image
    //     0, // right crop of src image
    //     // size of cut we want to make
    //     32, // width of crop (px)
    //     32, // height of crop (px)
    //     x * 16 - 8, // x position on canvas (multiplied because each grid square in the map is 16x16 pixels, then subtracted for nudging)
    //     y * 16 - 18, // y position, treated similarly to x position
    //     32, // width of image to render in canvas (px)
    //     32 // width of image to render into canvas
    //   );
    // };

    // heroShadow.src = shadow;
    // heroImage.src = hero;
    const sampleObject = {
      hero: {
        id: "Player",
        type: "hero",
        facing: "down",
        xPos: 1,
        yPos: 4,
        src: hero,
      },
      npc1: {
        id: "npc1",
        type: "npc",
        facing: "up",
        xPos: 11,
        yPos: 10,
        src: hero,
      },
      npc2: {
        id: "npc1",
        type: "npc",
        facing: "right",
        xPos: 1,
        yPos: 10,
        src: hero,
      },
    };

    mapImage.src = map;
    shadowImage.src = shadow;
    charSprite.src = hero;

    mapImage.onload = () => {
      ctx.drawImage(mapImage, 0, 0);
    };

    charSprite.onload = () => {
      drawCharacters(sampleObject, ctx, shadowImage, charSprite);
    };

    // positioning objects/players, etc.
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
