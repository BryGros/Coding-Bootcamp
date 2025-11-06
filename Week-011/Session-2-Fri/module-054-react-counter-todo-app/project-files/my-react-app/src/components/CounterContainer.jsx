import CounterCard from "./CounterCard";

export default function CounterContainer({ adjustCounter }) {
  return (
    <div className="containWrap">
      <CounterCard updateTotal={adjustCounter} />
      <CounterCard updateTotal={adjustCounter} />
      <CounterCard updateTotal={adjustCounter} />
    </div>
  );
}
