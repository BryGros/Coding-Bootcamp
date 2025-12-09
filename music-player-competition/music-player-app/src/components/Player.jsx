import Header from "./Header";
import InfoPane from "./InfoPane";
import NowPlaying from "./NowPlaying";
import TrackBar from "./TrackBar";

export default function Player({ loadedSong, setLoadedSong, tracks }) {
  return (
    <div className="player-wrap">
      <Header />
      <TrackBar
        loadedSong={loadedSong}
        tracks={tracks}
        setLoadedSong={setLoadedSong}
      />
      <NowPlaying loadedSong={loadedSong} />
      <InfoPane loadedSong={loadedSong} />
      <div className="copyright">All music © Bryan Grosbach</div>
    </div>
  );
}
