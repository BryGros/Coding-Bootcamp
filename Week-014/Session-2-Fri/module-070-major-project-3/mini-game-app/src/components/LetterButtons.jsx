import createButtonArray from "../helper-functions/createButtonArray";
export default function LatterButtons({ randomWord }) {
  const buttonArray = createButtonArray(randomWord);
  return (
    <div className="letter-button-wrap">
      {buttonArray.map((letter) => {
        return (
          <button className="letter-button" value={letter} id={letter}>
            {letter}
          </button>
        );
      })}
    </div>
  );
}
