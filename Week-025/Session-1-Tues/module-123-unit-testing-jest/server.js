// Simple Express API with Products
const express = require("express");
const app = express();

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics" },
  { id: 2, name: "Mouse", price: 25, category: "Electronics" },
  { id: 3, name: "Keyboard", price: 75, category: "Electronics" },
];

// Middleware
app.use(express.json());

// Get all products
app.get("/api/products", (request, response) => {
  response.json(products);
});

// Get product by ID
app.get("/api/products/:id", (request, response) => {
  const productId = parseInt(request.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return response.status(404).json({ error: "Product not found" });
  }

  response.json(product);
});

// Start server only if run directly
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Test the API at http://localhost:${PORT}/api/products`);
  });
}

module.exports = app;
