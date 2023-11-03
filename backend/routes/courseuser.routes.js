const { Router } = require("express");
const { CourseuserModel } = require("../models/Courseuser.model.js");
const { isAuthenticatedUser } = require("../middlewares/auth");

const courseuserRouter = Router();

courseuserRouter.get(`/:course-id`, isAuthenticatedUser, async (req, res) => {
  const courseId = req.params["course-id"];

  const courseApplications = await CourseuserModel.find({ course: courseId }).populate("user");

  if (!courseApplications.length) {
    return res.status(404).send({
      message: "Invalid or empty course",
    });
  }

  res.status(200).send({ totalCount: courseApplications.length, data: courseApplications });
});

courseuserRouter.post("/apply", isAuthenticatedUser, async (req, res) => {
  const { userId, courseId } = req.body;
  const newCourseUser = new CourseuserModel({ course: courseId, user: userId });
  await newCourseUser.save();
  res.send({
    status: "success",
    message: `Applied for course successfully`,
  });
});

module.exports = { courseuserRouter };
