const mongoose = require("mongoose");
// third party packages
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.connectDB = async () => {
  let url = process.env.URL;
  await mongoose.connect(url);
  console.log("database connencted");
};

// ===============================================================
// Json Web Token related helpers
const secretKey = process.env.KEY;

exports.EncodeToken = (email, user_id) => {
  let EXPIRE = { expiresIn: "24h" };
  let PAYLOAD = {
    email: email,
    user_id: user_id,
  };
  return jwt.sign(PAYLOAD, secretKey, EXPIRE);
};

exports.DecodeToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (e) {
    return null;
  }
};
// =================================================================
// Error handler
exports.sendError = (res) => {
  res.status(404).json({ status: "fail", message: "Something went wrong" });
};
// =================================================================
// cookies handler
exports.SetCookie = async (res, cookieName, cookieValue) => {
  let cookieOption = {
    expires: new Date(Date.now() + 24 * 6060 * 1000),
    httpOnly: false,
  };

  res.cookie(cookieName, cookieValue, cookieOption);
};
