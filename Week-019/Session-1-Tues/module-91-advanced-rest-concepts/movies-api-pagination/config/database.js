const mongoose = require("mongoose");

// Connect to MongoDB Atlas
async function connectDatabase() {
  try {
    // Get connection string from environment variable
    const connectionString = process.env.MONGODB_CONNECT;

    if (!connectionString) {
      throw new Error("MONGODB_CONNECT environment variable is not set");
    }

    // Connect to MongoDB
    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB Atlas successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

// Handle connection events
mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = { connectDatabase };
