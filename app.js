// initial packages
const express = require("express");
const app = express();
// importing routers
const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router");
// imported helpers
const connectDB = require("./src/helpers/database.helper");
const securityMiddleware = require("./src/helpers/security.helper");

// implementing security middlewares
securityMiddleware(app);

// database connection
connectDB();

// routing implement
app.use("/user/api/v1", userRouter);
app.use("/product/api/v1", productRouter);

// error routing implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "wrong connection" });
});

module.exports = app;
