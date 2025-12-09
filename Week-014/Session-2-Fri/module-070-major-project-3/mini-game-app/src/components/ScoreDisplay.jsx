export default function ScoreDisplay({ scoreToPass, levelScore }) {
  return (
    <div>
      <h2>Level Score: {levelScore} </h2>
      <h2>Score to Pass: {scoreToPass}</h2>
    </div>
  );
}
