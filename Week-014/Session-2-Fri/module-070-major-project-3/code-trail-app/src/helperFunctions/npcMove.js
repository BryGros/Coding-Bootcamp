export default function npcMove(levelObject) {
  for (const index in levelObject) {
    const character = levelObject[index];
    const movement = character.movement;
    let nextMoveIndex = 0;
    const lastMoveIndex = character.lastMoveIndex;
    if (movement === "static") {
      continue;
    } else {
      if (lastMoveIndex < movement.length - 1) {
        nextMoveIndex = lastMoveIndex + 1;
      }
      character.lastMoveIndex = nextMoveIndex;
    }
    const stepsToTake = movement[nextMoveIndex];
    character.xPos = stepsToTake[0];
    character.yPos = stepsToTake[1];
    character.facing = stepsToTake[2];
  }
}
