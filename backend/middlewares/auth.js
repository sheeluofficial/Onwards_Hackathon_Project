const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");
const CustomError = require("../utils/customError");
const { UserModel } = require("../models/user.model");

// Authenticate function
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token =  req.header('Authorization')?.split(" ")[1] || null;

  if (!token) {
    return next(new CustomError("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decodedData.id);
  req.userId = req.user._id;
  next();
});
