import DollarFormatter from "./DollarFormatter";

export default function GrowthEstimate({
  investedTotal,
  years,
  setYears,
  returnRate,
  setReturnRate,
  additionalMonthlyFunds,
  setAdditionalFunds,
  estimate,
}) {
  return (
    <div className="return-wrapper">
      <h1>Growth Calculator</h1>
      <p>
        How might your money grow over the years? Use the calculator below to
        see an estimate!
      </p>
      <div className="calc-field-wrapper">
        <div className="static-num-calc">
          <h2>
            Estimated value of in {years} years with a {returnRate}% return:
          </h2>
          <div>
            <DollarFormatter number={estimate} />
          </div>
        </div>
        <div className="entry-wrap">
          <h2>Select how many years your funds will grow</h2>
          <div className="years-in-account">{years} years</div>
          <input
            type="range"
            id="years-slider"
            list="markers"
            min="3"
            max="24"
            step="3"
            value={years}
            onChange={(e) => {
              setYears(e.target.value);
            }}
          />
          <datalist id="markers">
            <option value="3"></option>
            <option value="6"></option>
            <option value="9"></option>
            <option value="12"></option>
            <option value="15"></option>
            <option value="18"></option>
            <option value="21"></option>
            <option value="24"></option>
          </datalist>
        </div>
        <div className="entry-wrap">
          <h2>
            Enter how much additional money you'll think you'll invest each
            month from gigs during this timeframe:
          </h2>
          <div>
            <span className="dollar-additional">$</span>
            <input
              type="number"
              id="additional-funds"
              value={additionalMonthlyFunds}
              onChange={(e) => {
                setAdditionalFunds(e.target.value);
              }}
              placeholder="25.00"
            />
          </div>
        </div>
        <div className="entry-wrap">
          <h2>Select a return rate:</h2>
          <select
            id="return-dropdown"
            value={returnRate}
            onChange={(e) => {
              setReturnRate(e.target.value);
            }}
          >
            <option value="5">Conservative (5%)</option>
            <option value="7">Average (7%)</option>
            <option value="9">High (9%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
