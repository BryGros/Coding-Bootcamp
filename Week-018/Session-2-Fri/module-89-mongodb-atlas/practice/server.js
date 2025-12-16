require("dotenv").config(); // pull in all the value from ____ and put them _____

const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
// MongoDBURI
const MONGODB_URI = process.env.MONGODB_URI;
console.log("MONGODB_URI is set to ", MONGODB_URI);
// Shopify
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
// nodeenv
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Database:", MONGODB_URI.split("/").pop());
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Environment Variables Practice Server",
    status: "running",
    environment: NODE_ENV,
  });
});

app.get("/api/config", (req, res) => {
  res.json({
    shopifyKeyLoaded: !!SHOPIFY_API_KEY,
    port: PORT,
    environment: NODE_ENV,
    databaseConnected: mongoose.connection.readyState === 1,
  });
});

app.get("/api/shopify/products", (req, res) => {
  if (!SHOPIFY_API_KEY) {
    return res.status(500).json({
      error: "Shopify API key not configured",
    });
  }

  res.json({
    message: "Simulated Shopify products",
    products: [
      { id: 1, name: "Product 1", price: 29.99 },
      { id: 2, name: "Product 2", price: 49.99 },
    ],
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log("Environment:", NODE_ENV);
});
