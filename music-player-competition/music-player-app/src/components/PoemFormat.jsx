export default function PoemFormat({ poem }) {
  const poemArray = poem.split("BR/");
  return poemArray.map((line, index) => {
    return (
      <div key={index} className="line-wrap">
        <p className={index == 0 ? "title" : "line"}>{line}</p>
        <br />
      </div>
    );
  });
}
