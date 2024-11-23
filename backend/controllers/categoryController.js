const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");

// ? create a category
exports.createCategory = asyncHandler(async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    throw new Error("All fields are required");
  }
  // ? convert to lowercase
  const normalizedName = name.toLowerCase();

  // ? check if the type is valid
  if (type !== "income" && type !== "expense") {
    throw new Error("Invalid type");
  }
  //   ? check if category already exists
  const categoryFound = await Category.findOne({
    name: normalizedName,
    user: req.user,
  });
  if (categoryFound) {
    throw new Error(`Category ${name} is already created by user`);
  }
  //   ! create category
  const category = await Category.create({
    name: normalizedName,
    type,
    user: req.user,
  });
  res.status(201).json(category);
});

// ? fetch categories
exports.fetchList = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user });
  if (!categories) return new Error("No categories found");

  res.status(200).json(categories);
});

// ? update a category
exports.updateCategory = asyncHandler(async (req, res) => {});

// ? delete a category
exports.deleteCategory = asyncHandler(async (req, res) => {});
