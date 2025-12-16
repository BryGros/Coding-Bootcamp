import About from "./About";
import Lyrics from "./Lyrics";

export default function InfoPane({ loadedSong }) {
  return (
    <div className="info-pane-wrap">
      {loadedSong.about && <About loadedSong={loadedSong} />}
      {loadedSong.poem && <Lyrics loadedSong={loadedSong} />}
    </div>
  );
}
