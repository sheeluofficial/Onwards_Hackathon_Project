const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [3, "Name should more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please Enter Your Mobile Number"],
      unique: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "any", { strictMode: false }); // 'any' allows any locale, and strictMode is set to false to allow some variations in formatting.
        },
        message: "Please Enter valid mobile numbers in the array.",
      },
    },
    profileUrl: { type: String, default: "https://avatars.githubusercontent.com/u/114180991?v=4" },
    phoneNumberVerified: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    applications: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "application" }],
      default: [],
    },
    events: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }], default: [] },
    otp: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
