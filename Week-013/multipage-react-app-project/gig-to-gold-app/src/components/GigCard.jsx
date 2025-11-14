import DollarFormatter from "./DollarFormatter";

export default function GigCard({ id, name, dateTime, total, invested }) {
  return (
    <div className="gig-wrapper">
      <input type="hidden" value={id} />
      <h3 className="gig-card-name">{name}</h3>
      <h3 className="gig-card-date-time">{dateTime}</h3>
      <div className="gig-card-total">
        <DollarFormatter number={total} />
      </div>
      <div className="gig-card-invested">
        <DollarFormatter number={invested} />
      </div>
    </div>
  );
}
