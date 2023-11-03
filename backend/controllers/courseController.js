const catchAsyncError = require("../middlewares/catchAsyncError");

// app.post("/save-course", async (req, res) => {
//     try {
//       const courseApplied = req.body.courseAppliedFor;
//       const userId = req.session.userId;
//       const user = await UserModel.findById(userId);

//       if (user.courseAppliedFor === courseApplied) {
//         return res.status(400).json({ error: "You are already enrolled in this course." });
//       }

//       // Update the courseAppliedFor field for the user
//       user.courseAppliedFor = courseApplied;
//       user.applicationStatus = "ONBOARDING_PENDING";
//       await user.save();

//       res.status(201).json(user); // Return the updated user object
//     } catch (error) {
//       console.error("Error saving course:", error);
//       res.status(500).json({ error: "An error occurred while saving the course." });
//     }
//   });

//   exports.createCourse=catchAsyncError(async(req,res,next)=>{

//     try {

//         const newCourse= await createCourse()

//         return res.json({ message: "Application created successfully", newCourse });
//       } catch (error) {
//         console.error("Error creating application:", error);
//         return res.status(500).json({ message: "Internal server error" });
//       }
//   })
