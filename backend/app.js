const express = require("express");
// const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");

require("dotenv").config();

// Local imports
const { UserModel } = require("./models/user.model.js");

// Configurations
app.use(express.json());
// app.use(cookieParser());

app.use(
  cors({
    origin: "*",
  })
);

// Use express-session to store the OTP for verification | also storing session in mongoStore;

// const sessionStore = MongoStore.create({
//   mongoUrl: process.env.MONGO_URL,
//   collectionName: "sessions", // Optional: specify a collection name for sessions
//   ttl: 10 * 60, // = 10 min. Default is 10 min. Set the session expiration time
// });

// sessionStore.on("error", (error) => {
//   console.error("SESSION STORE ERROR:", error);
// });

// app.use(
//   session({
//     secret: "masai",
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//   })
// );

// route imports
const userRoute = require("./routes/user.routes");
const { courseRouter } = require("./routes/course.routes");
const { eventRouter } = require("./routes/event.routes");
const { applicationRouter } = require("./routes/application.routes");
const errorHandlerMid = require("./middlewares/errorHandlerMiddleware.js");

app.get(`/`, (req, res) => {
  res.send("BASE API ENDPOINT");
});

// Using Routes

app.use("/courses", courseRouter);
app.use("/events", eventRouter);
app.use("/user", userRoute);
app.use("/applications", applicationRouter);

// course sellection onbording pending********************************************************************

// Middleware for error handling

app.use(errorHandlerMid);

module.exports = app;
