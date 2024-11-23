const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

exports.getProfile = asyncHandler(async (req, res) => {
  // ? find user
  const id = req.user;
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  //   ? send response
  res.json({ username: user.username, email: user.email });
});

exports.updatePassword = asyncHandler(async (req, res) => {
  // ? get new and oldPassword
  const { newPassword } = req.body;
  //   ? get the user
  const user = await User.findById(req.user);
  if (!user) {
    throw new Error("User not Found");
  }
  //   ? hash the new Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedPassword;
  await user.save();
  res.send({ message: "Password updated successfully" });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.user);
  user.username = username;
  user.email = email;
  await user.save();
  res.send({ message: "Profile updated Successfully" });
});
