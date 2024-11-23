const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transactions = require("../model/Transactions");

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
exports.updateCategory = asyncHandler(async (req, res) => {
  const { name, type } = req.body;
  const categoryId = req.params.id;
  const category = await Category.findById(categoryId);
  const normalizedName = name.toLowerCase();
  if (!category) throw new Error("Category not found");
  if (category.user.toString() !== req.user) throw new Error("Unauthorized");

  const oldName = category.name;

  // ? update the properties
  category.name = normalizedName;
  category.type = type || category.type;
  const updateCategory = await category.save();
  // ? update the transactions
  if (oldName !== normalizedName) {
    await Transactions.updateMany(
      {
        user: req.user,
        category: oldName,
      },
      {
        $set: {
          category: normalizedName,
        },
      }
    );
  }

  res.json(updateCategory);
});

// ? delete a category
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new Error("Category not found");
  if (category.user.toString() !== req.user) throw new Error("Unauthorized");
  const defaultCategory = "Uncategorized";
  await Transactions.updateMany(
    {
      category: category.name,
      user: req.user,
    },
    {
      $set: { category: defaultCategory },
    }
  );
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted Successfully" });
});
