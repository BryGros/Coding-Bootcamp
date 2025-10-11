// Your Todo List App implementation will go here!

const todos = [];
let currentFilter = "all";
const toDoList = document.getElementById("todo-list");
const toDoText = document.getElementById("todo-input");

// Create new To-Do
const addToDo = (task) => {
  // Add to object array
  const newObject = {
    id: Date.now(), // Use Date.now() or similar
    text: task, // The todo description
    completed: false, // Boolean completion status
    createdAt: Date(), // Optional: when todo was created
  };
  todos.push(newObject);
  // Render the todos
  renderList();
  // Clear input box value
  toDoText.value = "";
};

// Render the todos as HTML elements from todos objects array
const renderList = () => {
  clearList();
  todos.forEach((object) => {
    const { id, text, completed } = object;
    const newToDoItem = document.createElement("li");
    if (completed) {
      newToDoItem.classList.add("todo-item completed");
    } else {
      newToDoItem.classList.add("todo-item");
    }
    newToDoItem.setAttribute("id", id);
    newToDoItem.innerHTML = `
  <input type='checkbox' class='todo-checkbox' />
  <div class='todo-text'>${text}</div>
  <div class='todo-actions'>
    <button class='edit-btn'>Edit</button>
    <button class='delete-btn'>Delete</button>
  </div>`;
    toDoList.appendChild(newToDoItem);
  });
};

// Clear the todo list elements
const clearList = () => {
  toDoList.innerHTML = "";
};

// Override Default Submit button behavior (page refresh) and run add function
const overrideDefault = (event) => {
  event.preventDefault();
  addToDo(toDoText.value);
};

// Set item to complete
const setToComplete = (event) => {
  const checkBox = document.querySelector(".todo-checkbox");
  if (this.checked) {
    todos.forEach((object) => {});
  }
};

// Delete To-Do object where the "delete" button was clicked

// Event Listener for submit button
const submitBtn = document.querySelector(".add-btn");
submitBtn.addEventListener("click", overrideDefault);

// Event Listener for todo item checkbox
const submitBtn = document.querySelector(".todo-checkbox");
submitBtn.addEventListener("click", setToComplete);

// <input type="text" value="${text}" class="todo-edit-input" readonly />;
