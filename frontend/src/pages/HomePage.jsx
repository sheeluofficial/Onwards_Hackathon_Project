import React, { useState } from 'react'

import { Box, Button, Flex, Heading, Text, Image } from '@chakra-ui/react'
import vector_svg from "../assets/Vector 145.svg"
import vector_147 from "../assets/Vector 147.svg";
import rewiever_bg from "../assets/bg.svg";
import reviewer from "../assets/Harshit Tripathi 1.svg";
import company_logo from "../assets/Company_logo.svg";
import OTPVerifiactionPanel from '../components/OTPVerificationPanel';
import useLogin from '../hooks/useLogin';
import SignInModal from '../components/SigninModal';
import useSignin from '../hooks/useSignin';
import SignUpModal from '../components/SignUpModal';
function HomePage() {
console.log(process.env.REACT_APP_BASE_URL)
    const { isLoginModalOpen, isOTP, openLoginModal, openOTPPanel, closeLoginModal, closeOTPPanel } = useLogin();
    const { openSignInModal, closeSignOTPPanel, openSignOTPPanel, closeSigninModal, isSignOTP, isSigninModalOpen } = useSignin();



    // Function for Opening sign in Modal from login modal 

    const openSignInModalFromLoginModal = () => {
        openSignInModal()
        closeLoginModal()
    }

    // Function for Opening log in Modal from Sign in modal 
    const openLogInModalFromSigninModal = () => {
        openLoginModal();
        closeSigninModal();
    }



    return (
        <Box w="100vw" pt={["70px", "70px", "70px", "88px"]}>


            <Flex gap={["30px", "30px", "30px", "0"]} bg=" #FCFAFA" align={["center", "center", "center"]} justify={["flex-start", "flex-start", "flex-start", "space-between"]} direction={["column", "column", "column", "row"]} w="100%" h={["850px", "850px", "750px", "660px"]}>
                <Box textAlign={["center", "center", "center", "start"]} as={Flex} justify="space-around" direction="column" align={["center", "center", "center", "start", "start"]} h={["209px", "209px", "209px", "350px"]} ml={["0", "0", "0", "80px"]} w={["376px", "376px", "376px", "42%"]} alignSelf={["center", "center", "center", "start"]} pt={["0", "0", "0", "60px"]}  >


                    <Heading mb={["10px", "10px", "10px", "0"]} w="100%"
                        fontWeight={["700", "700", "700", "800"]}
                        fontSize={["24px", "24px", "24px", "48px"]}
                        lineHeight={["32px", "32px", "32px", "62px"]}
                        fontFamily="Poppins"
                    >

                        Realise Your Poterntial With&#160;
                        <Heading display="inline" position="relative" color='#ED0331'>
                            Assured Outcomes
                            <Image position="absolute" left={["0px"]} top={["30px", "30px", "30px", "28px"]} h="14px" w={["240px", "240px", "240px", "245px"]} src={vector_svg} alt="underline"></Image>
                        </Heading>
                        <br />
                        Deliveries.
                    </Heading>

                    <Text mb={["10px", "10px", "10px", "0"]} fontWeight={["600", "600", "600", "400"]}
                        fontSize={["14px", "14px", "14px", "24px"]}
                        lineHeight={["24px", "24px", "24px", "34px"]}
                        fontFamily="Open Sans">
                        India’s only outcome-based career institute.
                        Enter the tech workforce industry-ready.
                    </Text>

                    <Button w='232px' size="lg" variant="primary-red" onClick={openLoginModal} >
                        GET YOUR DREAM JOB
                    </Button>

                    {/* Login/Register modal */}
                    <SignUpModal openSigninModal={openSignInModalFromLoginModal} openOTPModal={openOTPPanel} isOpen={isLoginModalOpen} onClose={closeLoginModal} />

                    {/* OTP panel */}
                    <OTPVerifiactionPanel isOpen={isOTP} onClose={closeOTPPanel} otpMedium={"Email"} sendOn={"sheelu@gmail.com"}></OTPVerifiactionPanel>

                    {/* Signin Modal  */}
                    <SignInModal openLoginModal={openLogInModalFromSigninModal} isOpen={isSigninModalOpen} onClose={closeSigninModal} openOTPModal={openOTPPanel}></SignInModal>

                    
                </Box>

                <Box h={["429px", "429px", "429px", "572px"]} w={["382px", "382px", "382px", "50%"]}  >

                    <Box align="right" position="relative" w={["382px", "382px", "382px", "508px"]} h={["419px", "419px", "419px", "572px"]}>
                        <Image src={vector_147} alt="Vector 147"></Image>
                        <Image position="absolute" top={["30px", "30x", "30px", "25px"]} left={["25px", "25px", "25px", "40px"]} w={["330px", "330px", "330px", "455px"]} h={["364px", "364px", "364px", "502px"]} src={rewiever_bg} alt="reviewer"></Image>

                        <Box>
                            <Image position="absolute" top={["82px", "82px", "82px", "80px"]} left={["45px", "45px", "45px", "55px"]} w={["291px", "291px", "291px", "424px"]} h={["315px", "315px", "315px", "448px"]} src={reviewer} alt="Reviewer" ></Image>
                            <Box as={Flex} direction="column" justify="space-between" align="start" textAlign="left" position="absolute" p={["14px", "14px", "12px", "18px"]} bottom={["-115px", "-115px", "24px", "100px"]} left={["20px", "20px", "30px", "-230px"]} w={["340px", "340px", "320px", "420px"]} borderRadius='24px' bgGradient="linear(89.52deg, rgba(245, 245, 245, 0.322) 2.5%, rgba(255, 255, 255, 0.7) 99.54%)" shadow="0px 4px 7px 0px #BDBDBD40">
                                <Text textStyle='body2-md' pb="15px">
                                    <span>
                                        “
                                    </span>
                                    I liked that every thing is taught in a structured manner, and there is no spoon feeding. That helps us learn by ourself when we do.
                                    <span>
                                        “
                                    </span>
                                </Text>
                                <Box   >
                                    <Box textStyle="body1">
                                        <Text>

                                            Harshit Tripathi
                                        </Text>
                                        <Image src={company_logo} alt="Company logo" ></Image>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box>

                    </Box>
                </Box>
            </Flex>

            <Box w="100%" >
                <Heading textAlign="center" mb={["10px", "10px", "10px", "0"]} w="100%"
                    textStyle="h2"
                >
                    Driven by  &#160;
                    <Heading display="inline" position="relative" color='#ED0331'>
                        outcomes&#160;
                        <Image position="absolute" left={["0px"]} top={["30px", "30px", "30px", "28px"]} h="14px" w={["240px", "240px", "240px", "245px"]} src={vector_svg} alt="underline"></Image>
                    </Heading>

                    to launch your career in Tech
                </Heading>
            </Box>
            <Box>

           

            </Box>
        </Box>
    )
}

export default HomePage

// h = {["198px","198px","198px","198px"]}