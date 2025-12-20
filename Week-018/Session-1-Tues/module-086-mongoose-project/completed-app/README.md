# Shopping Cart API - Mongoose Project

A RESTful API for managing users, products, and shopping carts using Express, MongoDB, and Mongoose.

## Quick Start

### 1. Start MongoDB
**macOS:** `brew services start mongodb-community`
**Windows:** `net start MongoDB`

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env File
```
MONGODB_URI=mongodb://localhost:27017/shopping_cart_db
PORT=3000
```

### 4. Seed Database
```bash
npm run seed
```
Creates 3 users, 6 products, and 5 cart items with relationships.

### 5. Start Server
```bash
npm start
```
Server runs at http://localhost:3000

## Testing

### Run Tests
**Terminal 1:** `npm start`
**Terminal 2:** `npm test`

The Postman collection includes 47 test assertions that verify:
- CRUD operations for all models
- Validation rules
- Population of related data
- Error handling

### Build Your Own Tests
Import `Shopping-Cart-API.postman_collection.json` into Postman to see test examples and build your own requests.

## Project Structure

```
config/
  database.js           # MongoDB connection setup
models/
  User.js              # Customer schema with validation
  Product.js           # Inventory schema with categories
  CartItem.js          # Shopping cart with user/product refs
controllers/
  userController.js    # User CRUD operations
  productController.js # Product CRUD operations
  cartItemController.js # Cart CRUD with population
routes/
  userRoutes.js        # User endpoint definitions
  productRoutes.js     # Product endpoint definitions
  cartItemRoutes.js    # Cart endpoint definitions
server.js              # Express app with route mounting
seed.js                # Sample data creation
```

**MVC Architecture:**
- Models define data structure and validation
- Controllers contain business logic
- Routes map endpoints to controllers
- Config handles database connection

## API Endpoints

**Users**
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

**Products**
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

**Cart Items**
```
GET    /api/cart-items
GET    /api/users/:userId/cart-items
POST   /api/cart-items
PUT    /api/cart-items/:id
DELETE /api/cart-items/:id
```

## Seeding

Run `npm run seed` to:
1. Clear all existing data
2. Create 3 users with unique emails
3. Create 6 products across different categories
4. Create 5 cart items linking users to products

Sample data demonstrates:
- One-to-many relationships
- Population of references
- Validation rules

## Common Errors

**MongoDB not running**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: `brew services start mongodb-community` or `net start MongoDB`

**Validation error**
```
Product validation failed: price: Price cannot be negative
```
Solution: Check all required fields have valid values

**Duplicate email**
```
E11000 duplicate key error
```
Solution: Use a unique email address

**Port in use**
```
listen EADDRINUSE :::3000
```
Solution: Change PORT in .env or stop other terminals
