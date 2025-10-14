// Your Todo List App implementation will go here!
const todos = [];
let currentFilter = "all";
let localString;

const toDoList = document.getElementById("todo-list");
const toDoText = document.getElementById("todo-input");
const submitBtn = document.querySelector(".add-btn");
const clearBtn = document.querySelector(".clear-btn");

// Initial actions (helps push localStorage data to html page)
const pullFromLocal = JSON.parse(localString);
todos.push(pullFromLocal);
renderList("all");

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
  // Save to local storage
  saveToLocal();
  // Render the todos li elements
  renderList();
  // Update count
  calculateCount();
  // Clear input box value
  toDoText.value = "";
};

// Render the todos as HTML elements from todos objects array
const renderList = (filter) => {
  // First clear out the li elements from the ul element
  toDoList.innerHTML = "";
  // Create a new li element for every object in the todos array
  // If filter is "all"
  if (filter === "all") {
    todos.forEach((object) => {
      // Object destructuring
      const { id, text, completed } = object;
      // li element creation and id/class setting
      const li = document.createElement("li");
      li.classList.add("todo-item");
      if (completed) {
        li.classList.add("completed");
      }
      li.setAttribute("id", id);
      // Add li element internal elements
      li.innerHTML = `
      <input type='checkbox' class='todo-checkbox' />
      <div class='todo-text'>${text}</div>
      <div class='todo-actions'>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
      </div>`;
      // Attach the newly created li to the ul element
      toDoList.appendChild(li);
    });
  } else if (filter === "completed") {
    todos.forEach((object) => {
      // Object destructuring
      const { id, text, completed } = object;
      // li element creation and id/class setting
      if (completed) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.classList.add("completed");
        li.setAttribute("id", id);
        // Add li element internal elements
        li.innerHTML = `
      <input type='checkbox' class='todo-checkbox' />
      <div class='todo-text'>${text}</div>
      <div class='todo-actions'>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
      </div>`;
        // Attach the newly created li to the ul element
        toDoList.appendChild(li);
      }
    });
  } else {
    todos.forEach((object) => {
      // Object destructuring
      const { id, text, completed } = object;
      // li element creation and id/class setting
      if (!completed) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.setAttribute("id", id);
        // Add li element internal elements
        li.innerHTML = `
      <input type='checkbox' class='todo-checkbox' />
      <div class='todo-text'>${text}</div>
      <div class='todo-actions'>
        <button class='edit-btn'>Edit</button>
        <button class='delete-btn'>Delete</button>
      </div>`;
        // Attach the newly created li to the ul element
        toDoList.appendChild(li);
      }
    });
  }
};

// Override Default Submit button behavior (page refresh) and run add to-do function
const overrideDefault = (event) => {
  event.preventDefault();
  addToDo(toDoText.value);
};

// Event Listener for submit button
submitBtn.addEventListener("click", overrideDefault);

// Event Listener and updates when user interacts with todo li element - put listener on parent ul element instead since they don't work on elements added via the DOM
toDoList.addEventListener("click", (event) => {
  // Checkbox checked or unchecked
  if (event.target.classList.contains("todo-checkbox")) {
    const li = event.target.closest(".todo-item");
    // Toggle "completed" class
    li.classList.toggle("completed");
    // Update completed key in object where the id matches
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == li.id && todos[i].completed == false) {
        todos[i].completed = true;
      } else if (todos[i].id == li.id) {
        todos[i].completed = false;
      }
    }
    // Render list again, in case the checked/unchecked item no longer fits the active filter
    renderList(currentFilter);
    // Update counter
    calculateCount();
    // Delete Button
  } else if (event.target.classList.contains("delete-btn")) {
    // Remove object from array where the id matches
    const li = event.target.parentElement.parentElement;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id == li.id) {
        todos.splice(i, 1);
      }
      // Render li elements for each object in the to-do arrays
      renderList();
      // Update counter
      calculateCount();
    }
    // Update todo-item innerHTML to show the todo-edit-input field
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

// Event Listener for Enter key and re-rendering to-do with new value
toDoList.addEventListener("keypress", (event) => {
  const keyPressed = event.key;
  const li = event.target.parentElement;
  const inputField = li.querySelector(".todo-edit-input");
  if (
    event.target.classList.contains("todo-edit-input") &&
    keyPressed == "Enter"
  ) {
    const currInputVal = inputField.value;
    li.innerHTML = `<input type='checkbox' class='todo-checkbox' />
    <div class='todo-text'>${currInputVal}</div>
    <div class='todo-actions'>
      <button class='edit-btn'>Edit</button>
      <button class='delete-btn'>Delete</button>
    </div>`;
  }
});

// Update current filter when user clicks a filter button
// Select all filter buttons
const filterBtns = document.querySelectorAll(".filter-btn");
// Event listener on all filter buttons
filterBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Clear active class on all buttons
    filterBtns.forEach((button) => {
      button.classList.remove("active");
    });
    // Add active class to clicked button
    button.classList.add("active");
    filterClicked = event.target.dataset.filter;
    currentFilter = filterClicked;
    // Render li for every li element that meets the filter criteria
    renderList(currentFilter);
  });
});

// Handle count of tasks that are incomplete
const calculateCount = () => {
  let stillToDo = 0;
  const totalCount = todos.length;
  const totalText = document.querySelector("#todo-count");
  todos.forEach((object) => {
    const { completed } = object;
    if (!completed) {
      stillToDo++;
    }
  });
  if (totalCount === 0) {
    totalText.innerText = "You have no to-dos in your list";
  } else if (stillToDo === 0) {
    totalText.innerText = "You have no more to-dos! Congrats!";
  } else if (totalCount === 1) {
    totalText.innerText = `${stillToDo} of ${totalCount} task remains`;
  } else {
    totalText.innerText = `${stillToDo} of ${totalCount} tasks remain`;
  }
};

// Clear completed tasks when user clicks the "clear completed" button
clearBtn.addEventListener("click", () => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].completed) {
      todos.splice(i, 1);
      renderList(currentFilter);
      calculateCount();
    }
  }
});

const saveToLocal = () => {
  localString = JSON.stringify(todos);
};
