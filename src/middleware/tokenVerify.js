const jwt = require("jsonwebtoken");

exports.AuthVerify = (req, res, next) => {
  let Token = req.headers.token;
  try {
    const decoded = jwt.verify(Token, "secretkey"); // decoding the provided token in header
    console.log(decoded)
    let email = decoded.data.Email;
    req.headers.email = email; // setting email in the header from the decoded token

    next(); // giving permission to move on
  } catch (error) {
    res.json({ status: "fail" });
  }
}