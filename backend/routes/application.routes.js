const { Router } = require("express");

const { ApplicationModel } = require("../models/Application.model");
const {
  getSingleApplicationById,
  msatPending,
  msatCleared,
  msatFailed,
  mSecPending,
  mSecProgress,
  mSecDecision,
  mSecCleared,
  mSecFailed,
  msatOnbording,
  consents,
  aadhaarImage,
  createApplication,
  msatProgress,
  consent,
  onbordingDone,
  courseAppliedFor,
} = require("../controllers/applicationController");

const { uploadingImage, MSATCallback, getResult } = require("../controllers/applicationController");
const { isAuthenticatedUser } = require("../middlewares/auth");

// Multer setup
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const applicationRouter = Router();

// applicationRouter.route("/upload").post(uploadingImage);

applicationRouter.route("/msatdata").post(MSATCallback);
applicationRouter.route("/get-result").post(isAuthenticatedUser, getResult);

// Get all applications
applicationRouter.get("/all", async (req, res) => {
  const applications = await ApplicationModel.find();
  res.send({ applications: applications });
});

// Get single application by it's id;
applicationRouter.route("/:applicationId").get(isAuthenticatedUser, getSingleApplicationById);

applicationRouter.route("/create").post(isAuthenticatedUser, createApplication);

// update 1st msat_progress api****************************************************************
applicationRouter.route("/msat1-progress").patch(isAuthenticatedUser, msatProgress);

//update 1st msat_descision_pending api****************************************************************
applicationRouter.route("/msat1-decision-pending").patch(isAuthenticatedUser, msatPending);

// update 1st msat_cleared status api****************************************************************
applicationRouter.route("/msat1-cleared").patch(isAuthenticatedUser, msatCleared);

// user selects course
applicationRouter.route("/select-course").patch(isAuthenticatedUser, courseAppliedFor); // TODO : change this

// update 1st msat_failed status api****************************************************************
applicationRouter.route("/msat1-failed").patch(isAuthenticatedUser, msatFailed);

// update 2nd msat_attempt _pending status api***********************************************************
applicationRouter.route("/msat2-pending").patch(isAuthenticatedUser, mSecPending);

// update 2nd msat_attempt _progress status api****************************************************************
applicationRouter.route("/msat2-progress").patch(isAuthenticatedUser, mSecProgress);

// update 2nd msat_attempt _Decision_pending status api***********************************************************
applicationRouter.route("/msat2-decision-pending").patch(isAuthenticatedUser, mSecDecision);

// update 2nd msat_attempt _cleaared status api****************************************************************
applicationRouter.route("/msat2-cleared").patch(isAuthenticatedUser, mSecCleared);

// update 2nd msat_attempt _failed status api****************************************************************
applicationRouter.route("/msat2-failed").patch(isAuthenticatedUser, mSecFailed);

//user selection of dob-working-graduation-onbording api****************************************************************************
applicationRouter
  .route("/onboarding-dob-working-graduation")
  .patch(isAuthenticatedUser, msatOnbording);

//consents api***************************************************************
applicationRouter.route("/onboarding-consents").patch(isAuthenticatedUser, consent);

//zoomandslack api****************************************************************************

applicationRouter.route("/onboarding-zoom").patch(isAuthenticatedUser, onbordingDone);

//Aadhar Validation*************************************************************
applicationRouter
  .route("/onboarding-aadhaar-upload")
  .patch(upload.array("images", 2), isAuthenticatedUser, aadhaarImage);

module.exports = { applicationRouter };
