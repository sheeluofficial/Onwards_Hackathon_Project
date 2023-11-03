// Packages imported
const app = require("./app.js");
require("dotenv").config();
const connection = require("./config/db.js");

// uncaught Exceptions

process.on("uncaughtException",(err)=>{
  console.log(`Error ${err.message}`)
  console.log("Shutting down the server due to uncaught Exceptions")
  process.exit(1)
  // server.close(()=>{
  //     process.exit(1)
  // })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB successfully!");
  } catch (error) {
    console.log(`error while connecting to DB`);
    console.log(error);
  }
  console.log(`listening on port ${PORT}`);
});

// Unhandled Promise Rejections

process.on("unhandledRejection",(err)=>{
  console.log(`Error ${err.message}`)
  console.log("Shutting down the server due to unhandled Promise Rejection")
  server.close(()=>{
      process.exit(1)
  }) 
});
