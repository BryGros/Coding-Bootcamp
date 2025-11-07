import CounterCard from "./CounterCard";

export default function CounterContainer({ counters, setCounterData, adjustTotal }) {
  const noCards = counters.length === 0;
  const noCardsToRender = <div className="containWrap"></div>;
  const cardRender = counters.map((object) => {
    return (
      <CounterCard
        key={object.id}
        adjustCounters={setCounterData}
        objectData={object}
        adjustTotal={adjustTotal}
      />
    );
  });

  return (
    <div className="containWrap">{noCards ? noCardsToRender : cardRender}</div>
  );
}
