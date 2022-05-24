const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
    unique: [true, "Email already exists"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password must be atleast 8 characters long"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
