import DollarFormatter from "./DollarFormatter";

export default function InvestedMoney({ total }) {
  return (
    <div className="sm-wrapper">
      <h1>Gig Money Invested</h1>
      <h2>
        This is the money you've marked as put into an investment account so
        far:
      </h2>
      <div className="invested-total">
        <DollarFormatter number={total} />
      </div>
    </div>
  );
}
