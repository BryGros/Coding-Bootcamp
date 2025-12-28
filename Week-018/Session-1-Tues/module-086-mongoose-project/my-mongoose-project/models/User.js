const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
