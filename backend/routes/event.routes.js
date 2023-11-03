const { Router } = require("express");
const { EventModel } = require("../models/Event.model");
const { UserModel } = require("../models/user.model");
const { isAuthenticatedUser } = require("../middlewares/auth");

const eventRouter = Router();

// Get all events
eventRouter.get("/all", isAuthenticatedUser, async (req, res) => {
  const events = await EventModel.find();
  res.send({ events: events });
});

// Get a single event by its ID
eventRouter.get("/:eventId", isAuthenticatedUser, async (req, res) => {
  const eventId = req.params["eventId"];
  const event = await EventModel.findById(eventId);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  res.send({ event: event });
});

// Register for an event
eventRouter.get("/register/:eventId", isAuthenticatedUser, async (req, res) => {
  const userId = req.userId;
  const eventId = req.params["eventId"];

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const event = await EventModel.findById(eventId);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  user.events = [...user.events, event];
  await user.save();

  res.send({ message: `Successfully registered for event` });
});

// Create a new event
eventRouter.post("/create", isAuthenticatedUser, async (req, res) => {
  const {
    name,
    eventType,
    eventDuration,
    eventStartDate,
    eventEndDate,
    eventDescription,
    speakerName,
    speakerDesignation,
    speakerImageURL,
    speakerDetails,
    recordedVideoLink,
  } = req.body;

  const newEvent = new EventModel({
    name,
    eventType,
    eventDuration,
    eventStartDate,
    eventEndDate,
    eventDescription,
    speakerName,
    speakerDesignation,
    speakerImageURL,
    speakerDetails,
    recordedVideoLink,
  });

  await newEvent.save();
  res.send("event created");
});

module.exports = { eventRouter };
