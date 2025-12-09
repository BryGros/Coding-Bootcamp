import { Link } from "react-router";

export default function Home() {
  const playPath = "/play";
  return (
    <div className="component-wrap">
      <h1>Welcome to Passcode Cracker!</h1>
      <Link className="play-btn" to={playPath}>
        Play
      </Link>
    </div>
  );
}
