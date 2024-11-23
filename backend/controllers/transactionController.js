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
  const transaction = await Transactions.findById(req.params.id);
  if (!transaction) {
    throw new Error("Transaction not found");
  }
  if (transaction.user.toString() !== req.user) {
    throw new Error("Unauthorized");
  }
  
});
