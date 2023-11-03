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
    FormHelperText
} from "@chakra-ui/react";
import CustomInput from "./CustomInput";
import OTPVerification from "./OTPVerifiaction";
// import { Link } from "react-router-dom";

const OTPVerifiactionPanel = ({ isOpen, onClose, otpMedium, sendOn }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none">
            <ModalOverlay />
            <ModalContent
                position="fixed"
                top={["10%", "10%", "0", "0"]}
                // right={}
                right={[0, 0, isOpen ? "0" : "-100%", isOpen ? "0" : "-100%"]}
                bottom={[isOpen ? "0" : "-100%", isOpen ? "0" : "-100%"]}
                transition={["bottom 5s ease-in-out", "bottom 5s ease-in-out", "right 1s ease-in-out", "right 1s ease-in-out"]}
                h={["90vh", "90vh", "auto", "auto"]}
                maxW={["100%", "100%", "35%", "35%"]}
                bgColor="white"
                borderTopLeftRadius={["40px", "40px", "0", "0"]}
                borderTopRightRadius={["40px", "40px", "0", "0"]}
                pb={["100px", "100px", "10px", "10px"]}

            >
                <ModalHeader>
                    <Text textStyle="h3">Verify {otpMedium}</Text>
                    <Text textStyle="body1-md">
                        Enter OTP send on {otpMedium} {sendOn} <Link color="#4358F6" textStyle="body1-md" ></Link>
                    </Text>
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody>

                    <OTPVerification></OTPVerification>

                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default OTPVerifiactionPanel;
