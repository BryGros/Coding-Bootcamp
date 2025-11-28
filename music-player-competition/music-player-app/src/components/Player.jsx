import NowPlaying from "./NowPlaying";
import TrackBar from "./TrackBar";

export default function Player({ loadedSong, setLoadedSong, tracks }) {
  return (
    <div className="player-wrap">
      <NowPlaying loadedSong={loadedSong} />
      <TrackBar
        loadedSong={loadedSong}
        tracks={tracks}
        setLoadedSong={setLoadedSong}
      />
    </div>
  );
}
