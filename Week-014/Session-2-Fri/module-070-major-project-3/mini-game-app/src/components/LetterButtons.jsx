import createButtonArray from "../helper-functions/createButtonArray";

export default function LetterButtons({
  buttonArray,
  setShowError,
  setShowWordFound,
  setGuessWord,
}) {
  const handleLetterClick = (event) => {
    setShowError(false);
    setShowWordFound(false);
    const letterClicked = event.target.value;
    setGuessWord((prev) => prev + letterClicked);
  };
  return (
    <div className="letter-button-wrap">
      {buttonArray.map((letter) => {
        return (
          <button
            className="letter-button"
            value={letter}
            id={letter}
            onClick={handleLetterClick}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
