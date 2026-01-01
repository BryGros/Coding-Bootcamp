# Mongoose Project - Assessment Rubric

## Project Overview

This rubric evaluates the Mongoose Project based on MongoDB and Mongoose concepts covered in modules 083-085. Students will build a complete database-backed application demonstrating mastery of schemas, models, validation, relationships, population, and CRUD operations.

### What should I make?

Build something that interests you! Consider making a **blog platform**, **task manager**, **recipe collection**, **book library**, **movie watchlist**, or **any topic that grabs your interest**. The project only needs to meet the technical requirements to pass - the content and theme are entirely up to you.

---

## **Must Have (Required for Passing):**

### **Database Connection & Configuration**

- [x] **Environment Variables** - Uses dotenv for database connection string configuration
- [x] **Connection Module** - Separates database connection into config/database.js module
- [x] **Connection Error Handling** - Implements proper error handling for connection failures
- [x] **Connection Events** - Handles connection events (open, error, disconnected)
- [x] **Proper Exports** - Exports connection function using module.exports pattern

### **Schema & Model Design**

- [x] **Multiple Models** - Creates at least 3 different Mongoose models in separate files
- [x] **Proper Schema Definition** - Uses mongoose.Schema with appropriate data types for each field
- [x] **Field Validation** - Implements validation rules (required, minlength, maxlength, min, max, enum)
- [x] **Default Values** - Uses default values where appropriate
- [x] **Timestamps** - Enables timestamps option for createdAt and updatedAt fields
- [x] **Model Organization** - One model per file in models/ folder with proper naming

### **Data Relationships**

- [x] **ObjectId References** - Uses ObjectId references to relate models together
- [x] **One-to-Many Relationships** - Implements at least one one-to-many relationship
- [x] **Reference Configuration** - Properly configures ref property pointing to related model
- [x] **Multiple Relationships** - Demonstrates relationships between at least 3 different models

### **CRUD Operations**

- [x] **Create Operations** - Successfully creates documents for all models
- [x] **Read Operations** - Retrieves documents using find, findById, and query filters
- [x] **Update Operations** - Updates documents using save or update methods
- [x] **Delete Operations** - Removes documents using deleteMany or other delete methods
- [x] **Population** - Uses populate() to retrieve related documents in at least 2 queries

### **Data Seeding**

- [x] **Seed Script** - Creates separate seed.js file to populate database with sample data
- [x] **Clear Existing Data** - Clears collections before seeding to ensure clean state
- [x] **Related Sample Data** - Seeds data with proper relationships between models
- [x] **Seed Documentation** - Provides clear instructions for running seed script

### **Error Handling & Validation**

- [x] **Validation Errors** - Properly handles and displays validation error messages
- [x] **Connection Errors** - Catches and handles database connection errors
- [x] **Try/Catch Blocks** - Uses try/catch for asynchronous operations
- [x] **Helpful Error Messages** - Provides clear, actionable error messages for common issues

---

## **Could Have (Bonus Points):**

### **Enhanced Features**

- [ ] **Express API with MVC** - Creates RESTful API using Express with controllers/ and routes/ folders following MVC pattern
- [ ] **API Testing** - Includes Postman collection with test assertions for all endpoints
- [ ] **Complex Queries** - Implements advanced queries with sorting, filtering, and pagination
- [ ] **Virtual Properties** - Uses virtual properties for computed fields
- [ ] **Middleware Hooks** - Implements pre/post save hooks for custom logic
- [ ] **Custom Validators** - Creates custom validation functions beyond built-in validators
- [ ] **Indexes** - Adds database indexes for improved query performance
- [ ] **Aggregation Pipeline** - Uses aggregation for complex data analysis
- [ ] **Soft Delete** - Implements soft delete pattern instead of permanent deletion

---

## Submission Requirements

### **Technical Requirements:**

- [x] **Working Database Application** - Complete functional application with all core database features
- [x] **Proper File Structure** - Organized project with config/, models/, controllers/, and routes/ folders with proper separation of concerns
- [x] **MVC Architecture** - Follows Model-View-Controller pattern with models defining data, controllers containing business logic, and routes mapping endpoints
- [x] **Package Management** - Includes package.json with all required dependencies listed
- [x] **Environment Configuration** - Provides .env.example file with connection string template
- [x] **Git Ignore** - Includes .gitignore for node_modules/ and .env files

### **Data Model Requirements:**

- [x] **Well-Designed Schema** - Logical data structure with appropriate field types and relationships
- [x] **Validation Rules** - Meaningful validation that enforces data integrity
- [x] **Relationship Design** - Proper use of references vs embedding for data relationships
- [x] **Sample Data** - Sufficient seed data to demonstrate all relationships and features

### **Code Quality Requirements:**

- [x] **Clean Code** - Well-formatted, readable code with consistent naming conventions
- [x] **Proper Mongoose Patterns** - Correct schema definitions, model creation, and query methods
- [x] **Error Handling** - Graceful error handling for validation failures and connection issues
- [ ] **Documentation** - Clear README with setup instructions, data model explanation, and usage guide
- [x] **Comments** - Helpful comments explaining schema design decisions and complex logic

### **Functionality Requirements:**

- [x] **All Features Work** - Can successfully run seed script and main application without errors
- [x] **Population Works** - Related data is properly retrieved using populate()
- [x] **Validation Works** - Invalid data is properly rejected with clear error messages
- [x] **CRUD Complete** - All CRUD operations function correctly for each model

**Due Date:** By Session 38
**Submission Method:** Github Repo link on #projects channel
