# Breakout Practice: Map MERN Todo App Architecture

## Activity Overview
Work in pairs or small groups to design the complete architecture for a MERN stack Todo application. You will map out all components, their relationships, and data flow.

## Your Task (20 minutes)

On a whiteboard, paper, or in Excalidraw, create an architecture diagram that shows:

Separate diagrams for each component flow

different diagrams for each of these flows

Todolist frontend > getAllTodos() backend > todos collection on the database

Add todo on frontend etc

1. **Frontend (React)** - Draw boxes for:
   - Main components (App, TodoList, TodoItem, AddTodoForm)
   - State management approach (Context API, useState, or Redux)
   - What data each component needs

2. **Backend (Express)** - Draw boxes for:
   - API routes (GET, POST, PUT, DELETE endpoints)
   - Controllers that handle business logic
   - Middleware (authentication, validation, error handling)

3. **Database (MongoDB)** - Draw:
   - Collections (what data structure?)
   - Fields in the Todo document (title, completed, userId, etc.)

4. **Connections** - Draw arrows showing:
   - How React components call the API
   - How Express routes connect to controllers
   - How controllers interact with MongoDB
   - Where authentication happens in the flow

5. **Data Flow Example** - Trace one complete flow:
   - User clicks "Add Todo" button → What happens at each layer?

## Bonus Challenges
- Add user authentication flow to your diagram
- Show where errors might occur and how they're handled
- Include where you would add caching or optimization

## Deliverable
Take a photo or export your diagram to share with the class. Be ready to explain the teams thought process
