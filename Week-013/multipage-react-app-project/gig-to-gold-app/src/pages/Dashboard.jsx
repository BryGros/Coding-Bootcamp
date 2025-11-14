import { useEffect, useState } from "react";
import InvestedMoney from "../components/InvestedMoney";
import AddGigForm from "../components/AddGigForm";
import GrowthEstimate from "../components/GrowthEstimate";
import GigTracker from "../components/GigTracker";

export default function Dashboard() {
  const initialGigs = () => {
    const localStorageGigs = JSON.parse(localStorage.getItem("gigs"));
    if (localStorageGigs != null) {
      return localStorageGigs;
    } else {
      return [];
    }
  };

  const [gigArray, setGigArray] = useState(initialGigs);
  // set from localStorage to simulate database

  // Whenever gigArray changes, update localStorage
  useEffect(() => {
    localStorage.setItem("gigs", JSON.stringify(gigArray));
  }, [gigArray]);

  return (
    // wrapper
    <div className="dash-wrapper">
      {/* Money saved component (called bank?) */}
      <InvestedMoney gigs={gigArray} />
      {/* Add Gig to tracker component */}
      <AddGigForm gigs={gigArray} addGig={setGigArray} />
      {/* Money Growth component */}
      <GrowthEstimate gigs={gigArray}/>
      {/* Gig Tracker component*/}
      <GigTracker gigs={gigArray} />
    </div>
  );
}
