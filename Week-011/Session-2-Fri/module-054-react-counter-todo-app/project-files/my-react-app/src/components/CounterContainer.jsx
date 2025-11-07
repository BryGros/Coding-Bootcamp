import CounterCard from "./CounterCard";

export default function CounterContainer({
  adjustTotalCounter,
  array,
  deleteCounter,
}) {
  const noCards = array.length === 0;
  const noCardRender = <div className="containWrap"></div>;
  const cardRender = array.map((object) => {
    return (
      <CounterCard
        key={object.id}
        updateTotal={adjustTotalCounter}
        object={object}
        deleteClick={deleteCounter}
      />
    );
  });

  return (
    <div className="containWrap">{noCards ? noCardRender : cardRender}</div>
  );
}
