export default function NowPlaying({ loadedSong }) {
  const songLoaded = (
    <div className="now-play-wrap">
      <div className="album-cover">
        <h1>{loadedSong.title}</h1>
        <h2>{loadedSong.playerSubtitle}</h2>
      </div>
      <audio controls controlsList="nodownload" autoPlay src={loadedSong.src}>
        This file could not be loaded...
      </audio>
    </div>
  );

  const notLoaded = (
    <div className="now-play-wrap">
      <div className="no-song-loaded">
        No song loaded. Click a song button above to listen!
      </div>
    </div>
  );

  return loadedSong.src ? songLoaded : notLoaded;
}
