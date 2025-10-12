// Your Todo List App implementation will go here!

const todos = [];
let currentFilter = "all";

const toDoList = document.getElementById("todo-list");
const toDoText = document.getElementById("todo-input");
const submitBtn = document.querySelector(".add-btn");

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
  toDoList.innerHTML = "";
  todos.forEach((object) => {
    const { id, text, completed } = object;
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (completed) {
      li.classList.add("completed");
    }
    li.setAttribute("id", id);
    li.innerHTML = `
  <input type='checkbox' class='todo-checkbox' />
  <div class='todo-text'>${text}</div>
  <div class='todo-actions'>
    <button class='edit-btn'>Edit</button>
    <button class='delete-btn'>Delete</button>
  </div>`;
    toDoList.appendChild(li);
  });
};

// Init
renderList();

// Override Default Submit button behavior (page refresh) and run add function
const overrideDefault = (event) => {
  event.preventDefault();
  addToDo(toDoText.value);
};

// Delete To-Do object where the "delete" button was clicked

// Event Listener for submit button
submitBtn.addEventListener("click", overrideDefault);

// Event Listener and updates when user interacts with todo item
toDoList.addEventListener("click", (event) => {
  // Checkbox checked or unchecked
  if (event.target.classList.contains("todo-checkbox")) {
    const li = event.target.closest(".todo-item");
    // Toggle "completed" class
    li.classList.toggle("completed");
    // Change object data
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == li.id && todos[i].completed == false) {
        todos[i].completed = true;
      } else if (todos[i].id == li.id) {
        todos[i].completed = false;
      }
    }
    // Delete Button
  } else if (event.target.classList.contains("delete-btn")) {
    // Change object data
    const li = event.target.parentElement.parentElement;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == li.id) {
        todos.splice(i, 1);
      }
      renderList();
    }
    // Update todo-item innerHTML to todo-edit-input
  } else if (event.target.classList.contains("edit-btn")) {
    const li = event.target.parentElement.parentElement;
    const div = li.querySelector(".todo-text");
    const currTextVal = div.textContent;
    li.innerHTML = `
    <input type='checkbox' class='todo-checkbox' />
    <input type='text' class='todo-edit-input' value='${currTextVal}' />
    `;
  }
});

// <input type="text" value="${text}" class="todo-edit-input" readonly />;
