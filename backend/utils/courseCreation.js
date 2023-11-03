const { CourseModel } = require('./courseModel'); // Import your CourseModel



async function createCourse(courseData) {
    try {
      // Create a new instance of the Course model with the provided data
      const newCourse = new CourseModel(courseData);
  
      // Save the new course to the database
      const savedCourse = await newCourse.save();
  
      return savedCourse; // Return the saved course
    } catch (error) {
      throw error; // Handle the error appropriately in your application
    }
  }