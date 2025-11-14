import { useState } from "react";
import DollarFormatter from "./DollarFormatter";

export default function GrowthEstimate({ investedTotal }) {
  // years and returnRate useStates
  const [years, setYears] = useState(12);
  const [returnRate, setReturnRate] = useState(7);
  const [additionalMonthlyFunds, setAdditionalFunds] = useState(0);

  // Calculate estimate
  const calculateEstimate = (
    startingFunds,
    years,
    returnRate,
    additionalFunds
  ) => {
    let year = 1;
    let addedYearlyFunds = additionalFunds * 12;
    let total = startingFunds;
    while (year <= Number(years)) {
      total *= Number(returnRate) / 100 + 1;
      total += Number(addedYearlyFunds);
      year++;
    }
    return total;
  };

  const initialEstimate = calculateEstimate(
    investedTotal,
    years,
    returnRate,
    additionalMonthlyFunds
  );

  // estimate useState
  const [estimate, setEstimate] = useState(initialEstimate);

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
            Estimated value of ${investedTotal} in {years} years with a{" "}
            {returnRate}% return
            {additionalMonthlyFunds != "0"
              ? " and additional funds each month"
              : ""}
            :
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
              setEstimate(
                calculateEstimate(
                  investedTotal,
                  e.target.value,
                  returnRate,
                  additionalMonthlyFunds
                )
              );
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
                setEstimate(
                  calculateEstimate(
                    investedTotal,
                    years,
                    returnRate,
                    e.target.value
                  )
                );
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
              setEstimate(
                calculateEstimate(
                  investedTotal,
                  years,
                  e.target.value,
                  additionalMonthlyFunds
                )
              );
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
