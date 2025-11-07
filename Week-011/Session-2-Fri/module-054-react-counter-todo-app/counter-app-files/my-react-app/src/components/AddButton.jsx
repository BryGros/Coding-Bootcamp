export default function AddButton({ currDisplay, clickHandler }) {
  const handleClick = () => clickHandler(!currDisplay);

  return (
    <button className="add-counter-btn" onClick={handleClick}>
      + Add New Counter
    </button>
  );
}
