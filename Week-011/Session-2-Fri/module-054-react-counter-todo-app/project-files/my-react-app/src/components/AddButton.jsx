export default function AddButton({ onClick }) {
  return (
    <button className="add-counter-btn" onClick={onClick}>
      + Add New Counter
    </button>
  );
}
