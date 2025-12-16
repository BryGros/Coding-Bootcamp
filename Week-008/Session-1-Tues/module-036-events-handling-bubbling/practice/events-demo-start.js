// Event Handling & Bubbling Practice - Starter Version

const output = document.querySelector("#output");

function log(message) {
  output.innerHTML += message + "<br>";
  output.scrollTop = output.scrollHeight;
}

// TODO: Event Handler Basics
// Add event listeners using addEventListener()

// TODO: Add click event listener to btn1
// Click events fire when a user presses and releases a mouse button on an element
// Use addEventListener() method to attach the event

const button1 = document.querySelector("#btn1");
button1.addEventListener("click", (event) => {
  log("This event happened - button 1");
});
// TODO: Add mouseover event listener to btn2
// Mouseover events fire when the mouse pointer enters an element
// This is useful for hover effects and interactive feedback

const button2 = document.querySelector("#btn2");
button2.addEventListener("mouseover", (event) => {
  log("Button2 event happened");
});

// TODO: Add keydown event listener to text input
// Keydown events fire when a key is pressed down (before it's released)
// Useful for capturing user input in real-time
const textInput = document.querySelector("#text-input");
textInput.addEventListener("keydown", (event) => {
  log("Key pressed when typing in the input");
});

// TODO: Event Object
// Access event object and use event.target

// TODO: Add event listener that shows which button was clicked
// Use event.target to identify which specific element triggered the event
// Event delegation allows handling events on multiple child elements from a parent
// Check if the clicked element is a button using event.target.tagName
const whichBttnClick = document.querySelector("#container");
whichBttnClick.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    log(
      `Clicked the "${event.target.textContent}" button, with an ID of ${event.target.id}`
    );
  }
});

// TODO: Event preventDefault
// Prevent form submission

// TODO: Add form submit event listener with preventDefault
// Submit events fire when a form is submitted
// preventDefault() stops the default browser behavior (page refresh)
// This allows you to handle form data with JavaScript instead
const preventFormSubmit = document.querySelector("#demo-form");
preventFormSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  log("Submit prevented")
});

// TODO: Event Bubbling and stopPropagation
// Demonstrate event bubbling

// TODO: Add event listeners to show bubbling
// Event bubbling means events travel up from child to parent elements
// Add click listeners to both container and box to see bubbling in action
// Use stopPropagation() to prevent the event from bubbling up

// TODO: Event Delegation
// Add new buttons dynamically

let buttonCount = 3;

// TODO: Add event listener to "Add New Button"
// This demonstrates creating new elements dynamically
// Use createElement() to create new button elements
// Use appendChild() to add them to the DOM

// TODO: Remove Event Listener
// Demonstrate removeEventListener()

function removableHandler() {
  log("Removable handler called!");
}

// TODO: Add removable event listener
// Attach the removableHandler function to the remove button
// Use a named function (not anonymous) so it can be removed later

// TODO: Add another listener to remove the first one
// Add a double-click event listener that removes the single-click listener
// This shows how removeEventListener() works with named functions
// Anonymous functions cannot be removed because you can't reference them

log("Event handling demo ready - complete the TODO items!");
