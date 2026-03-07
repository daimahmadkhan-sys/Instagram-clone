const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profile_image } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExist) {
    return res.status(409).json({
      massege:
        "user is already exist" +
        " " +
        (isUserExist.email === email
          ? "email is already exist"
          : "username is already exist"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_image,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" },
  );

  res.cookie("token", token);

  res.status(201).json({
    massege: "user registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    return res.status(404).json({
      massege: "user is not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(404).json({
      massege: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" },
  );

  res.cookie("token", token);
  res.status(200).json({
    massege: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profile_image: user.profile_image,
    },
  });
}

module.exports = { registerController, loginController };
