const { DecodeToken } = require("../helpers/important/common.helper");

exports.AuthVerify = (req, res, next) => {
  let Token = req.headers.token;
  try {
    const decoded = DecodeToken(Token); // decoding the provided token in header
    let email = decoded.data.Email;
    req.headers.email = email; // setting email in the header from the decoded token

    next(); // giving permission to move on
  } catch (error) {
    res.json({ status: "fail", message: "Check your login access" });
  }
}