const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { UserModel } = require("../models/user.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const customError = require("../utils/customError");
const sendMessage = require("../utils/sendMessage");

exports.signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, phoneNumber } = req.body;

  const newUser = new UserModel({
    name,
    email,
    phoneNumber,
  });

  // Create new user
  await newUser.save();

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  newUser.otp = otp;
  await newUser.save();

  const message = `Your sign up OTP of masai onwards is : ${otp}`;
  sendMessage({ phoneNumber, next, res, message, newUser, sendOn: "PhoneNumber" });
});

// Verify  signin/signup otp

exports.verifyOTP = catchAsyncError(async (req, res, next) => {
  try {
    const userOtp = req.body.otp;
    const userId = req.body.userId;
    const input = req.body.sendOn;

    const user = await UserModel.findById(userId);

    if (user.otp && userOtp == user.otp) {
     
      const user = await UserModel.findById(userId);

      if (input == "email") {
        user.emailVerified = true;
        await user.save();
      } else {
        user.phoneNumberVerified = true;
        await user.save();
      }

      const statusCode = 200;

      user.otp = null;
      user.save();

      sendToken({ res, user, statusCode });
    } else {
      return next(new customError("Invalid OTP", 401));
    }
  } catch (error) {
    return next(new customError("Invalid OTP", 401));
  }
});

// Login user through email/PhoneNumber

exports.logIn = catchAsyncError(async (req, res, next) => {
  try {
    let { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return next(new customError("Please Enter Email & Phone Number", 401));
    }

    let newUser;

    if (email) {
      newUser = await UserModel.findOne({ email });
    } else if (phoneNumber) {
      newUser = await UserModel.findOne({ phoneNumber });
    }

    if (!newUser) {
      return next(new customError("Invalid login details", 401));
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    // req.session.otp = otp; // Store OTP in session
    // req.session.userId =user._id; // Store userId in session

    newUser.otp = otp;
    await newUser.save();

    const message = `Your sign in OTP of masai onwards is : ${otp}`;
    const subject = "Onwards Sign in OTP";

    if (email) {
      sendEmail({ message, res, next, email, subject, newUser, sendOn: "email" });
    } else {
      sendMessage({ phoneNumber, next, res, message, newUser, sendOn: "phoneNumber" });
    }
  } catch (error) {
    console.log(error);
    return next(new customError("Invalid email or phoneNumber", 401));
  }
});

// Logout User

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).populate("applications").populate("events");
  res.status(200).json({ success: true, user });
});
