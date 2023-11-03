const { UserModel } = require("../models/user.model");
const { ApplicationModel } = require("../models/Application.model");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { application } = require("express");
const { createApplication } = require("../utils/appCreate");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const CustomError = require("../utils/customError");
const aadharValidator = require("aadhaar-validator");

// exports.uploadingImage = catchAsyncError(async (req, res, next) => {
//   const uploadedImages = req.files;

//   if (!uploadedImages || uploadedImages.length < 1) {
//     return next(CustomError("At least one image is required", 400));
//   }

//   try {
//     const frontImage = uploadedImages[0]; // First image (Aadhar front)

//     // Process the front image
//     const processedFrontImageBuffer = await sharp(frontImage.buffer)
//       .resize(800) // Adjust the size as needed
//       .normalize() // Enhance contrast
//       .toBuffer();
//     // Perform OCR on the processed front image
//     const frontOcrResult = await Tesseract.recognize(processedFrontImageBuffer, "eng", {
//       logger: (info) => console.log(info),
//     });

//     // Log the OCR result
//     console.log("OCR Result:", frontOcrResult.data.text);

//     // Extract Aadhar card number from the front image using regular expressions
//     const aadharRegex = /\b(\d{4}\s\d{4}\s\d{4})\b/g;

//     const frontAadharMatches = frontOcrResult.data.text.match(aadharRegex);

//     const frontAadharNumberWithSpaces = frontAadharMatches ? frontAadharMatches[0] : "";

//     // Remove spaces from the extracted Aadhar card number
//     const frontAadharNumber = frontAadharNumberWithSpaces.replace(/\s/g, "");

//     // Validate the Aadhar card number
//     const isValidFrontAadhar = validateAadharNumber(frontAadharNumber);

//     // Get the user based on userId from the session
//     const userId = req.session.userId;
//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return next(CustomError("User does not exist", 404));
//     }

//     // If Aadhar card is valid, update the user document
//     if (isValidFrontAadhar) {
//       // Update the user document with verified Aadhar information
//       user.aadhaarId = frontAadharNumber;
//       user.aadhaarName = user.name;
//       user.aadhaarDateOfBirth = user.dateOfBirth;
//       user.isAadhaarVerified = true;
//       user.applicationStatus = "ONBOARDING_STARTED";
//       // Save the updated user document
//       await user.save();

//       return res.json({ message: "Aadhar card verified successfully", user });
//     } else {
//       return next(CustomError("Aadhar card validation failed", 401));
//     }
//   } catch (error) {
//     return next(CustomError("Error Processing the image", 500));
//   }
// });

// MSAT callback handler

exports.MSATCallback = catchAsyncError(async (req, res, next) => {
  try {
    const callbackData = req.body;
    const userId = callbackData.uniqueID;

    console.log(uniqueID);

    let MsatScores = [];
    if (callbackData.sectionalScores != undefined && callbackData.sectionalScores.length != 0) {
      for (let i = 0; i < callbackData.sectionalScores.length; i++) {
        let obj = {
          sectionName: callbackData.sectionalScores[i].sectionName,
          scoredMarks: callbackData.sectionalScores[i].sectionScore,
          maxMarks: callbackData.sectionalScores[i].sectionMaxMarks,
          cutOff: callbackData.sectionalScores[i].sectionMaxMarks / 2,
          result:
            callbackData.sectionalScores[i].sectionMaxMarks / 2 <
            callbackData.sectionalScores[i].sectionScore
              ? "Passed"
              : "Not Clear",
        };
        MsatScores.push(obj);
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get the last application ID from the user's applications array
      const lastApplicationId =
        user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

      if (!lastApplicationId) {
        return res.status(404).json({ message: "No applications found for the user" });
      }

      // Find the application by its ID
      const application = await ApplicationModel.findById(lastApplicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found" });
      }

      application.msatScore = MsatScores;
      application.save();

      return res.json({ message: "Callback data saved successfully", application });
    }

    return res.json({ message: "MSAT data is undefined" });
  } catch (error) {
    console.error(error);
    return next(CustomError("Error Saving MSAT callback data", 500));
  }
});

// Get result

exports.getResult = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  //const userId  = req.session.userId;
  // Find the user by their ID
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Get the last application ID from the user's applications array
  const lastApplicationId =
    user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

  if (!lastApplicationId) {
    return res.status(404).json({ message: "No applications found for the user" });
  }

  // Find the application by its ID
  const application = await ApplicationModel.findById(lastApplicationId);
  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  return res.status(200).send({ message: "Result details found", Result: application.msatScore });
});

// update 1st msat_progress api****************************************************************
exports.msatProgress = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_PROGRESS";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//update 1st msat_descision_pending api****************************************************************
exports.msatPending = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user", application });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_DECISION_PENDING";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 1st msat_cleared status api****************************************************************
exports.msatCleared = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_CLEARED";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update courseAppliedFor
// api ****************************************************************
exports.courseAppliedFor = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.courseAppliedFor = courseId;

    // Save the updated application
    await application.save();

    return res.json({ message: "course selected successfully", application });
  } catch (error) {
    console.error("Error updating course selection:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 1st msat_failed status api****************************************************************
exports.msatFailed = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_FAILED";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 2nd msat_attempt _pending status api***********************************************************
exports.mSecPending = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_SECOND_ATTEMPT_PENDING";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 2nd msat_attempt _progress status api****************************************************************
exports.mSecProgress = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_SECOND_ATTEMPT_PROGRESS";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 2nd msat_attempt _Decision_pending status api***********************************************************
exports.mSecDecision = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_SECOND_ATTEMPT_DECISION_PENDING";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 2nd msat_attempt _cleaared status api****************************************************************
exports.mSecCleared = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_SECOND_ATTEMPT_CLEARED";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// update 2nd msat_attempt _failed status api****************************************************************
exports.mSecFailed = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the application status
    application.applicationStatus = "MSAT_SECOND_ATTEMPT_FAILED";

    // Save the updated application
    await application.save();

    return res.json({ message: "Application status updated successfully", application });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//msatOnbording***********************************************
exports.msatOnbording = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;
    const { dateOfBirth, graduationMonthYear, isCurrentlyWorking } = req.body;
    // Date - ISO 8601, "2023-08", "yes","no"

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!dateOfBirth || !graduationMonthYear || !isCurrentlyWorking) {
      return res.json({
        message: "Please pass dateOfBirth,graduationMonthYear,isCurrentlyWorking",
      });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    

    // Parse graduationMonthYear from YY/MM format
    //made the changes here
    const [graduationYear, graduationMonth] = graduationMonthYear.split("-");

    // Parse isCurrentlyWorking as a boolean (true for 'yes', false for 'no')
    const isCurrentlyWorkingInBoolean = isCurrentlyWorking === "yes";

    // Update the user's properties
    application.graduationMonth = Number(graduationMonth);
    application.graduationYear = Number(graduationYear);
    application.isCurrentlyWorking = isCurrentlyWorkingInBoolean;
    application.applicationStatus = "ONBOARDING_STARTED";
    // Save the formatted dateOfBirth in the specified format (YY/MM/DD)
    application.dateOfBirth = dateOfBirth;

    // Save the updated user object to the database
    await application.save();

    // Send a success response
    res.status(200).json({ message: "User is successfully updated.", application });
  } catch (error) {
    console.error("Error updating values in the database:", error);
    res.status(500).json({ error: "An error occurred while updating values in the database." });
  }
});

//consents api***************************************************************
exports.consent = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the user's areConsentsTaken to true
    application.areConsentsTaken = true;
    application.applicationStatus = "ONBOARDING_STARTED";
    // Save the updated application document
    await application.save();

    res.json({ message: "Consents have been taken", user, application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating consents" });
  }
});

exports.onbordingDone = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the user's joinedZoomAndSlack to true
    application.joinedZoomAndSlack = true;
    application.applicationStatus = "ONBOARDING_COMPLETE";
    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Send additional information in the response
    res.json({
      message: "Consents have been taken and joined Zoom and Slack",
      userName: user.name,
      //courseAppliedFor: user.courseAppliedFor,
      currentDate: today, // Convert to ISO format for consistency
      user,
    });

    // Save the updated user document
    await application.save();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating consents and joining Zoom and Slack" });
  }
});

//create Application*************************************************
exports.createApplication = catchAsyncError(async (req, res, next) => {
  try {
    // Create a new application using the createApplication method
    const newApplication = await createApplication(req.userId);

    return res.json({ message: "Application created successfully", application: newApplication });
  } catch (error) {
    console.error("Error creating application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//create Application*************************************************
exports.getSingleApplicationById = catchAsyncError(async (req, res, next) => {
  const applicationId = req.params["applicationId"];
  const application = await ApplicationModel.findById(applicationId).populate("courseAppliedFor");

  if (!application) {
    return res.status(404).send("application not found");
  }

  res.status(200).json({ application });
});

//aadhaar Validation********************************************************
exports.aadhaarImage = catchAsyncError(async (req, res, next) => {
  const uploadedImages = req.files;

  if (!uploadedImages || uploadedImages.length < 1) {
    return res.status(400).json({ error: "At least one image is required" });
  }

  try {
    const frontImage = uploadedImages[0]; // First image (Aadhar front)

    // Process the front image
    const processedFrontImageBuffer = await sharp(frontImage.buffer)
      .resize(800) // Adjust the size as needed
      .normalize() // Enhance contrast
      .toBuffer();

    // Perform OCR on the processed front image
    const frontOcrResult = await Tesseract.recognize(processedFrontImageBuffer, "eng", {
      logger: (info) => console.log(info),
    });

    // Log the OCR result
    console.log("OCR Result:", frontOcrResult.data.text);

    // Extract Aadhar card number, name, and date of birth from the front image using regular expressions
    const aadharRegex = /\b(\d{4}\s\d{4}\s\d{4})\b/g;

    const frontAadharMatches = frontOcrResult.data.text.match(aadharRegex);
    const lines = frontOcrResult.data.text.split("\n");

    const frontAadharNumberWithSpaces = frontAadharMatches ? frontAadharMatches[0] : "";

    // Extract the name from the 6th line (assuming names are consistently found there)
    const frontName = lines.length > 6 ? lines[5].trim() : "";

    // Extract date of birth if it starts with "DOB:"
    let frontAadhaarDateOfBirth = null;
    for (const line of lines) {
      if (line.includes("DOB")) {
        // Extract the date string following "DOB:" and remove any unwanted characters
        const dobString = line.split("DOB:")[1].trim();
        // Assuming dobString is in the format "dd/mm/yyyy", you can convert it to a Date object
        const dobParts = dobString.split("/");
        const day = parseInt(dobParts[0]);
        const month = parseInt(dobParts[1]) - 1; // Months are 0-indexed
        const year = parseInt(dobParts[2]);
        frontAadhaarDateOfBirth = new Date(year, month, day);
        break;
      } else if (line.includes("YoB:")) {
        // Extract the year string following "YoB:" and convert it to an integer
        const yearString = line.split("YoB:")[1].trim();
        const year = parseInt(yearString);
        frontAadhaarDateOfBirth = year.toString(); // Save the year as a string
        break;
      }
    }

    // Remove spaces from the extracted Aadhar card number
    const frontAadharNumber = frontAadharNumberWithSpaces.replace(/\s/g, "");

    // Validate the Aadhar card number
    // const isValidFrontAadhar = validateAadharNumber(frontAadharNumber);
    const isValidFrontAadhar = aadharValidator.isValidNumber(frontAadharNumber);

    const userId = req.userId;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last application ID from the user's applications array
    const lastApplicationId =
      user.applications.length > 0 ? user.applications[user.applications.length - 1] : null;

    if (!lastApplicationId) {
      return res.status(404).json({ message: "No applications found for the user" });
    }

    // Find the application by its ID
    const application = await ApplicationModel.findById(lastApplicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // If Aadhar card is valid, update the user document
    if (isValidFrontAadhar) {
      // Update the user document with verified Aadhar information
      application.aadhaarId = frontAadharNumber;
      application.aadhaarName = frontName; // Set the extracted name here
      application.aadhaarDateOfBirth = frontAadhaarDateOfBirth; // Set the extracted date of birth here
      application.isAadhaarVerified = true;
      application.applicationStatus = "ONBOARDING_STARTED";
      // Save the updated application document
      await application.save();

      res.json({
        message: "Aadhar card verified successfully",
        application,
        user: {
          aadhaarId: frontAadharNumber,
          aadhaarName: frontName,
          aadhaarDateOfBirth: frontAadhaarDateOfBirth,
        },
      });
    } else {
      res.json({ message: "Aadhar card validation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing the image" });
  }
});

// // update 1st msat_progress api****************************************************************
// exports.msatProgress = catchAsyncError(async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_PROGRESS";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully", application });

//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// //update 1st msat_descision_pending api****************************************************************
// exports.msatPending = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_DECISION_PENDING";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully", application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 1st msat_cleared status api****************************************************************
// exports.msatCleared = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_CLEARED";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully", application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 1st msat_failed status api****************************************************************
// exports.msatFailed = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_FAILED";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully",application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 2nd msat_attempt _pending status api***********************************************************
// exports.mSecPending = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_SECOND_ATTEMPT_PENDING";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully", application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 2nd msat_attempt _progress status api****************************************************************
// exports.mSecProgress = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_SECOND_ATTEMPT_PROGRESS";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully",application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 2nd msat_attempt _Decision_pending status api***********************************************************
// exports.mSecDecision = catchAsyncError(async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_SECOND_ATTEMPT_DECISION_PENDING";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully",application });

//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 2nd msat_attempt _cleaared status api****************************************************************
// exports.mSecCleared = catchAsyncError(async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_SECOND_ATTEMPT_CLEARED";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully",application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// // update 2nd msat_attempt _failed status api****************************************************************
// exports.mSecFailed = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the application status
//     application.applicationStatus = "MSAT_SECOND_ATTEMPT_FAILED";

//     // Save the updated application
//     await application.save();

//     return res.json({ message: "Application status updated successfully",application });
//   } catch (error) {
//     console.error("Error updating application status:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// //msatOnbording***********************************************
// exports.msatOnbording = catchAsyncError(async (req, res, next) => {
//   try {
//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Parse dateOfBirth from YY/MM/DD format
//     const dateOfBirth = req.body.dateOfBirth || "";
//     const [yearOfBirth, monthOfBirth, dayOfBirth] = dateOfBirth.split("/");

//     // Parse graduationMonthYear from YY/MM format
//     const graduationMonthYear = req.body.graduationMonthYear || "";
//     const [graduationYear, graduationMonth] = graduationMonthYear.split("/");

//     // Parse isCurrentlyWorking as a boolean (true for 'yes', false for 'no')
//     const isCurrentlyWorking = req.body.isCurrentlyWorking === "yes";

//     // Convert dateOfBirth to YY/MM/DD format
//     const formattedDateOfBirth = `${yearOfBirth}/${monthOfBirth}/${dayOfBirth}`;

//     // Update the user's properties
//     application.graduationMonth = graduationMonth;
//     application.graduationYear = graduationYear;
//     application.isCurrentlyWorking = isCurrentlyWorking;
//     application.applicationStatus = "ONBOARDING_STARTED";
//     // Save the formatted dateOfBirth in the specified format (YY/MM/DD)
//     application.dateOfBirth = formattedDateOfBirth;

//     // Save the updated user object to the database
//     await application.save();

//     // Send a success response
//     res.status(200).json({ message: "User is successfully updated.", application });
//   } catch (error) {
//     console.error("Error updating values in the database:", error);
//     res.status(500).json({ error: "An error occurred while updating values in the database." });
//   }
// });

// //consents api***************************************************************
// exports.consent = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the user's areConsentsTaken to true
//     application.areConsentsTaken = true;
//     application.applicationStatus = "ONBOARDING_STARTED";
//     // Save the updated application document
//     await application.save();

//     res.json({ message: "Consents have been taken", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while updating consents",application });
//   }
// });

// exports.onbordingDone = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // Update the user's joinedZoomAndSlack to true
//     application.joinedZoomAndSlack = true;
//     application.applicationStatus = "ONBOARDING_COMPLETE";
//     // Get today's date
//     const today = new Date().toISOString().split("T")[0];
//     // Send additional information in the response

//     // Save the updated user document
//     await application.save();

//     res.json({
//       message: "Consents have been taken and joined Zoom and Slack",
//       //courseAppliedFor: user.courseAppliedFor,
//       currentDate: today, // Convert to ISO format for consistency
//       application
//     });

//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating consents and joining Zoom and Slack" });
//   }
// });

// exports.createApplication = catchAsyncError(async (req, res, next) => {
//   try {

//     const userId = req.userId;

//     // Create a new application using the createApplication method
//     const newApplication = await createApplication(userId);

//     return res.json({ message: "Application created successfully", application: newApplication });
//   } catch (error) {
//     console.error("Error creating application:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// //aadhaar Validation********************************************************
// exports.aadhaarImage = catchAsyncError(async (req, res, next) => {
//   const uploadedImages = req.files;

//   if (!uploadedImages || uploadedImages.length < 1) {
//     return res.status(400).json({ error: "At least one image is required" });
//   }

//   try {
//     const frontImage = uploadedImages[0]; // First image (Aadhar front)

//     // Process the front image
//     const processedFrontImageBuffer = await sharp(frontImage.buffer)
//       .resize(800) // Adjust the size as needed
//       .normalize() // Enhance contrast
//       .toBuffer();

//     // Perform OCR on the processed front image
//     const frontOcrResult = await Tesseract.recognize(processedFrontImageBuffer, "eng", {
//       logger: (info) => console.log(info),
//     });

//     // Log the OCR result
//     console.log("OCR Result:", frontOcrResult.data.text);

//     // Extract Aadhar card number, name, and date of birth from the front image using regular expressions
//     const aadharRegex = /\b(\d{4}\s\d{4}\s\d{4})\b/g;

//     const frontAadharMatches = frontOcrResult.data.text.match(aadharRegex);
//     const lines = frontOcrResult.data.text.split("\n");

//     const frontAadharNumberWithSpaces = frontAadharMatches ? frontAadharMatches[0] : "";

//     // Extract the name from the 6th line (assuming names are consistently found there)
//     const frontName = lines.length > 6 ? lines[5].trim() : "";

//     // Extract date of birth if it starts with "DOB:"
//     let frontAadhaarDateOfBirth = null;
//     for (const line of lines) {
//       if (line.includes("DOB:")) {
//         // Extract the date string following "DOB:" and remove any unwanted characters
//         const dobString = line.split("DOB:")[1].trim();
//         // Assuming dobString is in the format "dd/mm/yyyy", you can convert it to a Date object
//         const dobParts = dobString.split("/");
//         const day = parseInt(dobParts[0]);
//         const month = parseInt(dobParts[1]) - 1; // Months are 0-indexed
//         const year = parseInt(dobParts[2]);
//         frontAadhaarDateOfBirth = new Date(year, month, day);
//         break;
//       } else if (line.includes("YoB:")) {
//         // Extract the year string following "YoB:" and convert it to an integer
//         const yearString = line.split("YoB:")[1].trim();
//         const year = parseInt(yearString);
//         frontAadhaarDateOfBirth = year.toString(); // Save the year as a string
//         break;
//       }
//     }

//     // Remove spaces from the extracted Aadhar card number
//     const frontAadharNumber = frontAadharNumberWithSpaces.replace(/\s/g, "");

//     // Validate the Aadhar card number
//     const isValidFrontAadhar = validateAadharNumber(frontAadharNumber);

//     const userId = req.userId;

//     // Find the application by its ID
//     const application = await ApplicationModel.findOne({userId:userId});

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     // If Aadhar card is valid, update the user document
//     if (isValidFrontAadhar) {
//       // Update the user document with verified Aadhar information
//       application.aadhaarId = frontAadharNumber;
//       application.aadhaarName = frontName; // Set the extracted name here
//       application.aadhaarDateOfBirth = frontAadhaarDateOfBirth; // Set the extracted date of birth here
//       application.isAadhaarVerified = true;
//       application.applicationStatus = "ONBOARDING_STARTED";
//       // Save the updated application document
//       await application.save();

//       res.json({
//         message: "Aadhar card verified successfully",
//         application,
//         user: {
//           aadhaarId: frontAadharNumber,
//           aadhaarName: frontName,
//           aadhaarDateOfBirth: frontAadhaarDateOfBirth,
//         },
//       });
//     } else {
//       res.json({ message: "Aadhar card validation failed", frontAadharNumber });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error processing the image" });
//   }
// });
