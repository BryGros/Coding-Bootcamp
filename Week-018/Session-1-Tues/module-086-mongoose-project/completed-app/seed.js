// Seed Database with Sample Shopping Cart Data
const connectDatabase = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await CartItem.deleteMany({});
    console.log('Existing data cleared');

    // Create users
    console.log('Creating users...');
    const users = await User.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        address: '123 Main St, Springfield, IL 62701'
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        address: '456 Oak Ave, Chicago, IL 60601'
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        address: '789 Pine Rd, Naperville, IL 60540'
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Create products
    console.log('Creating products...');
    const products = await Product.create([
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 79.99,
        category: 'Electronics',
        inStock: true
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 89.99,
        category: 'Sports',
        inStock: true
      },
      {
        name: 'JavaScript Book',
        description: 'Comprehensive guide to modern JavaScript development',
        price: 39.99,
        category: 'Books',
        inStock: true
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe',
        price: 59.99,
        category: 'Home',
        inStock: true
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors',
        price: 19.99,
        category: 'Clothing',
        inStock: true
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap',
        price: 29.99,
        category: 'Sports',
        inStock: false
      }
    ]);
    console.log(`Created ${products.length} products`);

    // Create cart items
    console.log('Creating cart items...');
    const cartItems = await CartItem.create([
      {
        user: users[0]._id,
        product: products[0]._id,
        quantity: 1
      },
      {
        user: users[0]._id,
        product: products[2]._id,
        quantity: 2
      },
      {
        user: users[1]._id,
        product: products[1]._id,
        quantity: 1
      },
      {
        user: users[1]._id,
        product: products[3]._id,
        quantity: 1
      },
      {
        user: users[2]._id,
        product: products[4]._id,
        quantity: 3
      }
    ]);
    console.log(`Created ${cartItems.length} cart items`);

    console.log('');
    console.log('Database seeded successfully!');
    console.log('Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Cart Items: ${cartItems.length}`);

    // Close the database connection
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

// Connect to database and run seed
connectDatabase();
seedDatabase();
