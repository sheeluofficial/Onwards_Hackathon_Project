# Onward hackathon Project

---


## Introduction

---

Embark on a seamless learning journey with our MERN stack platform, inspired by the best! Enjoy an intuitive experience with features like secure User Authentication, OTP verification, effortless signup, course eligibility based on tests, document uploads, Aadhar validation, and event updates. Our platform ensures a smooth experience akin to MERN stack giants. Dive in and explore a world of educational possibilities!

## Tech Stack

![MongoDB](https://img.shields.io/badge/-MongoDB-green) ![Express](https://img.shields.io/badge/-Express-blue) ![React](https://img.shields.io/badge/-React-blue) ![Node.js](https://img.shields.io/badge/-Node.js-green) ![Mongoose](https://img.shields.io/badge/-Mongoose-green) ![CSS3](https://img.shields.io/badge/-CSS3-blue) ![React-Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## Project Configuration Guide

### Twillio Configuration

- Nodemailer is used for sending Mobile messages. Follow these steps to configure Twillio
- Create account on twillio https://www.twilio.com/.
- Go to the dashboard and copy TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER .
- Go to .env file and save TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER.

### Nodemailer Configuration

- Nodemailer is used for sending emails. Follow these steps to configure Nodemailer for your project.
- Create a Gmail account [here](https://mail.google.com/).
- Go to the account settings and enable the Less Secure App Access.
- Go to the dashboard and copy the email and password.
- Go to .env file and save SMTP_MAIL and SMTP_PASS.
- If you are using Gmail, you can directly copy the email and password. If you are using any other email service, you need to copy the SMTP host, port, and service.
- Repl

### MongoDB Configuration

- MongoDB is used for storing data. Follow these steps to configure MongoDB for your project.
- Create a MongoDB account [here](https://www.mongodb.com/).
- Create a new project and cluster.
- Go to the dashboard and copy the connection string.
- Go to .env file and save MONGO_URL.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/sheeluofficial/Onwards_Hackathon_Project.git
    cd Onwards_Hackathon_Project
    ```
2.  Install dependencies:
    ```bash
    cd backend
    npm install
    cd client
    npm install
    cd ..
    ```
3.  Create a `.env` file inside the root backend folder and add the following:


    ````bash
     PORT = 5000
     MONGO_URL=
    TWILIO_ACCOUNT_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_PHONE_NUMBER=
    COOKIE_EXPIRE =
    JWT_SECRET =
    SMTP_SERVICE =
    SMTP_HOST =
    SMTP_MAIL =
    SMTP_PASSWORD =````

4.  Run the app:

    ```bash
    cd backend
    npm run dev
    cd ../frontend
    npm start
    ```

    ## Features

### Normal User Feature

| Feature             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| User Authentication | OAuth with JWT for secure user login and registration        |
| OTP authentication  | User will be authenticated with otp without password         |
| Signup              | On signup OTP will be sent on mobile                         |
| Signin              | On signin otp will be sent on entered value email/phone      |
| Test attempt        | User can attempt the test on https://assess.masaischool.com/ |
| Eligible courses    | user will be shown the course, eligible for based on test    |
| Document upload     | User Can upload documents  for addmission                    |
| Adhar validation    | Adhar will be validated on backend                           |
| Events              | User can see upcoming events and webinar                     |


## Upcoming Features

### Normal User Mode

| Feature                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| Free learning resourses | Free learning resourses availability               |
| Event Reminder          | Email reminder for upcoming event                  |
| Certificate             | Certificate generation for courses completion      |
| Bookmark                | Bookmark tutorial            |

## Dependencies and Libraries

### Backend

| Dependency                              | Description                                           |
| --------------------------------------- | ----------------------------------------------------- |
| Package Name            | Description                                          |
|-------------------------|------------------------------------------------------|
| aadhaar-validator       | Validate Aadhaar numbers in your application         |
| bcrypt                  | Library for hashing passwords securely               |
| bcryptjs                | Hash passwords before storing                        |
| connect-mongo           | MongoDB session store for Express                    |
| cors                    | Enable Cross-Origin Resource Sharing                 |
| dotenv                  | Load environment variables from a .env file          |
| express                 | Web application framework for Node.js                |
| express-session         | Simple session middleware for Express                |
| jsonwebtoken            | Generate and verify JSON Web Tokens                  |
| mongoose                | MongoDB object modeling tool                         |
| multer                  | Middleware for handling `multipart/form-data`        |
| nodemailer              | Send email using Node.js                             |
| server                  | Package for building GraphQL APIs                    |
| sharp                   | High-performance image processing library            |
| tesseract.js            | OCR (Optical Character Recognition) for Node.js      |
| twilio                  | Send SMS and make phone calls using Twilio APIs      |
| validator               | Validate and sanitize user input                     |



## Additional Frontend Dependencies

Here are some additional frontend JavaScript packages and libraries used in this project:

| Package Name                    | Description                                              |
|---------------------------------|----------------------------------------------------------|
| @chakra-ui/icons                | Official icon library for Chakra UI                      |
| @chakra-ui/react                | Simple, modular and accessible component library         |
| @emotion/react                  | Hooks to use emotion in React                             |
| @emotion/styled                 | Styled components for emotion                             |
| @fontsource/poppins             | Google Font source for Poppins                            |
| @testing-library/jest-dom       | Custom Jest matchers for asserting on DOM nodes          |
| @testing-library/react          | Testing utilities for React applications                  |
| @testing-library/user-event     | Fire events that can be observed in your tests           |
| axios                           | Promise-based HTTP client for the browser and Node.js     |
| framer-motion                   | Production-ready motion library for React                  |
| hoist-non-react-statics         | Copy non-react specific statics from one object to another|
| prop-types                      | Runtime type checking for React props                     |
| react                           | JavaScript library for building user interfaces           |
| react-dom                       | Entry point to the React DOM rendering                    |
| react-icons                     | Popular icon library for React applications               |
| react-router-dom                | DOM bindings for React Router                             |
| react-scripts                   | Configurable scripts for Create React App                  |
| react-slick                     | React carousel component built with slick-carousel        |
| react-stepper-horizontal        | Horizontal stepper component for React applications       |
| slick-carousel                  | jQuery carousel plugin extended for React                  |
| web-vitals                      | Library for measuring all the Web Vitals metrics          |

Feel free to reach out if you have any questions or need further assistance with these dependencies.
