const CustomError = require('./customError');
const twilio = require("twilio");

require("dotenv").config();

// Twilio account SID and auth-token;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);



const sendMessage = ({phoneNumber,message,next,res,newUser,sendOn}) =>{




    client.messages
    .create({
      body: message,
      to: phoneNumber, // User's phone number
      from: twilioPhoneNumber, // My Twilio Phone number
    })
    .then((message) => {


      console.log(`OTP sent to ${phoneNumber}. Message SID: ${message.sid}`);
    return res.status(200).send({ msg: "Signup successful. OTP sent!", "userData":{userId:newUser._id,sendOn} });
    })
    .catch((error) => {
        console.error(error);
        return next(new CustomError('Failed to send message', 500));
    });
} 

module.exports = sendMessage