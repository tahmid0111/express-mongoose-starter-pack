const {
  RegistrationService,
  LoginService,
  ReadUserService,
  UpdateUserService,
  DeleteUserService,
} = require("../services/user.service");

exports.Registration = async (req, res) => {
  let result = await RegistrationService(req);

  const responseStatus = result.status;
  const messages = {
    success: "User Successfully Registered",
    invalidEmail: "Please provide a valid Email",
    invalidPass: "Use a strong Password",
    invalidNumber: "Give a bangladeshi Phone Number",
    existingUser: "An account is already registered with this email",
    fail: "Something went wrong",
  };

  const message = messages[responseStatus];
  const data = responseStatus === "success" ? result.data : undefined;

  res.status(responseStatus === "success" ? 200 : 404).json({
    status: responseStatus,
    message,
    data,
  });
};

exports.Login = async (req, res) => {
  let result = await LoginService(req);

  const responseStatus = result.status;
  const messages = {
    success: "Login Successfull",
    newUser: "There is no account associated with this Email",
    wrongPassword: "You have provided a wrong pssword",
    fail: "Something went wrong",
  };

  const message = messages[responseStatus];
  const data = responseStatus === "success" ? result.data : undefined;

  res.status(responseStatus === "success" ? 200 : 404).json({
    status: responseStatus,
    message,
    data,
  });
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

  const responseStatus = result.status;
  const messages = {
    success: "Update successful. Your information has been updated",
    foundEmail: "Unexpected movement",
    foundPassword: "Unexpected movement",
    fail: "Something went wrong",
  };

  const message = messages[responseStatus];
  const data = responseStatus === "success" ? result.data : undefined;

  res.status(responseStatus === "success" ? 200 : 404).json({
    status: responseStatus,
    message,
    data,
  });
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
