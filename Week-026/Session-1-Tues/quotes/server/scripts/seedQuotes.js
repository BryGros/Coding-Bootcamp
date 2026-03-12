require('dotenv').config();
const mongoose = require('mongoose');
const Quote = require('../models/Quote');

// Fun and motivational quotes for developers
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "programming"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "programming"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "programming"
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    category: "programming"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
    category: "motivation"
  },
  {
    text: "The function of good software is to make the complex appear to be simple.",
    author: "Grady Booch",
    category: "programming"
  },
  {
    text: "It's not a bug. It's an undocumented feature.",
    author: "Anonymous Developer",
    category: "humor"
  },
  {
    text: "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
    author: "Muhammad Waseem",
    category: "humor"
  },
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "motivation"
  },
  {
    text: "Your best and wisest refuge from all troubles is in your science.",
    author: "Ada Lovelace",
    category: "motivation"
  },
  {
    text: "I never am really satisfied that I understand anything; because, understand it well as I may, my comprehension can only be an infinitesimal fraction of all I want to understand about the many connections and relations which occur to me…",
    author: "Ada Lovelace",
    category: "programming"
  },
  {
    text: "To me programming is more than an important practical art. It is also a gigantic undertaking in the foundations of knowledge.",
    author: "Grace Hopper",
    category: "programming"
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Ellen Ullman",
    category: "motivation"
  },
  {
    text: "Making AI more sensitive to the full scope of human thought is no simple task. The solutions are likely to require insights derived from fields beyond computer science, which means programmers will have to learn to collaborate more often with experts in other domains.",
    author: "Fei-Fei Li",
    category: "programming"
  }
];

// Seed the database with quotes
const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    console.log('Clearing existing quotes...');
    await Quote.deleteMany({});

    console.log('Inserting new quotes...');
    const insertedQuotes = await Quote.insertMany(quotes);

    console.log(`Successfully seeded ${insertedQuotes.length} quotes!`);
    console.log('\nSample quote:');
    console.log(`"${insertedQuotes[0].text}" - ${insertedQuotes[0].author}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
