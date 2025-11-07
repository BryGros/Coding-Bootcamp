export default function AddDetails() {
  
  
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
        <button
          id="create"
          onClick={() => {
            addCounter();
            flipStatus();
          }}
        >
          Create Counter
        </button>
        <button
          id="cancel"
          onClick={() => {
            flipStatus();
            resetFields();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
