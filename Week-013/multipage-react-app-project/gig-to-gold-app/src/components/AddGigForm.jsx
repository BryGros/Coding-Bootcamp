import { useState } from "react";

export default function AddGigForm({ gigs, addGig, setInvested }) {
  // Field state maintenance
  const [gigName, setGigName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [gigTotal, setGigTotal] = useState("");
  const [gigInvested, setGigInvested] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [throwError, setThrowError] = useState(false);

  // Handle Click function
  const handleClick = (e) => {
    e.preventDefault();
    // check the user filled out the form completely
    if (
      gigName == "" ||
      dateTime == "" ||
      gigTotal == "" ||
      gigInvested == ""
    ) {
      setErrorMsg("You must fill out the entire form!");
      setThrowError(true);
      return;
    } else {
      const newGig = {
        id: Date.now(),
        name: gigName,
        dateTime,
        total: gigTotal,
        invested: gigInvested,
      };
      addGig((currArray) => [newGig, ...currArray]);
      const newArray = [newGig, ...gigs];
      let bank = Number(0);
      for (const index in newArray) {
        const object = newArray[index];
        bank += Number(object.invested);
      }
      setInvested(bank);
    }
    setGigName("");
    setDateTime("");
    setGigTotal("");
    setGigInvested("");
    setThrowError(false);
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-head">Add a Gig to your tracker!</h1>
      <div className="error">{throwError ? errorMsg : ""}</div>
      <h3 className="name-label">Gig name:</h3>
      <input
        type="text"
        id="gig-name"
        placeholder="Enter a description for the gig"
        value={gigName}
        onChange={(e) => setGigName(e.target.value)}
      />
      <h3 className="date-time-label">Gig Date/Time:</h3>
      <input
        type="datetime-local"
        id="gig-date-time"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <h3 className="total-earn-label">Gig Total Earned:</h3>
      <span className="dollar-total">$</span>
      <input
        type="number"
        id="gig-total"
        value={gigTotal}
        onChange={(e) => setGigTotal(e.target.value)}
        placeholder="150.00"
      />
      <h3 className="invested-label">Amount Invested:</h3>
      <span className="dollar-invested">$</span>
      <input
        type="number"
        id="gig-invested"
        value={gigInvested}
        onChange={(e) => setGigInvested(e.target.value)}
        placeholder="25.00"
      />
      <button type="submit" id="add-gig-btn" onClick={handleClick}>
        Add Gig
      </button>
    </div>
  );
}
