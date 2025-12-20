# General Approach is to Start Slow

- Commit often
- Use the completed-app/Shopping-Cart-API.postman_collection.json for testing

## Planning Phase

### 0. Choose Your Project
Choose a project that uses Mongoose effectively and demonstrates your skills:
- **What data relationships does this project need?** (One-to-many, many-to-many)
- **What models will I create?** (Users, Products, Orders, Posts, Comments, etc.)
- **What CRUD operations are needed?** (Create, Read, Update, Delete)
- **Will this have an API?** (Express routes with controllers for frontend)
- **What validations are important?** (Required fields, min/max values, enum options)

**Project Ideas:**
- **Shopping Cart** - Users add products to cart (see completed-app/ example)

### 1. Create Data Model Diagram
Plan your database structure:
- **Excalidraw or paper** for database diagrams
- **Draw.io** for more formal ERD (Entity Relationship Diagram)

**What to include:**
- All collections (models)
- Fields for each model
- Data types (String, Number, Date, Boolean, ObjectId)
- Relationships (which models reference each other)
- Validation rules (required, min, max, enum)

**Example for Shopping Cart:**
```
Users Collection:
- name (String, required, 2-50 characters)
- email (String, required, unique, lowercase)
- address (String, optional, max 200 characters)
- createdAt, updatedAt (timestamps)

Products Collection:
- name (String, required, 3-100 characters)
- description (String, required, min 10 characters)
- price (Number, required, min 0)
- category (String, enum: Electronics, Clothing, Books, Home, Sports)
- inStock (Boolean, default true)
- createdAt, updatedAt (timestamps)

CartItems Collection:
- user (ObjectId, ref: User, required)
- product (ObjectId, ref: Product, required)
- quantity (Number, required, min 1, max 99)
- createdAt, updatedAt (timestamps)
```

### 2. Slicing Step
Break down the project into actionable tasks

**Project Organization:**
- Plan tasks using Trello, GitHub Projects, or a simple checklist
- Break each feature into small steps

**Model Planning Template for Each Model:**
- Model name and purpose
- Required fields and validation rules
- Relationships to other models
- Sample seed data

**Definition of Done for Each Model:**
- Schema defined with proper types
- Validation rules implemented
- Model exported correctly
- Controller functions created
- Routes mapped to controllers
- CRUD operations tested
- Model committed to version control

**Definition of Done for the Project:**
- All models created and tested
- MVC architecture implemented (models/, controllers/, routes/)
- Seed data populates database successfully
- All CRUD operations work
- Relationships and population work correctly
- Error handling implemented (try/catch in controllers)
- Code is organized (config, models, controllers, routes folders)
- README with setup instructions
- API tests pass (Postman collection if included)

### 3. Choose Technologies
Database and tools:
- **MongoDB** - Local or MongoDB Atlas (cloud)
- **Mongoose** - ODM for Node.js
- **Express** - Web framework for API
- **dotenv** - Environment variables
- **MongoDB Compass** - Visual database tool
- **Postman** (optional) - API testing
- **Newman** (optional) - Command-line API testing

## Implementation Phase

### Development Steps

1. **Set up project structure**
   ```
   mkdir my-mongoose-project
   cd my-mongoose-project
   npm init -y
   npm install mongoose dotenv express
   ```

2. **Create MVC folder structure**
   ```
   my-mongoose-project/
   ├── config/
   │   └── database.js
   ├── models/
   │   ├── User.js
   │   ├── Product.js
   │   └── CartItem.js
   ├── controllers/
   │   ├── userController.js
   │   ├── productController.js
   │   └── cartItemController.js
   ├── routes/
   │   ├── userRoutes.js
   │   ├── productRoutes.js
   │   └── cartItemRoutes.js
   ├── .env
   ├── .env.example
   ├── .gitignore
   ├── seed.js
   └── server.js
   ```

3. **Set up database connection** (config/database.js)
   - Create reusable connection function
   - Handle connection events
   - Export connection function
   - Test connection

4. **Create first model** (Start with the simplest model)
   - Define schema with basic fields
   - Add simple validation
   - Enable timestamps
   - Export model
   - Test by creating a document

5. **Create controller for first model**
   - Create getAllItems function
   - Create getItemById function
   - Create createItem function
   - Create updateItem function
   - Create deleteItem function
   - Add try/catch error handling

6. **Create routes for first model**
   - Import controller
   - Create Express router
   - Map GET, POST, PUT, DELETE routes to controller functions
   - Export router

7. **Set up server.js**
   - Import Express and routes
   - Set up middleware (express.json())
   - Mount routes (app.use('/api/resource', routes))
   - Start server
   - Test with Postman

8. **Commit frequently** - After each model, controller, and route set is created and tested

9. **Add remaining models, controllers, and routes** - Build one resource at a time
   - Define schema
   - Add validation rules
   - Add references (ObjectId) where needed
   - Create controller functions
   - Map routes
   - Test each resource independently

10. **Create seed file** (seed.js)
    - Import all models
    - Connect to database
    - Clear existing data (deleteMany)
    - Create sample data for all models
    - Create related data (link users to products, etc.)
    - Test relationships work
    - Verify with MongoDB Compass

11. **Test CRUD operations**
    - Create documents via API
    - Read with filters
    - Update documents
    - Delete documents
    - Test population for related data

12. **Add error handling**
    - Try/catch blocks in all controllers
    - Validation error handling
    - Connection error handling
    - 404 handling for not found resources
    - Send appropriate HTTP status codes

13. **Touch ups** - Polish and refine
    - Add comments explaining logic
    - Clean up console logs
    - Verify all relationships work
    - Test edge cases
    - Update README with API documentation

## Testing Your Project

### Manual Tests to Perform:

**Model Tests:**
- Create a document successfully
- Try to create invalid data (should fail validation)
- Read documents with filters
- Update documents
- Delete documents

**Controller Tests:**
- All five CRUD operations work
- Error handling returns proper status codes
- Validation errors are caught
- Population works for related data

**Route Tests:**
- GET /api/resource returns all items
- GET /api/resource/:id returns single item
- POST /api/resource creates new item
- PUT /api/resource/:id updates item
- DELETE /api/resource/:id deletes item

**Relationship Tests:**
- Create related documents (e.g., user and their cart items)
- Populate references successfully
- Query across relationships
- Verify foreign key constraints work

**Error Handling Tests:**
- Try connection with wrong URL
- Try creating document with missing required field
- Try creating document with value out of range
- Try creating duplicate unique field
- Try getting non-existent ID

## Common Challenges and Solutions

### Challenge: Connection Issues
**Problem:** Cannot connect to MongoDB

**Solution:**
- Verify MongoDB is running (`brew services list` on macOS)
- Check connection string in .env file
- Verify port is 27017
- Test with MongoDB Compass first

### Challenge: Validation Errors
**Problem:** Documents won't save due to validation

**Solution:**
- Check error message carefully
- Verify required fields are provided
- Check min/max ranges for numbers
- Check enum values match exactly
- Test with valid data first

### Challenge: References Not Working
**Problem:** ObjectId references not populating

**Solution:**
- Verify ref value matches model name exactly
- Check ObjectId is valid format
- Ensure referenced document exists
- Use correct field name in populate()
- Call populate() on the query

### Challenge: Routes Not Found
**Problem:** API returns 404 for valid routes

**Solution:**
- Verify route mounting in server.js
- Check route path matches exactly
- Verify HTTP method (GET, POST, PUT, DELETE)
- Test route order (specific routes before general)

### Challenge: Controller Errors
**Problem:** Server crashes on request

**Solution:**
- Add try/catch to all async functions
- Return proper error responses
- Check that model is imported correctly
- Verify controller functions are exported

## Project Submission Checklist

Before submitting your project:

```
Database Structure:
[ ] All models created with proper schemas
[ ] Validation rules implemented
[ ] Relationships defined with ObjectId references
[ ] Timestamps enabled on models

MVC Architecture:
[ ] models/ folder with one file per model
[ ] controllers/ folder with business logic
[ ] routes/ folder with endpoint definitions
[ ] server.js with route mounting
[ ] Separation of concerns maintained

Code Organization:
[ ] config/database.js exists and works
[ ] .env file (not committed to git)
[ ] .env.example with template
[ ] .gitignore includes node_modules and .env

Functionality:
[ ] Can connect to MongoDB successfully
[ ] Seed script populates database with related data
[ ] All CRUD operations work for each model
[ ] Population retrieves related data
[ ] Error handling implemented in controllers
[ ] API returns appropriate status codes

Documentation:
[ ] README with setup instructions
[ ] API endpoints documented
[ ] Comments explain complex logic
[ ] Example .env file (.env.example)

Testing:
[ ] Manually tested all API endpoints
[ ] Verified data in MongoDB Compass
[ ] Tested error scenarios
[ ] All relationships work correctly
[ ] Postman collection (optional bonus)
```

## Extra Credit Ideas

If you finish early and want to challenge yourself:

1. **Add Postman Collection** - Create tests for all endpoints with assertions
2. **Implement middleware** - Pre-save hooks, virtual properties
3. **Add more complex queries** - Aggregation pipelines, advanced filtering
4. **Implement soft delete** - Mark documents as deleted instead of removing
5. **Add custom validators** - Beyond built-in Mongoose validators
6. **Create indexes** - Optimize query performance
7. **Add pagination** - Limit and skip for large datasets
8. **Implement search** - Find documents by text search

## Resources

- Mongoose Documentation: https://mongoosejs.com/docs/
- MongoDB Manual: https://docs.mongodb.com/manual/
- Express Documentation: https://expressjs.com/
- Postman Learning Center: https://learning.postman.com/

## Tips for Success

1. **Start simple** - Get one model working before adding complexity
2. **Follow MVC pattern** - Keep models, controllers, and routes separate
3. **Test often** - Don't wait until everything is built to test
4. **Use MongoDB Compass** - Visual feedback helps catch mistakes
5. **Read error messages** - They usually tell you exactly what's wrong
6. **Commit frequently** - Save your progress after each completed feature
7. **Use the example** - Reference completed-app/ folder for guidance
8. **Ask for help** - If stuck for more than 30 minutes, ask questions

Good luck building your Mongoose / Express project!
