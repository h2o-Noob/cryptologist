const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
  addWallet,
  registerWallet
} = require("../controllers/UserController");

const router = express.Router();

router
.route("/register")
.post(registerUser)

router
.route("/login")
.post(loginUser)

router
.route("/me")
.post(getUserDetails)

router
.route("/wallet")
.post(registerWallet)
.put(addWallet)

module.exports = router;
