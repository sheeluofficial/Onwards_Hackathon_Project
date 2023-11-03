const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDuration: { type: String, required: true },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    eventDescription: { type: String, required: true },
    speakerName: { type: String, required: true },
    speakerDesignation: { type: String, required: true },
    speakerImageURL: { type: String, required: true },
    speakerDetails: { type: String, required: true },
    recordedVideoLink: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model("event", eventSchema);

module.exports = { EventModel };
