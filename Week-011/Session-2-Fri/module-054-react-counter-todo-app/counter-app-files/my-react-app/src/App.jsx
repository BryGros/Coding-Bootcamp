import { useState } from "react";
import AddCounterWrap from "./components/AddCounterWrap";
import CounterTotal from "./components/CounterTotal";
import CounterWrap from "./components/CounterWrap";

function App() {
  // For determining when our new counter button or details component should show
  const [displayDeets, setDisplay] = useState(false);
  // Track the counter objects
  const [counterArray, adjustCounters] = useState([]);
  // Track the totals of the counter objects
  const [runningTotal, adjustTotal] = useState(0);
  const [idField, setField] = useState("");

  return (
    <>
      <AddCounterWrap
        setDisplay={setDisplay}
        currDisplay={displayDeets}
        counters={counterArray}
        setCounterData={adjustCounters}
        setIdField={setField}
      />
      <CounterTotal
        currTotal={runningTotal}
        adjustTotal={adjustTotal}
        adjustCounters={adjustCounters}
      />
      <CounterWrap
        counters={counterArray}
        setCounterData={adjustCounters}
        adjustTotal={adjustTotal}
      />
    </>
  );
}

export default App;
