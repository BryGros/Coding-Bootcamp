import CounterCard from "./CounterCard";

export default function CounterContainer({
  counters,
  setCounterData,
  adjustTotal,
}) {
  const noCards = counters.length === 0;
  const noCardsToRender = (
    <div className="contain-wrap">
      <h2 className="no-counters-h2">No counters yet</h2>
      <p className="no-counters-p">
        Create your first counter to start tracking!
      </p>
    </div>
  );
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
