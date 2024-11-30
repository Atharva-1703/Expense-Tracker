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
const cors = require("cors");

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

// ? cors config
const corsOptions = {
  origin: ["http://localhost:5173", process.env.FRONTEND_URL],
};
app.use(cors(corsOptions));

// ? middlewares
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
