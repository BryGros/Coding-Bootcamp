import AddButton from "./AddButton";
import AddDetails from "./AddDetails";

export default function AddCounter({
  setDisplay,
  currDisplay,
  counters,
  setCounterData,
  setIdField,
}) {
  return (
    <div className="add-wrapper">
      {currDisplay ? (
        <AddDetails
          dHandler={setDisplay}
          currDisplay={currDisplay}
          counters={counters}
          addHandler={setCounterData}
          setIdValue={setIdField}
        />
      ) : (
        <AddButton clickHandler={setDisplay} currDisplay={currDisplay} />
      )}
    </div>
  );
}
