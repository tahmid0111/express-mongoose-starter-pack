const mongoose = require("mongoose");
const { env_url } = require("./dotenv.config");

exports.connectDB = async () => {
  await mongoose.connect(env_url);
  console.log("database connencted");
};