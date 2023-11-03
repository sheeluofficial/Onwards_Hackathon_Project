const { Router } = require("express");
const { EventuserModel } = require("../models/Eventuser.model");
const { isAuthenticatedUser } = require("../middlewares/auth");

const eventuserRouter = Router();

eventuserRouter.get(`/:event-id`, isAuthenticatedUser, async (req, res) => {
  const eventId = req.params["event-id"];

  const eventApplications = await EventuserModel.find({
    event: eventId,
  }).populate("user");

  if (!eventApplications.length) {
    return res.send({
      message: "Invalid or empty event",
    });
  }

  res.status(200).send({
    totalCount: eventApplications.length,
    data: eventApplications,
  });
});

eventuserRouter.post(`/attend`, isAuthenticatedUser, async (req, res) => {
  const { userId, eventId } = req.body;
  const newEventUser = new EventuserModel({ event: eventId, user: userId });
  await newEventUser.save();
  res.send({
    status: "success",
    message: `Applied for event successfully`,
  });
});

module.exports = { eventuserRouter };
