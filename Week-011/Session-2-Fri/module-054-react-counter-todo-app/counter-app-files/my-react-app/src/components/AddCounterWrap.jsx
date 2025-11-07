import AddButton from "./AddButton";
import AddDetails from "./AddDetails";

export default function AddCounter({ setDisplay, currDisplay, counters, setCounterData, idField, setIdField }) {
  //   const nameField = document.getElementById("name");
  //   const incrementField = document.getElementById("increment");

  //   const flipStatus = () => {
  //     setStatus(!addStatus);
  //   };
  //   const resetFields = () => {
  //     nameField.value = "";
  //     incrementField.value = "1";
  //   };
  //   const handleKeyDown = (event) => {
  //     if (event.key == "Enter") {
  //       addCounter();
  //       flipStatus();
  //     }
  //   };

  return (
    <div className="add-wrapper">
      {currDisplay ? (
        <AddDetails dHandler={setDisplay} currDisplay={currDisplay} counters={counters} addHandler={setCounterData} setIdValue={setIdField}/>
      ) : (
        <AddButton clickHandler={setDisplay} currDisplay={currDisplay} />
      )}
    </div>
  );
}
