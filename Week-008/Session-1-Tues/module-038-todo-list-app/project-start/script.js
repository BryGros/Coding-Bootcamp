// Your Todo List App implementation will go here!

const todos = [];
let currentFilter = "all";

// Create new To-Do object
const addToDo = (task) => {
  const newObject = {
    id: Date.now(), // Use Date.now() or similar
    text: task, // The todo description
    completed: false, // Boolean completion status
    createdAt: Date(), // Optional: when todo was created
  };
  todos.push(newObject);
  console.log(todos);
  // Clear input box value
  createListItem(newObject);
  toDoText.value = "";
};
// Override Default Submit button behavior (refresh)
const overrideDefault = (event) => {
  event.preventDefault();
  addToDo(toDoText.value);
};

// Create New List Elements from todos objects array
const createListItem = (object) => {
  const { id, text } = object;
  const ToDoList = document.getElementById("todo-list");
  const newToDoItem = document.createElement("li");
  newToDoItem.classList.add("todo-item");
  newToDoItem.setAttribute("id", id);
  newToDoItem.setAttribute("completed", false);
  newToDoItem.innerHTML = `
  <input type='checkbox' class='todo-checkbox' />
  <div class='todo-text'>${text}</div>
  <div class='todo-actions'>
    <button class='edit-btn'>Edit</button>
    <button class='delete-btn'>Delete</button>
  </div>`;
  ToDoList.appendChild(newToDoItem);
};

// Delete To-Do object where the "delete" button was clicked

// Event Listener for submit button
const submitBtn = document.querySelector(".add-btn");
submitBtn.addEventListener("click", overrideDefault);
const toDoText = document.getElementById("todo-input");

// <input type="text" value="${text}" class="todo-edit-input" readonly />;
