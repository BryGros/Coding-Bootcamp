// Cart Item Controller - Handles all cart item-related business logic
const CartItem = require('../models/CartItem');

// Get all cart items with populated user and product information
exports.getAllCartItems = async (request, response) => {
  try {
    const cartItems = await CartItem.find()
      .populate('user', 'name email')
      .populate('product', 'name price');
    response.json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get cart items for a specific user
exports.getCartItemsByUser = async (request, response) => {
  try {
    const cartItems = await CartItem.find({ user: request.params.userId })
      .populate('product', 'name price category');
    response.json(cartItems);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Get single cart item by ID
exports.getCartItemById = async (request, response) => {
  try {
    const cartItem = await CartItem.findById(request.params.id)
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!cartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    response.json(cartItem);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

// Add item to cart
exports.createCartItem = async (request, response) => {
  try {
    const newCartItem = await CartItem.create(request.body);
    const populatedCartItem = await CartItem.findById(newCartItem._id)
      .populate('user', 'name email')
      .populate('product', 'name price');
    response.status(201).json(populatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Update cart item by ID (typically to change quantity)
exports.updateCartItem = async (request, response) => {
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email').populate('product', 'name price');

    if (!updatedCartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    response.json(updatedCartItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// Delete cart item by ID (remove from cart)
exports.deleteCartItem = async (request, response) => {
  try {
    const deletedCartItem = await CartItem.findByIdAndDelete(request.params.id);

    if (!deletedCartItem) {
      return response.status(404).json({ error: 'Cart item not found' });
    }

    response.json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
