const express = require("express");
const connectConfig = require("./config/database");
const usersRoutes = require("./routes/userRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectConfig();

app.use("/users", usersRoutes);
app.use("/products", productRoutes);
app.use("/cartitems", cartItemRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
