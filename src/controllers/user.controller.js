const {
  RegistrationService,
  LoginService,
  ReadUserService,
  UpdateUserService,
  DeleteUserService,
} = require("../services/userServices");

exports.Registration = async (req, res) => {
  let result = await RegistrationService(req);
  if (result.status === "success") {
    res.status(200).json({
      status: "success",
      message: "Registration Success",
      data: result.data,
    });
  } else {
    res.status(404).json({ status: "fail", message: "Registration Failed" });
  }
};

exports.Login = async (req, res) => {
  let result = await LoginService(req);
  if (result.status === "success") {
    res.json({
      status: "success",
      message: "Token Generated Successfully",
      token: result.data,
    });
  } else if (result.status === "wrong") {
    res.json({ status: "wrong", message: "invalid username or password" });
  } else {
    res.status(404).json({ status: "fail", message: "something went wrong" });
  }
};

exports.ReadUser = async (req, res) => {
  let result = await ReadUserService(req);
  if (result.status === "success") {
    res.status(200).json({
      status: "success",
      message: "Your expected data is here",
      data: result.data,
    });
  } else {
    res.status(404).json({ status: "fail", message: "something went wrong" });
  }
};

exports.UpdateUser = async (req, res) => {
  let result = await UpdateUserService(req);
  if (result.status === "success") {
    res.status(200).json({
      status: "success",
      message: "Your data has updated successfully",
    });
  } else {
    res.status(404).json({ status: "fail", message: "something went wrong" });
  }
};

exports.DeleteUser = async (req, res) => {
  let result = await DeleteUserService(req);
  if (result.status === "success") {
    res.status(200).json({
      status: "success",
      message: "Your data has removed successfully",
    });
  } else {
    res.status(404).json({ status: "fail", message: "something went wrong" });
  }
};
