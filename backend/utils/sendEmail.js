const nodemailer = require('nodemailer');
const CustomError = require('./customError');
require("dotenv").config();
require('dotenv').config({ path: './src/config/config.env' });

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  }
});


// Send reset email
const sendEmail = async ({ email, message,res, next,subject, newUser,sendOn }) => {  // Added 'res' parameter
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);

  

   return res.status(200).json({ message: 'OTP Email send Successfully!',"userData":{userId:newUser._id,sendOn} });
  } catch (error) {
    console.error(error);
    return next(new CustomError('Failed to send OTP email', 500));
  }
};

module.exports = sendEmail;


