// Create getItemById function

// Create updateItem function
// Create deleteItem function
// Add try/catch error handling
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  // Create getAllItems function
  try {
    const users = await User.find();
    res.json(users);
  } catch {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  // Create createItem function
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllUsers, createUser };
