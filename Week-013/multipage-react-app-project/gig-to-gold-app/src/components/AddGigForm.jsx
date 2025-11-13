import { useState } from "react";

export default function AddGigForm({ gigs, addGig }) {
  // Field state maintenance
  const [gigName, setGigName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [gigTotal, setGigTotal] = useState("");
  const [gigInvested, setGigInvested] = useState("");

  // Handle Click function
  const handleClick = (e) => {
    e.preventDefault();
    // Change to useState for the fields (onChange will be set in the fields: = (e) => setUseState(e.target.value) )

    const newGig = {
      id: Date.now(),
      name: gigName,
      dateTime,
      total: gigTotal,
      invested: gigInvested,
    };
    addGig((currArray) => [newGig, ...currArray]);
    const newArray = [newGig, ...gigs];
    localStorage.setItem("gigs", JSON.stringify(newArray));
    setGigName("");
    setDateTime("");
    setGigTotal("");
    setGigInvested("");
  };

  return (
    <div className="form-wrapper">
      <h1>Add a Gig to your tracker!</h1>
      <h3>Gig name</h3>
      <input
        type="text"
        id="gig-name"
        value={gigName}
        onChange={(e) => setGigName(e.target.value)}
      />
      <h3>Gig Date/Time</h3>
      <input
        type="datetime-local"
        id="gig-date-time"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
      />
      <h3>Gig Total Earned (no $)</h3>
      <input
        type="number"
        id="gig-total"
        value={gigTotal}
        onChange={(e) => setGigTotal(e.target.value)}
      />
      <h3>Amount Invested (no $)</h3>
      <input
        type="number"
        id="gig-invested"
        value={gigInvested}
        onChange={(e) => setGigInvested(e.target.value)}
      />
      <button type="submit" id="add-gig-btn" onClick={handleClick}>
        Add Gig
      </button>
    </div>
  );
}
