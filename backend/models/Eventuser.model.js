const mongoose = require("mongoose");

const eventuserSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const EventuserModel = mongoose.model("eventuser", eventuserSchema);

module.exports = { EventuserModel };
