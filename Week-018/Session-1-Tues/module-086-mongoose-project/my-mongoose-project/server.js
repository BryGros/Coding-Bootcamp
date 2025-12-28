const express = require("express");
const connectConfig = require("./config/database");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectConfig();

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
