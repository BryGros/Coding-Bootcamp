export default function CounterCard({
  adjustCounters,
  objectData,
  adjustTotal,
}) {
  // const updateTotal = (event) => {
  //   // Get card wrapper div
  //   const cardWrapper = event.target.parentElement.parentElement;
  //   // Get index of counter clicked
  //   const clickedCounterIndex = cardWrapper.getAttribute("counter-index");
  //   // Get adjustment button clicked
  //   const adjustmentBtn = event.target;
  //   // set adjustment to occur
  //   const adjustment = Number(adjustmentBtn.textContent);
  //   adjustTotal((currTotal) => currTotal + adjustment);
  // };

  const handleClick = (event) => {
    // Get card wrapper div
    const cardWrapper = event.target.parentElement.parentElement;
    // Get index of counter clicked
    const clickedCounterIndex = cardWrapper.getAttribute("counter-index");
    // Get adjustment button clicked
    const adjustmentBtn = event.target;
    //
    const buttonClicked = adjustmentBtn.textContent;
    // set adjustment to occur
    const adjustment = Number(buttonClicked);
    // adjust the count in the object to force re-render of cards with new count
    adjustCounters((currArray) => {
      const newArray = [];
      // Run different operations depending on which button was clicked
      if (buttonClicked === "Reset") {
        let newTotalCount = 0;
        for (const index in currArray) {
          const object = currArray[index];
          if (object.counterIndex == clickedCounterIndex) {
            // Set object count to 0
            object.count = 0;
            // Push to new array
            newArray.push(object);
          } else {
            // Push to new array (object not changed)
            newArray.push(object);
            // Add count to newTotal count
            newTotalCount += object.count;
            // Reset Total Count to newCount
          }
          adjustTotal(newTotalCount);
        }
      } else if (buttonClicked === "Delete") {
        let newTotalCount = 0;
        for (const index in currArray) {
          const object = currArray[index];
          let newIndex = 0;
          // find changed object in old array and update before pushing it to new array
          if (object.counterIndex != clickedCounterIndex) {
            object.counterindex = newIndex;
            newArray.push(object);
            newTotalCount += object.count;
            newIndex++;
          }
        }
        adjustTotal(newTotalCount);
      } else {
        let newTotalCount = 0;
        // build new array
        for (const index in currArray) {
          const object = currArray[index];
          // find changed object in old array and update before pushing it to new array
          if (object.counterIndex == clickedCounterIndex) {
            object.count += adjustment;
            // Push to new array
            newArray.push(object);
            // Update newTotal count
            newTotalCount += object.count;
          } else {
            // Push to new array (object not changed)
            newArray.push(object);
            // Update newTotal count
            newTotalCount += object.count;
          }
        }
        // Update total count
        adjustTotal(newTotalCount);
      }
      // set state to new array
      return newArray;
    });
  };

  // const handleAdjustment = (event) => {
  //   changeCount(event);
  //   updateTotal(event);
  // };

  //   const add = () => {
  //     setCounter(count + Number(object.increment));
  //     updateTotal(+object.increment);
  //   };
  //   const minus = () => {
  //     setCounter(count - object.increment);
  //     updateTotal(-object.increment);
  //   };
  //   const reset = () => {
  //     setCounter((count) => {
  //       updateTotal(-count);
  //       return 0;
  //     });
  //   };
  //   object.count = count;

  return (
    <div className="card-wrapper" counter-index={objectData.counterIndex}>
      <h1 className="counter-name">{objectData.id}</h1>
      <p className="counter-number">
        {objectData.count}
        <span className="number-text">times</span>
      </p>
      <div className="btn-cont">
        <button className="minus" onClick={handleClick}>
          -{objectData.increment}
        </button>
        <button className="plus" onClick={handleClick}>
          +{objectData.increment}
        </button>
        <button className="reset" onClick={handleClick}>
          Reset
        </button>
        <button className="delete" onClick={handleClick}>
          Delete
        </button>
      </div>
    </div>
  );
}
