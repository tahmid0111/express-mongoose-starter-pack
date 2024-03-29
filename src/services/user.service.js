const UserModel = require("../models/user.model");
const OTPModel = require("../models/otp.model");
// third party packages
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
// helpers
const { CreateOTP, SendOTP } = require("../helpers/otp.helper");
const { EncodePassword, DecodePassword } = require("../helpers/bcrypt.helper");
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
    let hashedPass = await EncodePassword(reqBody.Password)
    let myBody = {
      ...reqBody,
      Password: hashedPass, // Update the Password property
    };

    let result = await UserModel.create(myBody);
    await OTPModel.create({Email: reqBody.Email});
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
    let result = await DecodePassword(reqBody.Password, user.Password);
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

exports.ForgetPasswordRequestService = async (req) => {
  try {
    let email = req.body.Email;
    let Query = { Email: email };

    const result = await UserModel.findOne(Query);
    if (!result) {
      return { status: "invalidEmail" };
    }
    let code = CreateOTP()
    await SendOTP(email, code)
    // updating or creating a OTP field in users' info
    await OTPModel.updateOne(
      Query,
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", userEmail: email };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.ForgetPasswordVerifyService = async (req) => {
  try {
    let { Email, otp } = req.body;
    let Query = { Email: Email, otp: otp };
    let result = await OTPModel.findOne(Query);
    if(!result) {
      return {status: 'wrongOTP'}
    }
    await OTPModel.updateOne(
      Query,
      {$set: {Status: true}},
    )
    return { status: "success", };
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
    return { status: "success" };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.UpdatePasswordService = async (req) => {
  try {
    let reqBody = req.body;
    let Query = { Email: req.headers.email };
    let data = await UserModel.findOne(Query);
    if (!data) {
      return { status: "fail" };
    }
    let user = await bcrypt.compare(reqBody.OldPassword, data.Password);
    if (!user) {
      return { status: "wrongPassword" };
    }
    if (reqBody.OldPassword === reqBody.NewPassword) {
      return { status: "samePassword" };
    }
    if (!passwordRegex.test(reqBody.NewPassword)) {
      return { status: "weakPassword" };
    }
    let hashedPass = await EncodePassword(reqBody.NewPassword)
    let myBody = {
      Password: hashedPass,
    };
    let result = await UserModel.updateOne(Query, myBody);

    return { status: "success" };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.RecoveryPasswordService = async (req) => {
  try {
    let { Email, Password } = req.body;
    let Query = { Email: Email };
    let result = await OTPModel.findOne(Query)
    if(result.Status !== true) {
      return { status: "invalidUser" }
    }
    if (!passwordRegex.test(Password)) {
      return { status: "weakPassword" };
    }
    let hashedPassword = await bcrypt.hash(Password, 10);
    await UserModel.updateOne(
      Query,
      {$set: { Password: hashedPassword } },
    )

    return {status: "success"}
  } catch (error) {
    return {status: "fail"}
  }
}

exports.DeleteUserService = async (req) => {
  let Query = { Email: req.headers.email };
  try {
    const result = await UserModel.deleteOne(Query);
    return { status: "success" };
  } catch (error) {
    return { status: "fail" };
  }
};

