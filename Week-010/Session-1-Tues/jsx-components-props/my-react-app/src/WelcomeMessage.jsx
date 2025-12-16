export default function WelcomeMessage() {
  //standard js
  const user = "Sarah";

  //don't forget to wrap your returns with ()

  return (
    // whenever we have multiple elements in a component, we have to add this wrapper
    <>
      {/* jsx comments look like this*/}
      <h1>Hello, {user}</h1>
      <div>testing</div>
    </>
  );
}
