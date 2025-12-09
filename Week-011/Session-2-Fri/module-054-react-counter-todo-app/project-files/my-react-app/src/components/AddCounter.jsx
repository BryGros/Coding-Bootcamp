import { useState } from "react";
import AddButton from "./AddButton";
import AddDetails from "./AddDetails";

export default function AddCounter({ addCounter }) {
  const [addStatus, setStatus] = useState(false);
  const nameField = document.getElementById("name");
  const incrementField = document.getElementById("increment");

  const flipStatus = () => {
    setStatus(!addStatus);
  };
  const resetFields = () => {
    nameField.value = "";
    incrementField.value = "1";
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      addCounter();
      flipStatus();
    }
  };

  return (
    <div className="add-wrapper">
      {addStatus ? <AddDetails /> : <AddButton onClick={flipStatus} />}
    </div>
  );
}
