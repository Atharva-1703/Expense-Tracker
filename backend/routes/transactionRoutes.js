const express = require("express");
const {
  createTransaction,
  getFilteredTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const isAuthenticated = require("../middleware/isAuthenticated");
const transactionRouter = express.Router();

transactionRouter.post("/create", isAuthenticated, createTransaction);

transactionRouter.get("/lists", isAuthenticated, getFilteredTransactions);

transactionRouter.put("/update/:id", isAuthenticated, updateTransaction);

transactionRouter.delete("/delete/:id", isAuthenticated, deleteTransaction);

module.exports = transactionRouter;
