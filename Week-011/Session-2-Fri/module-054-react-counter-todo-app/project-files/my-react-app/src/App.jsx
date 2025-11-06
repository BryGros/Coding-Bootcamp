import "./App.css";
import AddCounter from "./components/AddCounter";
import ClearCounter from "./components/ClearCounter";
import CounterContainer from "./components/CounterContainer";
import { useState } from "react";

function App() {
  const [totalCount, adjustCount] = useState(0);
  const applyAdjustment = (adjustment) => adjustCount((t) => t + adjustment);
  const resetTotal = () => adjustCount(0);
  return (
    <>
      <AddCounter />
      <ClearCounter total={totalCount} reset={resetTotal} />
      <CounterContainer adjustCounter={applyAdjustment} />
    </>
  );
}

export default App;
