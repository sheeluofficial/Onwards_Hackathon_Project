const mongoose = require("mongoose");

const courseuserSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const CourseuserModel = mongoose.model("courseuser", courseuserSchema);

module.exports = { CourseuserModel };
