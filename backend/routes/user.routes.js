const express = require("express");
const router = express.Router();

const { signUp, logIn, verifyOTP, logout, getUserDetails } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/signup").post(signUp);
router.route("/login").post(logIn);
router.route("/verify-otp").post(verifyOTP);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

module.exports = router;
