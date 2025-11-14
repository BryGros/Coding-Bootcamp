import { useState } from "react";
import DollarFormatter from "./DollarFormatter";

export default function GrowthEstimate({ gigs }) {
  // years and returnRate useStates
  const [years, setYears] = useState(12);
  const [returnRate, setReturnRate] = useState(7);
  const [additionalMonthlyFunds, setAdditionalFunds] = useState(0);
  // calculate money invested from gigs to show as total (same as in InvestedMoney Component)
  const totalFunction = (gigObject) => {
    let bank = Number(0);
    for (const index in gigObject) {
      const object = gigObject[index];
      bank += Number(object.invested);
    }
    return bank;
  };
  const total = totalFunction(gigs);

  // Calculate estimate
  const calculateEstimate = (
    startingFunds,
    years,
    returnRate,
    additionalFunds
  ) => {
    console.log(
      `Starting funds: ${startingFunds}, years: ${years}, returnRate: ${returnRate}`
    );
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
    total,
    years,
    returnRate,
    additionalMonthlyFunds
  ).toFixed(2);

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
          <h2>Gig Money invested today:</h2>
          <div>
            <DollarFormatter number={total} />
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
                  total,
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
                  calculateEstimate(total, years, returnRate, e.target.value)
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
                  total,
                  years,
                  e.target.value,
                  additionalMonthlyFunds
                )
              );
            }}
          >
            <option value="5">conservative (5%)</option>
            <option value="7">average (7%)</option>
            <option value="9">high (9%)</option>
          </select>
        </div>
      </div>
      <div className="static-num-calc">
        <h2>Estimated value in {years} years:</h2>
        <div>
          <DollarFormatter number={estimate} />
        </div>
      </div>
    </div>
  );
}
