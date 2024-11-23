const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transactions = require("../model/Transactions");

exports.createTransaction = asyncHandler(async (req, res) => {
  const { type, amount, category, description, date } = req.body;
  if (!type || !amount || !date) {
    throw new Error("Type , Amount and date are required");
  }
  //   ! create the transactions
  const transaction = await Transactions.create({
    user: req.user,
    type,
    category,
    amount,
    description,
    date,
  });
  res.json(transaction);
});

exports.getFilteredTransactions = asyncHandler(async (req, res) => {
  const { startDate, endDate, type, category } = req.query;
  let filters = {
    user: req.user,
  };
  if (startDate) {
    filters.date = { ...filters.date, $gte: new Date(startDate) };
  }
  if (endDate) {
    filters.date = { ...filters.date, $lte: new Date(endDate) };
  }
  if (category) {
    if (category === "All") {
      //   ? no category filter needed
    } else {
      filters.category = category;
    }
  }
  if (type) {
    filters.type = type;
  }

  const transactions = await Transactions.find(filters).sort({ date: -1 });
  res.json(transactions);
});

exports.updateTransaction = asyncHandler(async (req, res) => {
  // ? find Transaction
  const { type, amount, date, category, description } = req.body;
  const transaction = await Transactions.findById(req.params.id);
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  if (transaction.user.toString() !== req.user) {
    throw new Error("Unauthorized");
  }
  transaction.type = type || transaction.type;
  transaction.category = category || transaction.category;
  transaction.amount = amount || transaction.amount;
  transaction.description = description || transaction.description;
  transaction.date = date || transaction.date;
  // ? update the transaction
  const updatedTransaction = await transaction.save();
  res.json(updatedTransaction);
});

exports.deleteTransaction = asyncHandler(async (req, res) => {
  // ? find the transaction
  const transaction = await Transactions.findById(req.params.id);
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  if (transaction.user.toString() !== req.user.toString()) {
    throw new Error("Unauthorized");
  }
  await Transactions.findByIdAndDelete(req.params.id);
  res.json({ message: "Transaction deleted successfully" });
});
