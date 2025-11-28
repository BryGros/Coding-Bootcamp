export default function NowPlaying({ loadedSong }) {
  return (
    <div className="now-play-wrap">
      <div className="album-cover">
        <h1>{loadedSong.title}</h1>
        <h2>{loadedSong.playerSubtitle}</h2>
      </div>
      <audio controls src={loadedSong.src}>
        This file could not be loaded...
      </audio>
    </div>
  );
}
