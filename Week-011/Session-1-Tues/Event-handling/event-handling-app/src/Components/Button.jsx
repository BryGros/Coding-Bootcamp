export default function Button() {
  // Handler Function Expression
  const handleClick = () => {
    alert("You clicked me, Why?!?!?!?!?!?");
    console.log("This is working!");
  };

  // onClick Property
  // function or arrow function
  // we are not executing the function, so we only pass the refernce here
  // handleClick vs handleClick() <- Doing the latter causes the code to run once only and run immediately
  return <button onClick={handleClick}>Click Me</button>;
}
