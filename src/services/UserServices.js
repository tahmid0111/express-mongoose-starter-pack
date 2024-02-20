const UserModel = require("../models/userModel");

// let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.RegistrationService = async (req) => {
  let reqBody = req.body;
  // let hashedPass = await bcrypt.hash(reqBody.Password, 10);
  // let myBody = {
  //   ...reqBody, // Spread the properties of reqBody
  //   Password: hashedPass, // Update the Password property
  // };
  try {
    const result = await UserModel.create(reqBody);
    return { status: "success", data: result };
  } catch (error) {
    console.log(error);
    return { status: "fail" };
  }
};

exports.LoginService = async (req) => {
  let reqBody = req.body;
    // let Query = { Email: reqBody.Email };
  let aggregationPipeline = [{ $match: { Email: reqBody.Email } }];
  let aggregationPipeline2 = [{ $match: { Password: reqBody.Password } }];

  let user = await UserModel.aggregate(aggregationPipeline);
  if (user[0]) {
    // Encoded passwords can never be decoded, so we should check them in this way
    // let result = await bcrypt.compare(reqBody.Password, user[0].Password);
    let result = await UserModel.aggregate(aggregationPipeline2);
    if (result[0]) {
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: result[0],
      };
      let token = jwt.sign(Payload, "secretkey");
      return { status: "success", data: token };
    } else {
      return { status: "wrong" };
    }
  } else {
    return { status: "fail" };
  }
};

exports.ReadUserService = async (req) => {
  const aggregationPipeline = [{ $match: { Email: req.headers.email } }];
  try {
    const result = await UserModel.aggregate(aggregationPipeline);
    const Singleobject = result[0];
    return { status: "success", data: Singleobject };
  } catch (error) {
    return { status: "fail" };
  }
};

exports.UpdateUserService = async (req) => {
  let reqBody = req.body;
  let myBody = {
    FirstName: reqBody.FirstName,
    LastName: reqBody.LastName,
    Password: reqBody.Password,
  };
  let Query = { Email: req.headers.email };
  try {
    const result = await UserModel.updateOne(Query, myBody);
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
