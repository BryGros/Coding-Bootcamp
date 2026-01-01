require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./config/database");
const movieRoutes = require("./routes/movieRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to database
connectDatabase();

// Routes
app.use("/movies", movieRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "MongoDB Atlas Movie API - Pagination & Filtering Demo",
    endpoints: {
      "GET /movies": "Get all movies with pagination and filtering",
      "GET /movies/:id": "Get single movie by ID",
    },
    exampleQueries: [
      "/movies?page=1&limit=10", // this one works on Step 1 or Step 2
      "/movies?genre=Action", // works on Step 2
      // "/movies?year=2000", //filter
      // "/movies?minYear=1990&maxYear=2000", 
      // "/movies?country=USA",
      // "/movies?rated=PG-13",
      // "/movies?minRating=8",
      // "/movies?genre=Drama&minYear=2000&page=2&limit=5",
    ],
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("\nAvailable endpoints:");
  console.log("GET  / - API information");
  console.log("GET  /movies - Get all movies (with pagination and filtering)");
  console.log("GET  /movies/:id - Get single movie by ID");
  console.log("\nExample queries:");
  console.log("- http://localhost:3000/movies?page=1&limit=10");
  console.log("- http://localhost:3000/movies?genre=Action");
  console.log("- http://localhost:3000/movies?minYear=2000&maxYear=2010");
  console.log("- http://localhost:3000/movies?country=USA&minRating=8");
  console.log(
    "- http://localhost:3000/movies?genre=Drama&minYear=1990&page=2&limit=5"
  );
});
