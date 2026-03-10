const connectToDatabase = require("./config/database");
const User = require("./models/User");
const Product = require("./models/Products");
const CartItem = require("./models/CartItem");

const seedDatabase = async () => {
  try {
    console.log("Starting to seed database");
    // Clear existing data
    console.log("Clearing existing database data");
    await User.deleteMany();
    await Product.deleteMany();
    await CartItem.deleteMany();
    console.log("Existing database data cleared");
    // Create Users
    console.log("Creating Users...");
    const users = await User.create([
      {
        name: "Harry Potter",
        email: "thechosen1@hogwarts.edu",
        address:
          "Under the stairs, Number Four, Privet Drive, Little Whinging, Surrey",
      },
      {
        name: "Ron Weasley",
        email: "keeperboy@hogwarts.edu",
        address:
          "The large goofy house at the end of the lane, Redhead Drive, Little Whinging, Surrey",
      },
      {
        name: "Hermione Granger",
        email: "leviosaw@hogwarts.edu",
        address: "123 Muggle Lane, Dentists Lane, London",
      },
    ]);
    console.log(`${users.length} users created`);
    // Create Products
    console.log("Creating Products...");
    const products = await Product.create([
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 79.99,
        category: "Electronics",
        inStock: true,
      },
      {
        name: "Running Shoes",
        description: "Comfortable running shoes for all terrains",
        price: 89.99,
        category: "Sports",
        inStock: true,
      },
      {
        name: "JavaScript Book",
        description: "Comprehensive guide to modern JavaScript development",
        price: 39.99,
        category: "Books",
        inStock: true,
      },
      {
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe",
        price: 59.99,
        category: "Home",
        inStock: true,
      },
      {
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 19.99,
        category: "Clothing",
        inStock: true,
      },
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat with carrying strap",
        price: 29.99,
        category: "Sports",
        inStock: false,
      },
    ]);
    console.log(`${products.length} products created`);
    // Create Cart Items
    console.log("Creating Cart Items");
    const cartItems = await CartItem.create([
      {
        user: users[0]._id,
        product: products[0]._id,
        quantity: 1,
      },
      {
        user: users[0]._id,
        product: products[2]._id,
        quantity: 2,
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        quantity: 1,
      },
      {
        user: users[1]._id,
        product: products[3]._id,
        quantity: 1,
      },
      {
        user: users[2]._id,
        product: products[4]._id,
        quantity: 3,
      },
    ]);
    console.log(`${cartItems.length} Cart Items created`);
    console.log("Database Succesfully Seeded");
    process.exit(0);
  } catch (error) {
    console.log("An error has occured: ", error);
    process.exit(1);
  }
};

connectToDatabase();
seedDatabase();
