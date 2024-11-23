const express = require("express");
const {
  createCategory,
  fetchList,
} = require("../controllers/categoryController");
const isAuthenticated = require("../middleware/isAuthenticated");
const categoryRouter = express.Router();

categoryRouter.post("/create", isAuthenticated, createCategory);

categoryRouter.get("/lists", isAuthenticated, fetchList);

module.exports = categoryRouter;
