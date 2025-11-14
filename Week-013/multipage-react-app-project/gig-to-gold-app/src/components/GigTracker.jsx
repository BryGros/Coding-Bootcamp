import { useState } from "react";
import GigCard from "./GigCard";

export default function GigTracker({ gigs }) {
  const [filter, setFilter] = useState("ALL");
  // Get the current year for filter
  const currentYear = new Date().getFullYear;

  const gigsToRender = (gigs, filter) => {
    let gigArray = [];
    for (const index in gigs) {
      const object = gigs[index];
      const dateObject = new Date(object.dateTime);
      const gigYear = dateObject.getFullYear();
      const investedAmt = object.invested;
      if (filter == "THISYEAR") {
        if (gigYear == currentYear) {
          gigArray.push(object);
        }
      } else if (filter == "INVESTED") {
        if (investedAmt != 0) {
          gigArray.push(object);
        }
      } else {
        gigArray.push(object);
      }
    }
    return gigArray;
  };

  const noGigs = gigs.length === 0;
  const noGigsToRender = (
    <div className="contain-wrap">
      <h2 className="no-gigs-h2">No gigs yet</h2>
      <p className="no-gigs-p">Create your first gig to start tracking!</p>
    </div>
  );
  const filteredGigs = gigsToRender(gigs, filter);
  const renderGigs = filteredGigs.map((object) => {
    return (
      <GigCard
        key={object.id}
        name={object.name}
        dateTime={object.dateTime}
        total={object.total}
        invested={object.invested}
      />
    );
  });
  return (
    <div className="gig-tracker-wrap">
      <div className="gig-track-header">
        <h1>Gig Tracker</h1>
        <button className="filter">All Gigs</button>
        <button className="filter">This Year's Gigs</button>{" "}
        <button className="filter">Gigs I've Invested Money From</button>
      </div>
      <div className="gig-cont-with-header">
        <div className="gig-cont-header">
          <h3>Gig Name</h3>
          <h3>Gig Date/Time</h3>
          <h3>Total Earned</h3>
          <h3>Invested Amount</h3>
        </div>
        <div className="gig-container">
          {noGigs ? noGigsToRender : renderGigs}
        </div>
      </div>
    </div>
  );
}
