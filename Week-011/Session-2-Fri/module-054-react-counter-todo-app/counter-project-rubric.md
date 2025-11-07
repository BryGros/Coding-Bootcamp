# React Multi-Counter Project - Assessment Rubric

## Project Overview

This rubric evaluates the React Multi-Counter Project based on React fundamentals, component architecture, and state management covered in modules 047-053. Students will build a counter application that allows users to create named counters with customizable increment values, demonstrating mastery of reusable components, props, state management, and user interactions.

Note: Its recommended to use a component library like https://react-bootstrap.netlify.app/docs/getting-started/introduction if you are not using tailwind for styling and want to get the styling up faster.

---

## **Must Have (Required for Passing):**

### **React Components & JSX**

- [x] **Functional Components** - Uses functional components throughout the application following proper naming conventions
- [x] **JSX Syntax** - Proper JSX syntax with correct JavaScript expression embedding and className usage
- [x] **Reusable Counter Component** - Creates a Counter component that can be reused for multiple counter instances
- [x] **Counter Label Component** - Creates a separate component for displaying counter names and values

### **Props System & Data Flow**

- [x] **Props Implementation** - Effectively passes data between parent and child components using props
- [x] **Props Destructuring** - Uses destructuring for cleaner prop handling in components
- [x] **Parent-to-Child Data Flow** - Demonstrates proper unidirectional data flow from parent to child
- [x] **Dynamic Props** - Counter components receive name, value, and increment amount as props

### **State Management with useState**

- [x] **useState Hook** - Proper implementation of useState hook for managing application state
- [x] **Counter State Array** - Manages an array of counter objects with id, name, value, and increment properties
- [x] **State Updates** - Correctly updates state using setter functions while maintaining immutability
- [x] **State Lifting** - Lifts counter state to appropriate parent component for sharing between components
- [x] **Multiple State Variables** - Manages form inputs and counter data with separate state variables

### **Event Handling & User Interaction**

- [x] **onClick Handlers** - Implements click event handlers for increment, decrement, and delete buttons
- [x] **onChange Handlers** - Handles form input changes for counter name and increment value inputs
- [x] **Form Submission** - Handles form submission for creating new counters with preventDefault()
- [x] **Event Handler Functions** - Uses arrow function syntax for event handlers and passes them as props
- [x] **State Updates on Events** - Updates component state based on user interactions (clicks, form inputs)

### **Form Handling & Input Control**

- [x] **Controlled Inputs** - Creates controlled form inputs for counter name and increment amount selection
- [x] **Text Input** - Implements text input for naming counters with state management
- [x] **Select/Number Input** - Provides input method for setting custom increment amounts (1, 5, 10, etc.)
- [x] **Form Reset** - Clears form inputs after successful counter creation
- [x] **Input Validation** - Prevents empty counter names and ensures positive increment values

### **Lists & Dynamic Rendering**

- [x] **Array Rendering** - Uses .map() to render arrays of counter components dynamically
- [x] **React Keys** - Uses unique, stable keys (counter IDs) for list items
- [x] **Dynamic Counter Creation** - Allows users to create new counters that appear in the list
- [x] **Empty State Handling** - Handles empty counter list with appropriate messaging or default state

### **Conditional Rendering**

- [x] **Show/Hide Elements** - Uses conditional rendering for form visibility or empty states

- [x] **Counter Display Logic** - Shows different content based on counter values or application state

---

## **Could Have (Bonus Points):**

### **Enhanced Features**

- [x] **Callback Props** - Passes event handler functions as props to child components
- [ ] **Data Persistence** - Saves counter data to localStorage for persistence across sessions
- [ ] **Counter Goals** - Implements target values or goals for counters with progress indicators
- [ ] **Professional Styling** - Modern, responsive CSS design with smooth animations and transitions
- [x] **Advanced Validation** - Comprehensive form validation with user feedback and error handling
- [x] **Component Composition** - Properly nests and composes components following single responsibility principle
- [ ] **Dynamic Button States** - Conditionally disables buttons or changes appearance based on state

---

## Submission Requirements

### **Technical Requirements:**

- [x] **Working React Application** - Complete functional counter app with all core features
- [x] **Component-Based Architecture** - Well-organized components following React best practices (single component per file, naming conventions, etc)
- [x] **Reusable Components** - Counter and label components that can be reused multiple times
- [x] **State Management** - Proper useState implementation managing counter data and form inputs
- [x] **User Interaction** - Full event handling for creating, updating, and managing counters

### **User Interface Requirements:**

- [x] **Counter Creation Form** - Input fields for counter name and increment amount selection
- [x] **Counter Display** - Clear display of counter name, current value, and increment amount
- [x] **Counter Controls** - Buttons for increment, decrement, reset, and delete functionality
- [x] **Responsive Layout** - Application works on desktop and mobile devices
- [x] **Visual Feedback** - Clear indication of user actions and current state

### **Code Quality Requirements:**

- [x] **Clean Code** - Well-formatted, readable code with consistent naming conventions
- [x] **Proper JSX** - Correct JSX syntax with appropriate key props and className usage
- [x] **Component Organization** - Logical component structure with single responsibility principle
- [x] **Documentation** - Clear README with setup instructions and feature descriptions

**Due Date:** Nov 1
**Submission Method:** Github Repo link on #projects channel
