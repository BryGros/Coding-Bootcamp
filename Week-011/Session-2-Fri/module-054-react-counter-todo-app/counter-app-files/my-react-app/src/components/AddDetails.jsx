export default function AddDetails({
  dHandler,
  currDisplay,
  counters,
  addHandler,
  setIdValue,
}) {
  let errorThrown = false;

  const addToArray = () => {
    // reset if the error has been thrown
    errorThrown = false;
    // grab fields to get data for new object
    const nameField = document.getElementById("name");
    const incrementField = document.getElementById("increment");
    // create new object
    const newObject = {
      id: nameField.value,
      // Initial index setting, resets further down based on position in array
      counterIndex: 0,
      increment: incrementField.value,
      // Initial count setting, adjusts via other functions
      count: 0,
    };
    if (nameField.value == "") {
      errorThrown = true;
      alert("You must give your counter a name!");
      return;
    }
    setIdValue(newObject.id);
    for (const index in counters) {
      const object = counters[index];
      if (object.id === newObject.id) {
        errorThrown = true;
        alert("You already have a counter with that name!");
        return;
      }
    }
    // Add new object to array
    addHandler((currArray) => [...currArray, newObject]);
    // Reset indexes in the object for each counter based on their array index (in case middle counters are deleted)
    addHandler((currArray) => {
      let setIndexNumber = 0;
      const newArray = [];
      for (const index in currArray) {
        const object = currArray[index];
        object.counterIndex = setIndexNumber;
        newArray.push(object);
        setIndexNumber++;
      }
      return newArray;
    });
  };

  const displayHandler = () => {
    dHandler(!currDisplay);
    errorThrown = false;
  };

  const handleSubmit = () => {
    addToArray();
    if (errorThrown === false) {
      displayHandler();
    }
  };

  const handleCancel = () => displayHandler(!currDisplay);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addToArray();
      if (errorThrown === false) {
        displayHandler();
      }
    }
  };

  return (
    <div className="create-counter-wrap">
      <h1>Create New Counter</h1>
      <h2>Counter Name:</h2>
      <input
        type="text"
        id="name"
        placeholder="Enter counter name"
        autoFocus
        onKeyDown={handleKeyDown}
      ></input>
      <h2>Increment Amount:</h2>
      <input
        type="number"
        id="increment"
        min="1"
        defaultValue="1"
        onKeyDown={handleKeyDown}
      />
      <div className="create-btns">
        <button id="create" onClick={handleSubmit}>
          Create Counter
        </button>
        <button id="cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
