export default function TrackBar({ loadedSong, setLoadedSong, tracks }) {
  return (
    <div className="track-bar">
      {tracks.map((object) => {
        return (
          <button
            className={object.id == loadedSong.id ? "active" : "inactive"}
            key={object.id}
            value={object.src}
            onClick={() => setLoadedSong(object)}
          >
            <div className="btn-title-genre">
              <h2>{object.title}</h2>
              <h3>{object.genre}</h3>
            </div>
          </button>
        );
      })}
    </div>
  );
}
