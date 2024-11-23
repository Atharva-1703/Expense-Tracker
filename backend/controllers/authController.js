const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ! User Registration
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //   ? validation
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }

  //   ? check if user already exists
  const userFound = await User.findOne({ email });

  if (userFound) {
    console.log(userFound);

    throw new Error("User already exists");
  }

  //   ! hash the password
  //   ? salt is a string for encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   ? create new User
  const userCreated = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  //   ! response
  res.json({
    username: userCreated.username,
    email: userCreated.email,
    id: userCreated._id,
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  //   ? check if user Exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Login Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid login Credentials");
  }
  //   ? generate tokens
  const token = jwt.sign({ id: user._id }, "raptor", {
    expiresIn: "30d",
  });
  //   ! send response
  res.json({
    message: "User LoggedIn",
    token,
    id: user._id,
    email: user.email,
    username: user.username,
  });
});
