const express = require("express");
const connectConfig = require("./config/database");
const User = require("./models/User");
const usersRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectConfig();

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
