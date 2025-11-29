import About from "./About";
import Lyrics from "./Lyrics";

export default function InfoPane({ loadedSong }) {
  return (
    <div className="info-pane-wrap">
      <About loadedSong={loadedSong} />
      {loadedSong.poem && <Lyrics loadedSong={loadedSong} />}
    </div>
  );
}
