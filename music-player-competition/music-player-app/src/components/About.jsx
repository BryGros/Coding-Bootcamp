export default function About({ loadedSong }) {
  return (
    <div className="about-wrap">
      <h1 className="about-head">About:</h1>
      <p className="about-text">{loadedSong.about}</p>
    </div>
  );
}
