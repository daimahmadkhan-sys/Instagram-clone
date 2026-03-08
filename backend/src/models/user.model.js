const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username is already exist"],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "email is already exist"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: String,
  profile_image: {
    type: String,
    default:
      "https://ik.imagekit.io/daimkhan/Insta-clone/profile/default%20profile.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
