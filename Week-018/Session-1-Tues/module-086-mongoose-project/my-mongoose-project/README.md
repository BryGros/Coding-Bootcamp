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
npm run start
```

Server runs at http://localhost:3000

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
GET    /api/cartitems
GET    /api/cartitems/:id
POST   /api/cartitems
PUT    /api/cartitems/:id
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
