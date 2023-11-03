const { ApplicationModel } = require("../models/Application.model");
const { UserModel } = require("../models/user.model");

async function createApplication(userId) {
  try {
    // Create a new application instance
    const newApplication = new ApplicationModel();

    // Update the application status
    newApplication.applicationStatus = "MSAT_PROGRESS";

    // Save the application to the database
    await newApplication.save();
    const user = await UserModel.findById(userId);
    user.applications.push(newApplication);
    user.save();
    return newApplication;
  } catch (error) {
    throw error; // Handle errors appropriately in your application
  }
}

module.exports = { createApplication };
