const express = require("express");
const {
  createCategory,
  fetchList,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const isAuthenticated = require("../middleware/isAuthenticated");
const categoryRouter = express.Router();

categoryRouter.post("/create", isAuthenticated, createCategory);

categoryRouter.get("/lists", isAuthenticated, fetchList);

categoryRouter.put("/update/:id", isAuthenticated, updateCategory);

categoryRouter.delete("/delete/:id", isAuthenticated, deleteCategory);

module.exports = categoryRouter;
