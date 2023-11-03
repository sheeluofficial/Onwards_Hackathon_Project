import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import "./CustomCSS/OTPVerification.css"; // Import a custom CSS file for styling
import { useUserContext } from "../context/user_context";
import axios from "axios";
function OTPVerification({ sendOn }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const otpInputs = useRef([]);
  const { validateOtp } = useUserContext();
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    setIsButtonDisabled(otp.some((digit) => digit === ""));
  }, [otp]);

  const handleResendOTP = () => {
    // Logic to resend OTP here
    // You can implement your API call or other logic here
    // For the example, we just reset the timer
    setTimer(30);
  };

  const handleVerify = () => {
    // Logic to verify OTP here
    // You can implement your OTP verification logic here
    // For the example, we're just logging the OTP
    const otpValue = +otp.join("");
    console.log(`OTP Verified: ${otpValue}`);

    validateOtp(otpValue);
  };

  const handleDigitChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input cell when a digit is entered
    if (value !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index, event) => {
    // Delete the last entered digit without clearing the entire cell
    if (event.key === "Backspace" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to the previous input cell
      if (index > 0) {
        otpInputs.current[index - 1].focus();
      }
    }
  };

  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="xl">Enter OTP</Text>
      <Box display="flex" justifyContent="center">
        {otp.map((digit, index) => (
          <input
            borderRadius="20px"
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleDigitChange(index, e.target.value)}
            maxLength={1}
            className="otp-input" // Apply custom CSS class
            ref={(input) => {
              otpInputs.current[index] = input;
            }}
            onKeyDown={(e) => handleBackspace(index, e)}
          />
        ))}
      </Box>
      <Button mt={4} colorScheme="teal" isDisabled={isButtonDisabled} onClick={handleVerify}>
        Verify
      </Button>
      <Text mt={2}>
        Resend OTP in {timer} seconds
        <Button
          ml={2}
          size="xs"
          colorScheme="teal"
          onClick={handleResendOTP}
          isDisabled={timer > 0}
        >
          Resend
        </Button>
      </Text>
      <Text mt={2}>OTP sent on {sendOn === "email" ? "Email" : "Mobile"}</Text>
    </Box>
  );
}

export default OTPVerification;
