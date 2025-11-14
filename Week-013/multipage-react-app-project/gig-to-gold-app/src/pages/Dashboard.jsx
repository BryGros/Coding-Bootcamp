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

  const totalFunction = (gigObjects) => {
    const localStorageGigs = JSON.parse(localStorage.getItem("gigs"));
    if (localStorageGigs.length > 0) {
      let bank = Number(0);
      for (const index in gigObjects) {
        const object = gigObjects[index];
        bank += Number(object.invested);
      }
      return bank;
    } else {
      return 0;
    }
  };

  const initialTotal = totalFunction(gigArray);
  
  const [investedTotal, setInvestedTotal] = useState(initialTotal);

  return (
    // wrapper
    <div className="dash-wrapper">
      {/* Money saved component (called bank?) */}
      <InvestedMoney total={investedTotal} />
      {/* Add Gig to tracker component */}
      <AddGigForm
        gigs={gigArray}
        addGig={setGigArray}
        setInvested={setInvestedTotal}
      />
      {/* Money Growth component */}
      <GrowthEstimate investedTotal={investedTotal} />
      {/* Gig Tracker component*/}
      <GigTracker gigs={gigArray} />
    </div>
  );
}
