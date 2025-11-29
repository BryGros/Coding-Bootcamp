import Header from "./Header";
import InfoPane from "./InfoPane";
import NowPlaying from "./NowPlaying";
import TrackBar from "./TrackBar";

export default function Player({ loadedSong, setLoadedSong, tracks }) {
  return (
    <div className="player-wrap">
      <Header />
      <NowPlaying loadedSong={loadedSong} />
      <InfoPane loadedSong={loadedSong} />
      <TrackBar
        loadedSong={loadedSong}
        tracks={tracks}
        setLoadedSong={setLoadedSong}
      />
      <div className="copyright">All music © Bryan Grosbach</div>
    </div>
  );
}
