// initial packages
const express = require("express");
const app = express();
// importing routers
const userRouter = require("./src/routes/user.router");
const productRouter = require("./src/routes/product.router");
// imported config
const securityMiddleware = require("./src/config/security.config");
const { connectDB } = require("./src/config/db.config");
const { env_port } = require("./src/config/dotenv.config");

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


app.listen(env_port, () => {
    console.log(`server is running`)
})
