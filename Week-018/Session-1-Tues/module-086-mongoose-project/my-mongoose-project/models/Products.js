const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of Product is required"],
      minlength: [3, "The product name must be at least 3 characters long"],
      maxlength: [100, "The product name can't be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "A description for the product is required"],
      minlength: [
        10,
        "Your product's description should be at least 10 characters",
      ],
    },
    price: {
      type: Number,
      required: [true, "You must have a price for this product, even if $0.00"],
      min: [0, "The value of the product can't be less than $0.00"],
    },
    category: {
      type: String,
      enum: {
        values: ["Electronics", "Clothing", "Books", "Home", "Sports"],
        error: "You must select an appropriate category type",
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
