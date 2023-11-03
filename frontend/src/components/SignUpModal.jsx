import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Link,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import CustomInput from "./CustomInput";
import OTPVerifiactionPanel from "./OTPVerificationPanel";
import { useUserContext } from "../context/user_context";
// import { Link } from "react-router-dom";
   
const SignUpModal = ({ isOpen, onClose, openOTPModal, openSigninModal }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [referral, setReferral] = useState("");
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const {registerUser} = useUserContext()
  // async function registerUser() {
  //   try {
  //     let response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: fullName,
  //         email: email,
  //         phoneNumber: mobileNumber,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (data.message === "Failed to send message") {
  //       toast.closeAll();
  //       toast({
  //         status: "success",
  //         title: "Account Created Successfully",
  //         position: "top",
  //       });
  //       setEmail("");
  //       setFullName("");
  //       setMobileNumber("");
  //     } else {
  //       toast({
  //         status: "error",
  //         title: data.message,
  //         position: "top",
  //       });
  //     }
  //   } catch (error) {
  //     toast({
  //       status: "error",
  //       title: error.message,
  //     });
  //   }
  // }
  const handleSubmit = () => {
    
    registerUser(fullName,email,mobileNumber);
    onClose();
    openOTPModal()
  };

  const handleBlur = () => {
    // Check for validation when the input field loses focus (onBlur)
    if (!mobileNumber) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none">
      <ModalOverlay />
      <ModalContent
        position="fixed"
        top={["10%", "10%", "0", "0"]}
        // right={}
        right={[0, 0, isOpen ? "0" : "-100%", isOpen ? "0" : "-100%"]}
        bottom={[isOpen ? "0" : "-100%", isOpen ? "0" : "-100%"]}
        transition={[
          "bottom 5s ease-in-out",
          "bottom 5s ease-in-out",
          "right 1s ease-in-out",
          "right 1s ease-in-out",
        ]}
        h={["90vh", "90vh", "auto", "auto"]}
        maxW={["100%", "100%", "35%", "35%"]}
        bgColor="white"
        borderTopLeftRadius={["40px", "40px", "0", "0"]}
        borderTopRightRadius={["40px", "40px", "0", "0"]}
        pb={["100px", "100px", "10px", "10px"]}
      >
        <ModalHeader>
          <Text textStyle="h3">Create Account</Text>
          <Text textStyle="body1-md">
            Already have an account?{" "}
            <Link onClick={openSigninModal} color="#4358F6" textStyle="body1-md">
              Sign in
            </Link>
          </Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <CustomInput
            type="text"
            placeholder="Enter Full Name"
            label="Full Name"
            value={fullName}
            setValue={setFullName}
          ></CustomInput>

          <CustomInput
            type="email"
            placeholder="Enter Email"
            label="Email"
            value={email}
            setValue={setEmail}
          ></CustomInput>

          <CustomInput
            type="tel"
            placeholder="Enter Mobile Number"
            label="Mobile Number"
            value={mobileNumber}
            setValue={setMobileNumber}
          ></CustomInput>

          <FormControl mb={4}>
            <FormLabel>Referral</FormLabel>
            <Input
              required={true}
              type="text"
              placeholder="Enter referral code (if any)"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button w="90%" m="auto" size="lg" variant="primary" onClick={handleSubmit}>
            Continue
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
