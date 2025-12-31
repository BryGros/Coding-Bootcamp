const CartItem = require("../models/CartItem");
const User = require("../models/User");
const Product = require("../models/Products");

const getAllCartItems = async (req, res) => {
  //Create getAllItems function
  try {
    const cartItems = await CartItem.find();
    res.stauts(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartItemById = async (req, res) => {
  //Create getItemById function
  const { id } = req.params;
  try {
    const cartItem = await Product.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart Item not found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCartItem = async (req, res) => {
  //    - Create createItem function
  const body = req.body;
  try {
    const user = await User.findById(body.user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findById(body.product);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const newCartItem = await CartItem.create(body);
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  //    - Create updateItem function
  const { id } = req.params;
  const body = req.body;
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCartItem) {
      return res.status(404).json({ error: "Cart Item not found" });
    }
    res.status(200).json({
      message: "Cart Item updated successfully",
      product: updatedCartItem,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  //    - Create deleteItem function
  const { id } = req.params;
  try {
    const deletedCartItem = await CartItem.findByIdAndDelete(id);
    if (!deletedCartItem) {
      return res.status(404).json({ error: "Cart Item not found" });
    }
    res.status(200).json({ message: "Cart Item successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
};
