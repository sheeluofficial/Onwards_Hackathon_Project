const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    durationInWeeks: { type: Number, required: true },
    batchStartDate: { type: Date, required: true },
    timingsOfCourse: { type: String, required: true },
    msatCutoff: { type: Number, required: true },
    courseType: { type: String, required: true },
    courseDescription: { type: String, required: true },
    whatYouWillLearnIcons: [{ type: String, required: true }],
    courseDetails: [
      {
        unit: { type: Number, required: true },
        week: { type: String, required: true },
        curriculum: [
          {
            topicName: { type: String, required: true },
            learningObjectives: [{ type: String, required: true }],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("course", courseSchema);

module.exports = { CourseModel };
