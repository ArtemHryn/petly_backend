const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
    default: "starter",
  },
  phone: {
    type: String,
    required: [true, "Mobile phone is required"],
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = {
  User,
};
