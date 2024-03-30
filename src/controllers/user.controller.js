const {
  RegistrationService,
  LoginService,
  ReadUserService,
  UpdateUserService,
  DeleteUserService,
  ForgetPasswordRequestService,
  ForgetPasswordVerifyService,
  RecoveryPasswordService,
} = require("../services/user.service");

const { sendError } = require("../helpers/important/common.helper");

exports.Registration = async (req, res) => {
  let result = await RegistrationService(req);

  const responseStatus = result.status;
  const messages = {
    success: "User Successfully Registered",
    invalidEmail: "Please provide a valid Email",
    weakPassword: "Use a strong Password",
    invalidNumber: "Give a valid Bangladeshi Phone Number",
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
  let result = await LoginService(req, res);

  const responseStatus = result.status;
  const messages = {
    success: "Login Successfull",
    newUser: "There is no account associated with this Email",
    incorrectPassword: "Incorrect Password",
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
      status: result.status,
      message: "Your expected data is here",
      data: result.data,
    });
  } else {
    sendError(res);
  }
};

exports.UpdateUser = async (req, res) => {
  let result = await UpdateUserService(req);

  if (result.status === "success") {
    res.status(200).json({
      status: result.status,
      message: "Update successful. Your information has been updated",
    });
  } else {
    sendError(res);
  }
};

exports.UpdatePassword = async (req, res) => {
  let result = await UpdateUserService(req);

  const responseStatus = result.status;
  const messages = {
    success: "Password updated successfully",
    incorrectPassword: "Incorrect password",
    samePassword: "Try a new password",
    weakPassword: "Please use a strong password",
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
      status: result.status,
      message: "Your has been deleted",
    });
  } else {
    sendError(res);
  }
};

exports.ForgetPasswordRequest = async (req, res) => {
  let result = await ForgetPasswordRequestService(req);

  if (result.status === "success") {
    res.status(200).json({
      status: result.status,
      message: "6 Digit OTP has been send",
      userEmail: result.userEmail,
    });
  } else if (result.status === "invalidEmail") {
    res.status(200).json({
      status: result.status,
      message: "Please provide the right email",
    });
  } else {
    sendError(res);
  }
};

exports.ForgetPasswordVerify = async (req, res) => {
  let result = await ForgetPasswordVerifyService(req, res);

  if (result.status === "success") {
    res.status(200).json({
      status: result.status,
      message: "User verified",
    });
  } else if (result.status === "wrongOTP") {
    res.status(200).json({
      status: result.status,
      message: "wrong otp code",
    });
  } else {
    sendError(res);
  }
};

exports.RecoveryPassword = async (req, res) => {
  let result = await RecoveryPasswordService(req);

  const responseStatus = result.status;
  const messages = {
    success: "Password updated successfully",
    invalidUser: "Invalid user",
    weakPassword: "Please use a strong password",
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
