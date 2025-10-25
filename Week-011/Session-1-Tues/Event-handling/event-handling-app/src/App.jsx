import "./App.css";
import Button from "./Components/Button";
import Counter from "./Components/Counter";
import GreetingForm from "./Components/GreetingForm";
import ContactForm from "./Components/ContactForm";
import ItemList from "./Components/ItemList";
import EventExplorer from "./Components/EventExplorer";

function App() {
  return (
    <>
      <h1>Testing out Event Handlers</h1>
      {/* Simple onClick Handler with a button */}
      <Button />
      {/* useState Example with onClick */}
      <Counter />
      {/* onChange event on input */}
      <GreetingForm />
      {/* onSubmit with Form with preventDefault*/}
      <ContactForm />
      {/* event Handlers as Props */}
      <ItemList />
      {/* Accessing Event Data */}
      <EventExplorer />
    </>
  );
}

export default App;
