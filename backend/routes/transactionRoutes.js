const express = require("express");
const {
  createTransaction,
  getFilteredTransactions,
} = require("../controllers/transactionController");
const isAuthenticated = require("../middleware/isAuthenticated");
const transactionRouter = express.Router();

transactionRouter.post("/create", isAuthenticated, createTransaction);

transactionRouter.get("/lists", isAuthenticated, getFilteredTransactions);

module.exports = transactionRouter;
