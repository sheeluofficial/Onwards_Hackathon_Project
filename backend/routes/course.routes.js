const { Router } = require("express");
const { CourseModel } = require("../models/Course.model");
const { isAuthenticatedUser } = require("../middlewares/auth");

const courseRouter = Router();

// Get all courses
courseRouter.get("/", isAuthenticatedUser, async (req, res) => {
  const courses = await CourseModel.find();
  res.send({ courses: courses });
  // res.send("courses endpoint");
});

// Get a single course by its ID
courseRouter.get("/:courseId", isAuthenticatedUser, async (req, res) => {
  const courseId = req.params["courseId"];
  const course = await CourseModel.findById(courseId);

  if (!course) {
    return res.status(404).send("Course not found");
  }

  res.send({ course: course });
});

// Create a new course
courseRouter.post("/create", isAuthenticatedUser, async (req, res) => {
  const {
    name,
    durationInWeeks,
    batchStartDate,
    timingsOfCourse,
    msatCutoff,
    courseType,
    courseDescription,
    whatYouWillLearnIcons,
    courseDetails,
  } = req.body;

  const newCourse = new CourseModel({
    name,
    durationInWeeks,
    batchStartDate,
    timingsOfCourse,
    msatCutoff,
    courseType,
    courseDescription,
    whatYouWillLearnIcons,
    courseDetails,
  });

  await newCourse.save();
  res.status(201).send({ message: "new course created" });
});

module.exports = { courseRouter };
