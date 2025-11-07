import { useState } from "react";
import AddCounterWrap from "./components/AddCounterWrap";
import CounterTotal from "./components/CounterTotal";
import CounterWrap from "./components/CounterWrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AddCounterWrap />
      <CounterTotal />
      <CounterWrap />
    </>
  );
}

export default App;
