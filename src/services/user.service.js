const UserModel = require("../models/user.model");
// third party packages
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
// regex for validation
// This regular expression is quite complex and allows for a wide range of email address formats, including those with special characters and IP addresses in the domain part. It's very inclusive and aims to match most email addresses conforming to standards.
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Contains at least one lowercase letter.
// Contains at least one uppercase letter.
// Contains at least one digit.
// Contains at least one special character from the specified set.
// Is at least 8 characters long.
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// this regex allows only valid bangladeshi numbers
const bangladeshMobileRegex = /^(?:\+?880)?01[3-9]\d{8}$/;

exports.RegistrationService = async (req) => {
  try {
    let reqBody = req.body;
    // Validating given info using regex
    if (!emailRegex.test(reqBody.Email)) {
      return { status: "invalidEmail" };
    }
    if (!passwordRegex.test(reqBody.Password)) {
      return { status: "invalidPass" };
    }
    if (!bangladeshMobileRegex.test(reqBody.Mobile)) {
      return { status: "invalidNumber" };
    }
    // checking existing user's emails
    let Query = { Email: reqBody.Email };
    let existingUser = await UserModel.findOne(Query);
    if (existingUser) {
      return { status: "existingUser" };
    }
    // if all is okay then a new user will be registered with an encrypted password
    let hashedPass = await bcrypt.hash(reqBody.Password, 10);
    let myBody = {
      ...reqBody,
      Password: hashedPass, // Update the Password property
    };

    let result = await UserModel.create(myBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.LoginService = async (req) => {
  try {
    let reqBody = req.body;
    let Query = { Email: reqBody.Email };
    const user = await UserModel.findOne(Query);
    if (!user) {
      return { status: "newUser" };
    }
    let result = await bcrypt.compare(reqBody.Password, user.Password);
    if (!result) {
      return { status: "wrongPassword" };
    }
    let Payload = {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      data: user,
    };
    let token = jwt.sign(Payload, "secretkey");

    return { status: "success", data: token };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.ReadUserService = async (req) => {
  try {
    let Query = { Email: req.headers.email };
    const projection = { Password: 0 };
    const result = await UserModel.findOne(Query, projection);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.UpdateUserService = async (req) => {
  try {
    let reqBody = req.body;
    let Query = { Email: req.headers.email };
    if (reqBody.Email || reqBody.Password) {
      return { status: "fail" };
    }
    let result = await UserModel.updateOne(Query, reqBody);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.DeleteUserService = async (req) => {
  let Query = { Email: req.headers.email };
  try {
    const result = await UserModel.deleteOne(Query);
    return { status: "success" };
  } catch (error) {
    return { status: "fail" };
  }
};
