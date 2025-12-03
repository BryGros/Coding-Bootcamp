import AddCounter from "./components/AddCounter";
import ClearCounter from "./components/ClearCounter";
import CounterContainer from "./components/CounterContainer";
import { useState } from "react";

function App() {
  const [totalCount, adjustCount] = useState(0);
  const [counterArray, adjustCounterArray] = useState([]);

  const applyTotalAdjustment = (adjustment) =>
    adjustCount((t) => t + adjustment);

  const resetTotal = () => {
    adjustCount(0);
    for (const index in counterArray) {
      const counter = counterArray[index];
      counter.count = 0;
    }
  };
  const addCounterClickHandler = () => {
    const nameField = document.getElementById("name");
    const incrementField = document.getElementById("increment");
    setValue(nameField.value);
    const newCounterObject = {
      id: nameField.value,
      increment: incrementField.value,
      count: 0,
    };
    if (counterArray.length == 0) {
      adjustCounterArray((currentArray) => [...currentArray, newCounterObject]);
    } else {
      for (const index in counterArray) {
        const counterObject = counterArray[index];
        if (counterObject.name === newCounterObject.name) {
          alert("You already have a counter with that name!");
          return;
        }
      }
      adjustCounterArray((currentArray) => [...currentArray, newCounterObject]);
    }
    nameField.value = "";
    incrementField.value = "1";
  };

  function deleteCounterClickHandler(event) {
    const cardToDelete = event.target.parentElement.parentElement;
    const counterName = cardToDelete.id;
    let matchIndex;
    let deletedCardCount;
    for (const index in counterArray) {
      const counterObject = counterArray[index];
      if (counterObject.name == counterName) {
        matchIndex = index;
        deletedCardCount = counterObject.count;
      }
    }
    const newArray = counterArray.filter((item, index) => index != matchIndex);
    adjustCounterArray(() => newArray);
    adjustCount((t) => t - deletedCardCount);
  }
  return (
    <>
      <AddCounter addCounter={addCounterClickHandler} />
      <ClearCounter total={totalCount} reset={resetTotal} />
      <CounterContainer
        adjustTotalCounter={applyTotalAdjustment}
        deleteCounter={deleteCounterClickHandler}
        array={counterArray}
      />
    </>
  );
}

export default App;
