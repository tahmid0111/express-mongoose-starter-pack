const express = require("express");
const router = express.Router();

// importing user controllers
const {
  Registration,
  Login,
  ReadUser,
  UpdateUser,
  DeleteUser,
  UpdatePassword,
  ForgetPasswordRequest,
  ForgetPasswordVerify,
  RecoveryPassword,
} = require("../controllers/user.controller");
const { AuthVerify } = require("../middleware/tokenVerify");

router.post("/register", Registration);
router.post("/login", Login);
router.get("/readuser", AuthVerify, ReadUser);
router.post("/updateuser", AuthVerify, UpdateUser);
router.post("/updatepassword", AuthVerify, UpdatePassword);
router.post("/deleteuser", AuthVerify, DeleteUser);
// extra features
router.post("/forgetPasswordRequest", ForgetPasswordRequest);
router.post("/forgetPasswordVerify", ForgetPasswordVerify);
router.post("/recoverypassword", RecoveryPassword);

module.exports = router;
