export default function createLeaderBoard(currLeaderBoard, newGameObject) {
  let newLeaderBoard = [...currLeaderBoard, newGameObject];
  newLeaderBoard.sort((a, b) => b.score - a.score);
  newLeaderBoard.slice(0, 10);
  return newLeaderBoard;
}
