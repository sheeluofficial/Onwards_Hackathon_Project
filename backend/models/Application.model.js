const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicationStatus: {
      type: String,
      default: "MSAT_PENDING",
      enum: [
        "MSAT_PENDING",
        "MSAT_PROGRESS",
        "MSAT_DECISION_PENDING",
        "MSAT_CLEARED",
        "MSAT_FAILED",
        "MSAT_SECOND_ATTEMPT_PENDING",
        "MSAT_SECOND_ATTEMPT_PROGRESS",
        "MSAT_SECOND_ATTEMPT_DECISION_PENDING",
        "MSAT_SECOND_ATTEMPT_CLEARED",
        "MSAT_SECOND_ATTEMPT_FAILED",
        "ONBOARDING_PENDING",
        "ONBOARDING_STARTED",
        "ONBOARDING_COMPLETE",
        "APPLICATION_CLOSED",
      ],
    },
    msatScore: {
      type: mongoose.Schema.Types.Mixed,
      default: [] // Set an empty array as the default value
    },
    courseEligibleFor: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    courseAppliedFor: { type: mongoose.Schema.Types.ObjectId, ref: "course", default: null },
    graduationYear: { type: Number, default: null },
    graduationMonth: { type: Number, default: null },
    dateOfBirth: { type: Date, default: null },
    isCurrentlyWorking: { type: Boolean, default: null },
    isAadhaarVerified: { type: Boolean, default: false },
    aadhaarId: { type: String, default: null },
    aadhaarName: { type: String, default: null },
    aadhaarDateOfBirth: { type: Date, default: null },
    areConsentsTaken: {
      type: Boolean,
      default: false,
    },
    joinedZoomAndSlack: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ApplicationModel = mongoose.model("application", applicationSchema);

module.exports = { ApplicationModel };
