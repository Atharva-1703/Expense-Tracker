const express = require("express");
const {
  getProfile,
  updatePassword,
  updateProfile,
} = require("../controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const userRouter = express.Router();

userRouter.get("/profile", isAuthenticated, getProfile);

userRouter.put("/changePassword", isAuthenticated, updatePassword);

userRouter.put("/updateProfile", isAuthenticated, updateProfile);

module.exports = userRouter;
