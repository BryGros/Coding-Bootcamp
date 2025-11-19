// Function that calculates which piece of the sprte sheet to render based on "facing" direction from character object

export default function drawCharacters(
  levelObject,
  ctx,
  shadowImage,
  charSprite
) {
  for (const index in levelObject) {
    const character = levelObject[index];
    let spriteSheetY = 0;
    const xNudge = character.xPos * 16 - 8;
    const yNudge = character.yPos * 16 - 8;
    if (character.facing == "right") {
      spriteSheetY = 32;
    } else if (character.facing == "up") {
      spriteSheetY = 64;
    } else if (character.facing == "left") {
      spriteSheetY = 96;
    }
    ctx.drawImage(shadowImage, 0, spriteSheetY, 32, 32, xNudge, yNudge, 32, 32);
    ctx.drawImage(charSprite, 0, spriteSheetY, 32, 32, xNudge, yNudge, 32, 32);
  }
  // draw command
  // which character sheet is it
  // which direction are they facing
  // what is their position on the map
  //draw them
}
