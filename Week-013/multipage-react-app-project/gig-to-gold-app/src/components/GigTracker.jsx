import { useState } from "react";
import GigCard from "./GigCard";

export default function GigTracker({ gigs }) {
  const [filter, setFilter] = useState("ALL");
  // Get the current year for filter
  const currentYear = new Date().getFullYear();
  let gridCount = 0;

  const handleFilterClick = (e) => {
    if (e.target.id == "invested-filter") {
      setFilter("INVESTED");
    } else if (e.target.id == "this-year-filter") {
      setFilter("THISYEAR");
    } else {
      setFilter("ALL");
    }
  };

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
          gridCount++;
        }
      } else if (filter == "INVESTED") {
        if (investedAmt != 0) {
          gigArray.push(object);
          gridCount++;
        }
      } else {
        gigArray.push(object);
        gridCount++;
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
        <h1>G2G Tracker</h1>
        <div className="filter-btn-wrap">
          <button
            id="all-filter"
            className={filter == "ALL" ? "filter-active" : "filter"}
            onClick={handleFilterClick}
          >
            All Gigs
          </button>
          <button
            id="this-year-filter"
            className={filter == "THISYEAR" ? "filter-active" : "filter"}
            onClick={handleFilterClick}
          >
            This Year's Gigs
          </button>{" "}
          <button
            id="invested-filter"
            className={filter == "INVESTED" ? "filter-active" : "filter"}
            onClick={handleFilterClick}
          >
            Gigs I've Invested Money From
          </button>
        </div>
      </div>
      <div className="gridcount">
        Gigs that meet the filter criteria: <strong>{gridCount}</strong>
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
