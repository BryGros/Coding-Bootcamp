import PoemFormat from "./PoemFormat";

export default function Lyrics({ loadedSong }) {
  return (
    <div className="lyrics-wrap">
      <h1 className="poem-head">Poem:</h1>
      <div className="poem-wrap">
        <PoemFormat poem={loadedSong.poem} />
      </div>
    </div>
  );
}
