import bblogo from "../assets/bb-no-background.svg";

export default function Header() {
  return (
    <div className="head-wrap">
      <img src={bblogo} alt="BigBrook Music Logo" />
      <h1 className="header-h1">The Original Music of Bryan Grosbach</h1>
      <a href="www.bryangrosbach.com">Discover More</a>
    </div>
  );
}
