const express = require("express");
const authRouter = require("./routes/authRoutes");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandlerMiddleware");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// ? middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ? auth Routes
app.use("/auth", authRouter);

// ? user Routes
app.use("/user", userRouter);

// ? category Routes
app.use("/category", categoryRouter);

// ? transaction Routes
app.use("/transaction", transactionRouter);

// ? error handler
app.use(errorHandler);

// ? connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database Connected");

    app.listen(PORT, () => console.log(`Server is running`));
  })
  .catch(() => {
    console.log("Database Connection Failed");
  });
