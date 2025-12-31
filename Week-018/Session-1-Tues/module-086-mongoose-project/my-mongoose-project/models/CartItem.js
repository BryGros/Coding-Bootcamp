const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You must define a user for this cart item"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "You must define a product for this cart item"],
    },
    quantity: {
      type: Number,
      required: [true, "You must define a quantity for this cart item"],
      min: [
        1,
        "You must select at least one of these items to place it in a cart",
      ],
      max: [
        99,
        "You cannot order more than 99 of these items in a single order",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
