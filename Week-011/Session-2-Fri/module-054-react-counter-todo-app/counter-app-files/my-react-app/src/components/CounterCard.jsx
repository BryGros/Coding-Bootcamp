export default function CounterCard() {
  //   const add = () => {
  //     setCounter(count + Number(object.increment));
  //     updateTotal(+object.increment);
  //   };
  //   const minus = () => {
  //     setCounter(count - object.increment);
  //     updateTotal(-object.increment);
  //   };
  //   const reset = () => {
  //     setCounter((count) => {
  //       updateTotal(-count);
  //       return 0;
  //     });
  //   };
  //   object.count = count;

  return (
    <div className="card-wrapper">
      <h1 className="counter-name">Name</h1>
      <p className="counter-number">
        0<span className="number-text">times</span>
      </p>
      <div className="btn-cont">
        <button className="minus">-1</button>
        <button className="plus">+1</button>
        <button className="reset">Reset</button>
        <button className="delete">Delete</button>
      </div>
    </div>
  );
}
