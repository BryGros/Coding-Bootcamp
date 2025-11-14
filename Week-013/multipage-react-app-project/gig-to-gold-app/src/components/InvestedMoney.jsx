import DollarFormatter from "./DollarFormatter";

export default function InvestedMoney({ gigs }) {
  // pull from state

  // loop that checks and totals invested money from gig array
  const totalFunction = (gigObject) => {
    let bank = Number(0);
    for (const index in gigObject) {
      const object = gigObject[index];
      bank += Number(object.invested);
    }
    return bank;
  };

  const total = totalFunction(gigs).toFixed(2);

  return (
    <div className="sm-wrapper">
      <h1>Gig Money Invested</h1>
      <h2>This is the money you've put into an investment account so far:</h2>
      <div className="invested-total">
        <DollarFormatter number={total} />
      </div>
    </div>
  );
}
