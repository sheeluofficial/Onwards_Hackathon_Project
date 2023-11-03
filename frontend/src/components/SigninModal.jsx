import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Link,
} from "@chakra-ui/react";
import CustomInput from "./CustomInput";
import { useUserContext } from "../context/user_context";

// import { Link } from "react-router-dom";

const SignInModal = ({ isOpen, onClose, openOTPModal, openLoginModal }) => {
    const [signInData, setSignInData] = useState("");
    
    const {LoginSignupCallbackData,setLoginSignupCallbackData,loginUser}=useUserContext()
   
     
  



    //   const isError = fullName === '';
    const handleSubmit = () => {
   try{
    loginUser(signInData)
    onClose();
        
    openOTPModal()


   }catch(er){
     alert("user not login")
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
                transition={["bottom 5s ease-in-out", "bottom 5s ease-in-out", "right 1s ease-in-out", "right 1s ease-in-out"]}
                h={["90vh", "90vh", "auto", "auto"]}
                maxW={["100%", "100%", "35%", "35%"]}
                bgColor="white"
                borderTopLeftRadius={["40px", "40px", "0", "0"]}
                borderTopRightRadius={["40px", "40px", "0", "0"]}
                pb={["100px", "100px", "10px", "10px"]}

            >
                <ModalHeader>
                    <Text textStyle="h3">Sign In</Text>
                    <Text textStyle="body1-md">
                        New User? <Link onClick={openLoginModal} color="#4358F6" textStyle="body1-md" >Sign up</Link>
                    </Text>
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody>

                    <CustomInput
                        type="text"
                        placeholder="Email or Mobile Number"
                        label=" Enter Email or Mobile Number"
                        value={signInData}
                        setValue={setSignInData}
                    ></CustomInput>

                </ModalBody>
                <ModalFooter>
                    <Button w='90%' m="auto" size="lg" variant="primary" onClick={handleSubmit}>
                        Continue
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SignInModal;
