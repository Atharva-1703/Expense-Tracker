const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      require: true,
      default: "Uncategorized",
    },
    // ? enum for any one type of Income or Expense
    type: {
      type: String,
      require: true,
      enum: ["income", "expense"],
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
