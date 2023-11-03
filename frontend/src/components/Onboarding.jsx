import {
  Modal,
  Box,
  Button,
  Text,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Stepper from "react-stepper-horizontal";
import OnboardForm from "./OnboardFolder/OnboardForm";
import IdVerfication from "./OnboardFolder/IdVerfication";
import ConsentFile from "./OnboardFolder/ConsentFile";
import JoinUsLink from "./OnboardFolder/JoinUsLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../context/ApplicationContext";
import Greetings from "./Greetings/Greetings";

export const MasaiOnboardingPage = () => {
  const { handleApplicationStatus } = useApplicationContext();
  const [stepperIndex, setStepperIndex] = useState(0);
  const [dob, setDob] = useState("");
  const toast = useToast();
  const [graduationD, setGraduationD] = useState("");
  const [workingorNot, setWorkingorNot] = useState("no");
  const [addharBack, setAddharBack] = useState("");
  const [addharFront, setAddharFront] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [congoModal, setCongoModal] = useState(true);
  const [loadingState, setStateLoading] = useState(false);
  const [minConsentvalue, setMinConsentValue] = useState(0);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = currentUser.token;

  // console.log(currentUser;

  const handleStepperIndex = (n) => {
    let i = stepperIndex + n;
    setStepperIndex(i);
  };

  const GraduationDataFunc = async () => {
    console.log("dob", dob, "grad.date", graduationD);
    setStateLoading(true);

    let formattedDob = new Date(dob).toISOString();
    console.log(formattedDob);
    let data = {
      dateOfBirth: formattedDob,
      graduationMonthYear: graduationD,
      isCurrentlyWorking: workingorNot,
    };

    try {
      await axios
        .patch(`${baseUrl}/applications/onboarding-dob-working-graduation`, data, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(data);
          console.log(res);
          setStateLoading(false);
          handleStepperIndex(1);
          console.log(loadingState);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const AddharUploadFunc = async () => {
    console.log("Addhar Func triggerd");

    setStateLoading(true);

    const formData = new FormData();
    formData.append("images", addharFront);
    formData.append("images", addharBack);

    try {
      await axios
        .patch(`${baseUrl}/applications/onboarding-aadhaar-upload`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.message === "Aadhar card validation failed") {
            setStateLoading(false);
            toast({
              title: "Please upload valid Aadhaar Card .",
              status: "error",
              position: "top-right",
              isClosable:true
            });
          } else {
            setStateLoading(false);
            console.log(res.data);
            handleStepperIndex(1);
          }
        });
    } catch (error) {
      console.error("Error uploading Aadhar images:", error.response);
    }
  };

  const ConsentFunc = async () => {
    console.log("Consent Function");
    setStateLoading(true);
    var requestOptions = {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      redirect: "follow",
    };
    try {
      await axios(`${baseUrl}/applications/onboarding-consents`, requestOptions).then((res) => {
        console.log(res.data);
        handleStepperIndex(1);
        setStateLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ZoomSlackFunc = async () => {
    console.log("Zoom func triggerd");
    setStateLoading(true);
    var requestOptions = {
      method: "PATCH",
      redirect: "follow",
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios(`${baseUrl}/applications/onboarding-zoom`, requestOptions).then((res) => {
        console.log(res.data);
        handleStepperIndex(1);
        setStateLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      bg={"ms-blue.50"}
      border={"ms-"}
      alignSelf={"center"}
      pt={{ base: "10px", lg: "20px" }}
      mt={{ base: "20px", lg: "0px" }}
      flexGrow={1}
      h={{ base: "652px", lg: "760px" }}
    >
      <Box
        bg={"ms-green.50"}
        pb={{ base: "12px" }}
        mt={"24px"}
        display={"flex"}
        justifyContent={"space-between"}
        mr={"24px"}
        border="ms-"
        w={{ base: "343px", sm: "530px", md: "690px", lg: "1127px" }}
        h={{ base: "160px", lg: "169px" }}
        ml={{ base: "16px", lg: "28px" }}
        borderRadius={"16px"}
      >
        {/* Onboarding stepper box */}
        <Box width={"90%"}>
          <Text
            fontSize={"30px"}
            w={{ base: "", lg: "" }}
            pt={{ base: "8px", lg: "20px" }}
            pl={{ base: "16px", lg: "20px" }}
            fontWeight="700"
            color={"ms-green.500"}
          >
            Onboarding
          </Text>

          <Text
            variant={"body2-md"}
            mt={{ lg: "4px" }}
            fontSize={"14px"}
            fontWeight={600}
            ml={{ base: "ms-16", lg: "ms-20" }}
          >
            Course: Web Development{" "}
          </Text>

          {/* Stepper */}
          <Box
            w={{ base: "320px", lg: "50%" }}
            h={{ base: "48px" }}
            ml={"0px"}
            lineHeight={1}
            fontSize={{ base: "10px" }}
          >
            <Stepper
              steps={[
                { title: "Form" },
                { title: "ID verification" },
                { title: "Consent" },
                { title: "Join Us" },
              ]}
              activeStep={stepperIndex}
              activeColor={"#6E71CC"}
              completeColor={"#6FCD9E"}
              completeBarColor={"#6FCD9E"}
              size={25}
              titleTop={4}
              activeTitleColor={"black"}
              circleTop={15}
              titleFontSize={0.5}
              barStyle={"dashed"}
              lineMarginOffset={1}
              circleFontSize={1}
            />
          </Box>
        </Box>
      </Box>

      {/* Onclick next Components changing */}
      <Box
        w={{ base: "", lg: "1128px" }}
        ml={{ base: "16px", lg: "27px" }}
        mr={{ base: "16px", lg: "24px" }}
        mt={{ base: "20px", lg: "44px" }}
      >
        {stepperIndex === 0 ? (
          <OnboardForm
            dob={dob}
            graduationD={graduationD}
            setDob={setDob}
            setGraduationD={setGraduationD}
            setWorkingorNot={setWorkingorNot}
          />
        ) : stepperIndex === 1 ? (
          <>
            <IdVerfication
              addharBack={addharBack}
              addharFront={addharFront}
              setAddharBack={setAddharBack}
              setAddharFront={setAddharFront}
            />
          </>
        ) : stepperIndex === 2 ? (
          <ConsentFile minConsentvalue={minConsentvalue} setMinConsentValue={setMinConsentValue} />
        ) : stepperIndex === 3 ? (
          <JoinUsLink />
        ) : (
          <></>
        )}
      </Box>

      {/* Next and Back button */}
      <Box
        bg={"white"}
        w={{ base: "375px", sm: "575px", md: "750px", lg: "1179px" }}
        // align={'end'}
        border={"ms-"}
        display={"flex"}
        justifyContent={"flex-end"}
        position={{ base: "fixed", lg: "fixed" }}
        bottom={0}
        mt={"170px"}
        h={{ base: "57px", lg: "72px" }}
      >
        {/* Back button */}
        <Button
          color={"ms-info"}
          bgColor={"ms-blue.50"}
          mr={"24px"}
          mt={{ base: "9px", lg: "16px" }}
          onClick={() => {
            if (Stepper === 0) {
              handleApplicationStatus("MSAT_CLEARED");
              handleStepperIndex(1);
            } else {
              handleStepperIndex(-1);
            }
          }}
        >
          Back
        </Button>

        {/* next Button */}
        <Button
          bgColor={"ms-info"}
          color={"white"}
          mr={"24px"}
          mt={{ base: "9px", lg: "16px" }}
          _hover={false}
          onClick={() => {
            if (stepperIndex === 0) {
              GraduationDataFunc();
            }
            if (stepperIndex === 1) {
              console.log(loadingState);
              AddharUploadFunc();
              console.log(loadingState);
            }
            if (stepperIndex === 2 && minConsentvalue >= 2) {
              ConsentFunc();
            }
            if (stepperIndex === 3) {
              ZoomSlackFunc();
              onOpen();
            }
            // handleStepperIndex(1);
          }}
          isDisabled={
            (stepperIndex === 0 && (graduationD === "" || dob === "")) ||
            (stepperIndex === 2 && minConsentvalue <= 1) ||
            (stepperIndex === 1 && (addharBack === "" || addharFront === ""))
          }
        >
          Next
        </Button>
      </Box>

      {/* congratulation to be part of masai modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setCongoModal(!congoModal);
          console.log("onclose triggered when");
        }}
      >
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent
          bg="transparent"
          boxShadow={"none"}
          mt={{ base: "150px", lg: "150px" }}
          fontFamily={"sans-serif"}
        >
          <ModalBody>
            <Box
              pb={5}
              bgImage={
                "url(https://s3-alpha-sig.figma.com/img/d5d2/acf7/3ce2e5cabe116a03e18e82ade9cb6210?Expires=1695600000&Signature=gU~tbUIvLb8Qs8FuGVKVGc7v4wZO0i3hB~LPh5g1c29VF1oWGfqWFRA~SVR~Sk6rGbHj85WvBJ176lNX~qjLHxvZq4lIUZq8rIEfvJBWy9OOkDh-RuG3cI0sKbiCFAvnqGU29A0PIBFJOW~cPR~MZ3FfuYCkOm21BUJCyeT1zqmBd2i-kgmvfSVAaema0LtOPb6zm-lqcRNKEvIWXDggFYZHm0xsZ3XhedlZIYB0YHhy02apJSiZzrxY08RIdFyqvFgkQIvSmsYPC3dmBcYxUeJH9ChbczwvjmG6mjz61NEl0-CqLXrij6qHcXBfexXNmT7wiHOP-fYOFAUDlZlOng__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4)"
              }
              m={"auto"}
              border={"0px solid black"}
              align={"center"}
            >
              <Image
                w={"101px"}
                h={"101px"}
                src="https://s3-alpha-sig.figma.com/img/e381/6b49/6efad071f8e570d301983e3091bcf6e0?Expires=1695600000&Signature=gXyZPAh78FPjv2NuH~iccog571kcNr4S52lEFOBTyHFU1tAVXhPlFSl6HEqeS12DKsmosHG8RO--gCHHUStl26yA2wxb7-jFfvhA8gX0vl~axhX7iiIj3XPqTbA1GScn4XjklY7TVKgDqtzYZKOuK2pp1nbMrDDitereDJboM7-KZwob8UjyzaS4wafew1SYjVU4NX8ctT~E~Ofa8kGUrXepjdJFkU5FPN9ZYnFVkCXfWO7bp9CDstLt~5Vjrt9MvjxX3bN2JHFFo9UjCEf9LEQr6wflFM9HJR6aX03n8gkb0YXl4EPNLQiqWxaQZmShIfLQYJw9KPn1P2qjjvMx7A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              />
              <Text as={"h2"} color={"#6FCD9E"}>
                Congratulations !
              </Text>
              <Text as={"h2"} color={"#6FCD9E"}>
                You are now part of Masai.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      {loadingState === false ? <></> : <LoadingModal />}

      {congoModal === true ? <></> : <AdmitCard token={token} />}
    </Box>
  );
};

function AdmitCard({ token }) {
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [studentName, setStudentName] = useState("");
  let date = new Date().toISOString().split("T")[0].split("-").reverse().join("-");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    GetUserData();
  }, []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { Authorization: `Bearer ${token}` },
  };
  const GetUserData = async () => {
    try {
      await axios.get(`${baseUrl}/user/me`, requestOptions).then((res) => {
        console.log(res);
        setStudentName(res.data.user.name);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onOpen();
  }, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          <Greetings/>
        }}
        size={{ base: "sm", lg: "xl" }}
      >
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent h={"440px"} fontFamily={"serif"}>
          <ModalCloseButton />
          <ModalBody>
            <Card
              mt={{ base: "38px", lg: "40px" }}
              ml={{ base: "", lg: "52px" }}
              bgImage={"linear-gradient(to right,#FFECF0, #FFECF000)"}
              w={{ base: "340px", lg: "436px" }}
              h={{ base: "273px", lg: "280px" }}
              borderRadius={"18px"}
              boxShadow={"0px 0px 28px 1px rgba(6, 38, 99, 0.32)"}
            >
              <CardHeader
                h={"71px"}
                border={"ms-0"}
                borderTopRadius={"18px"}
                color={"white"}
                p={"9px 0px"}
                bg={{ base: "#3470E4", lg: "blackAlpha.900" }}
                textAlign={"center"}
              >
                <Text as={"h5"} color={{ base: "#FFDB66", lg: "white" }}>
                  Provisional Admit Card
                </Text>

                <Text display={"flex"} gap={"3px"} alignItems={"center"} justifyContent={"center"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>

                  <p>Upcoming rock star developer</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                  >
                    <path
                      d="M6.3418 0L7.68888 4.1459H12.0481L8.52142 6.7082L9.86851 10.8541L6.3418 8.2918L2.81509 10.8541L4.16217 6.7082L0.635458 4.1459H4.99471L6.3418 0Z"
                      fill="#FFDB66"
                    />
                  </svg>
                </Text>
              </CardHeader>

              <CardBody mr={0} pr={0} pb={1}>
                <Box display="flex" gap={{ base: "8px", lg: "20px" }}>
                  <Box m={0} p={0}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="73"
                      height="72"
                      viewBox="0 0 73 72"
                      fill="none"
                    >
                      <circle
                        cx="36.3418"
                        cy="36"
                        r="35.5"
                        fill="url(#paint0_linear_3_23070)"
                        stroke="url(#paint1_linear_3_23070)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_3_23070"
                          x1="19.8847"
                          y1="1.02857"
                          x2="49.7132"
                          y2="69.9429"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="white" />
                          <stop offset="1" stop-color="white" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_3_23070"
                          x1="65.6561"
                          y1="72"
                          x2="4.97037"
                          y2="-3.08571"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FF99AE" />
                          <stop offset="1" stop-color="#99C8FF" stopOpacity="0.71" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Image
                      src="https://cp.masaischool.com/static/media/logo.ad26cbefd4555370054eca5c757aa4b3.svg"
                      border={"ms-0"}
                      top={106}
                      w={"60px"}
                      h={"30px"}
                      left={7}
                      position={"absolute"}
                    />
                  </Box>

                  <Box
                    border={"ms-"}
                    w={{ base: "244px", lg: "244px" }}
                    h={{ base: "76px" }}
                    mr={0}
                    pr={0}
                  >
                    <Flex gap={"8px"}>
                      <Text fontSize={"10px"} color={"#6C6768"} w={{ base: "44px" }}>
                        Name
                      </Text>
                      <Text fontSize={"14px"} fontWeight={700}>
                        {studentName}
                      </Text>
                    </Flex>

                    <Flex gap={"8px"}>
                      <Text fontSize={"10px"} color={"#6C6768"} w={{ base: "44px" }}>
                        Course
                      </Text>
                      <Text fontSize={"14px"} fontWeight={700} m={0} p={0}>
                        Full stack web Development
                      </Text>
                    </Flex>

                    <Flex gap={"8px"}>
                      <Text fontSize={"10px"} color={"#6C6768"} w={{ base: "44px" }}>
                        Date
                      </Text>
                      <Text fontSize={"14px"} fontWeight={700}>
                        {date}
                      </Text>
                    </Flex>
                  </Box>
                </Box>

                <Flex
                  justifyContent={"flex-start"}
                  border={"ms-"}
                  ml={0}
                  mt={"20px"}
                  gap={{ base: "9px", lg: "35px" }}
                >
                  <Box
                    alignItems={"center"}
                    border={"ms-"}
                    fontWeight={700}
                    textAlign={"center"}
                    w={"154px"}
                  >
                    <Text fontSize={"18px"} color={"#3470E4"}>
                      96%*
                    </Text>
                    <Text lineHeight={1}>Placement Rate After course completion</Text>
                  </Box>

                  <Flex
                    border={"ms-"}
                    alignItems={"center"}
                    gap={2}
                    fontWeight={700}
                    w={{ lg: "157px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="27"
                      viewBox="0 0 20 27"
                      fill="none"
                    >
                      <path
                        d="M2.96676 22.9884C3.2406 22.8041 3.6147 22.9311 3.71985 23.2439L4.45487 25.431C4.59908 25.8601 5.19376 25.892 5.38302 25.4807L8.31256 19.1159C8.40371 18.9178 8.35604 18.6836 8.19474 18.5369L8.10472 18.455C8.0063 18.3566 7.90788 18.3239 7.7765 18.3239C7.74684 18.3239 7.7239 18.3306 7.70162 18.3379C7.64405 18.3568 7.58336 18.3676 7.52671 18.3891L6.15075 18.911C5.90296 19.005 5.62489 18.8894 5.51685 18.6474L4.88902 17.2411C4.82334 17.077 4.65923 16.9458 4.4624 16.9458L4.04353 16.9276C3.8405 16.9188 3.65234 17.0338 3.56751 17.2185L0.74275 23.3678C0.531887 23.8269 1.05715 24.2734 1.47625 23.9914L2.96676 22.9884Z"
                        fill="#9EA0DD"
                      />
                      <path
                        d="M14.6344 16.9459C14.4376 16.9459 14.2734 17.0444 14.2078 17.2412L13.5811 18.645C13.4726 18.888 13.1927 19.0034 12.9444 18.9076L11.616 18.3948C11.5509 18.3697 11.4883 18.3295 11.4186 18.3253C11.3977 18.324 11.3754 18.324 11.3532 18.324C11.2221 18.324 11.1234 18.3567 11.025 18.4551L10.935 18.537C10.7737 18.6837 10.726 18.9179 10.8172 19.116L13.7467 25.4809C13.936 25.8921 14.5306 25.8602 14.6748 25.4311L15.4089 23.2469C15.5144 22.9331 15.89 22.8066 16.1638 22.9925L17.6221 23.9831C18.0401 24.267 18.5675 23.8222 18.3581 23.3623L15.5612 17.2195C15.4769 17.0343 15.2887 16.9186 15.0853 16.9271L14.6344 16.9459Z"
                        fill="#9EA0DD"
                      />
                      <path
                        d="M9.5479 16.2222C13.0916 16.2222 15.979 13.3347 15.979 9.79107C15.979 6.24745 13.0915 3.32715 9.5479 3.32715C6.00429 3.32715 3.08398 6.21464 3.08398 9.75825C3.08398 13.3019 6.00423 16.2222 9.5479 16.2222ZM6.67687 9.61054C6.95776 9.32969 7.41314 9.3297 7.69401 9.61057L8.02048 9.93704C8.41101 10.3276 9.04419 10.3276 9.43471 9.93702L11.9923 7.37928C12.2732 7.0984 12.7285 7.0984 13.0094 7.37927C13.2903 7.66013 13.2903 8.11549 13.0094 8.39636L9.43466 11.9713C9.04413 12.3618 8.41096 12.3618 8.02042 11.9713L6.67684 10.6277C6.39595 10.3468 6.39596 9.89142 6.67687 9.61054Z"
                        fill="#9EA0DD"
                      />
                      <path
                        d="M1.18089 8.70789C0.595888 9.31129 0.596165 10.2703 1.18152 10.8734L1.21365 10.9065C1.47617 11.169 1.54186 11.5627 1.41048 11.9236C1.09898 12.7299 1.48009 13.6383 2.27365 13.981L2.29649 13.9908C2.6247 14.122 2.85426 14.4829 2.88698 14.8439C2.90527 15.7241 3.61443 16.4332 4.49462 16.4515C4.85556 16.4515 5.21648 16.6813 5.34766 17.0093C5.69471 17.8129 6.61856 18.1942 7.43135 17.8691L7.44762 17.8626C7.77583 17.7314 8.20223 17.7969 8.46472 18.0594L8.48207 18.0758C9.11476 18.6722 10.1049 18.665 10.7288 18.0594C10.9913 17.7969 11.385 17.7312 11.7459 17.8626C12.5478 18.1905 13.4697 17.8046 13.8132 17.0093C13.9773 16.6811 14.3052 16.4515 14.6662 16.4515C15.5464 16.4332 16.2555 15.7241 16.2738 14.8439C16.2738 14.483 16.5036 14.122 16.8316 13.9908L16.8544 13.981C17.648 13.6383 18.0291 12.7299 17.7176 11.9236C17.5865 11.5626 17.6519 11.169 17.9145 10.9065C18.5176 10.2851 18.5176 9.2968 17.9145 8.6754C17.6519 8.41288 17.5862 8.01922 17.7176 7.65829C18.0286 6.83497 17.6396 5.90727 16.8316 5.55834C16.5034 5.42719 16.2738 5.06626 16.2738 4.70529C16.2555 3.82511 15.5464 3.11595 14.6662 3.09766C14.3053 3.09766 13.9443 2.86786 13.8132 2.50716C13.446 1.71728 12.5197 1.35666 11.7134 1.6864C11.3525 1.81755 10.9588 1.75209 10.6963 1.48956L10.6801 1.47379C10.0468 0.858729 9.04161 0.851247 8.39928 1.45681C8.13675 1.71933 7.7431 1.78502 7.38217 1.65365C6.57585 1.34214 5.66747 1.72325 5.32477 2.51681L5.31491 2.53965C5.15081 2.86786 4.82283 3.09742 4.46186 3.13015C3.58168 3.14844 2.87252 3.8576 2.85423 4.73778C2.85423 5.09872 2.62444 5.42695 2.26374 5.59083C1.45574 5.93976 1.0667 6.86745 1.37773 7.69078C1.50888 8.01899 1.44342 8.41264 1.18089 8.70789ZM9.54783 2.86766C13.3541 2.86766 16.4711 5.98472 16.4711 9.79094C16.4711 13.5972 13.3541 16.7142 9.54783 16.7142C5.70886 16.7142 2.62455 13.5972 2.62455 9.79094C2.62455 5.98495 5.74161 2.86766 9.54783 2.86766Z"
                        fill="#9EA0DD"
                      />
                    </svg>
                    <Text lineHeight={1}>
                      I am in the Top
                      <Text>
                        <span style={{ fontSize: "24px", color: "#049402" }}>10%</span> of
                        applicants
                      </Text>
                    </Text>
                  </Flex>
                </Flex>
              </CardBody>

              <CardFooter
                m={0}
                h={{ base: "32px", lg: "61px" }}
                border={"ms-"}
                mb={"0px"}
                borderBottomRadius={"18px"}
                color={{ base: "#3470E4", lg: "white" }}
                alignItems={"center"}
                fontSize={{ base: "1px", lg: "12px" }}
                bg={{ base: "#D6E2FA", lg: "blackAlpha.900" }}
              >
                <Text border={"0px solid white"} m={{ lg: "auto" }}>
                  *As per Masai’s internal assessment report
                </Text>
              </CardFooter>
            </Card>
          </ModalBody>

          <ModalFooter border={"ms-0"} display={"flex"} flexDirection={"column"} gap={"9px"}>
            <Text border={"ms-"} as={"h4"}>
              Share your success with your friends
            </Text>
            <Flex border={"ms-"} gap={"24px"}>
              {/* linkedin */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M22.2283 0H1.77167C1.30179 0 0.851161 0.186657 0.518909 0.518909C0.186657 0.851161 0 1.30179 0 1.77167V22.2283C0 22.6982 0.186657 23.1488 0.518909 23.4811C0.851161 23.8133 1.30179 24 1.77167 24H22.2283C22.6982 24 23.1488 23.8133 23.4811 23.4811C23.8133 23.1488 24 22.6982 24 22.2283V1.77167C24 1.30179 23.8133 0.851161 23.4811 0.518909C23.1488 0.186657 22.6982 0 22.2283 0ZM7.15333 20.445H3.545V8.98333H7.15333V20.445ZM5.34667 7.395C4.93736 7.3927 4.53792 7.2692 4.19873 7.04009C3.85955 6.81098 3.59584 6.48653 3.44088 6.10769C3.28591 5.72885 3.24665 5.31259 3.32803 4.91145C3.40941 4.51032 3.6078 4.14228 3.89816 3.85378C4.18851 3.56529 4.55782 3.36927 4.95947 3.29046C5.36112 3.21165 5.77711 3.25359 6.15495 3.41099C6.53279 3.56838 6.85554 3.83417 7.08247 4.17481C7.30939 4.51546 7.43032 4.91569 7.43 5.325C7.43386 5.59903 7.38251 5.87104 7.27901 6.1248C7.17551 6.37857 7.02198 6.6089 6.82757 6.80207C6.63316 6.99523 6.40185 7.14728 6.14742 7.24915C5.893 7.35102 5.62067 7.40062 5.34667 7.395ZM20.4533 20.455H16.8467V14.1933C16.8467 12.3467 16.0617 11.7767 15.0483 11.7767C13.9783 11.7767 12.9283 12.5833 12.9283 14.24V20.455H9.32V8.99167H12.79V10.58H12.8367C13.185 9.875 14.405 8.67 16.2667 8.67C18.28 8.67 20.455 9.865 20.455 13.365L20.4533 20.455Z"
                  fill="#0A66C2"
                />
              </svg>
              {/* FACEBOOK */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                  fill="#1877F2"
                />
                <path
                  d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z"
                  fill="white"
                />
              </svg>
              {/* TWITTER */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.54752 21.7503C16.6042 21.7503 21.5578 14.2469 21.5578 7.74003C21.5578 7.52691 21.5578 7.31475 21.5434 7.10355C22.507 6.40651 23.3389 5.54344 24 4.55475C23.1014 4.95315 22.148 5.21431 21.1718 5.32947C22.1998 4.71416 22.9692 3.74625 23.3366 2.60595C22.3701 3.17956 21.3126 3.58378 20.2099 3.80115C19.4675 3.01173 18.4856 2.48899 17.4162 2.31384C16.3468 2.13868 15.2494 2.32087 14.294 2.8322C13.3385 3.34354 12.5782 4.15553 12.1307 5.1425C11.6833 6.12947 11.5735 7.23642 11.8186 8.29203C9.8609 8.19383 7.94576 7.68506 6.19745 6.79876C4.44915 5.91245 2.90676 4.66841 1.6704 3.14739C1.04073 4.23139 0.847872 5.51462 1.1311 6.73581C1.41433 7.95701 2.15234 9.02435 3.19488 9.72051C2.41123 9.69755 1.64465 9.48615 0.96 9.10419V9.16659C0.960311 10.3034 1.35385 11.4052 2.07387 12.285C2.79389 13.1647 3.79606 13.7684 4.9104 13.9935C4.18548 14.1912 3.42487 14.2201 2.68704 14.078C3.00181 15.0563 3.61443 15.9118 4.43924 16.5249C5.26405 17.138 6.25983 17.478 7.28736 17.4975C6.26644 18.2999 5.09731 18.8933 3.84687 19.2435C2.59643 19.5937 1.28921 19.6939 0 19.5384C2.25183 20.9834 4.87192 21.7499 7.54752 21.7464"
                  fill="#1DA1F2"
                />
              </svg>
              {/* CAM */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
              >
                <path
                  d="M8.88806 10.0684C8.20406 10.0684 7.66406 10.6684 7.66406 11.4004C7.66406 12.1324 8.21606 12.7324 8.88806 12.7324C9.57206 12.7324 10.1121 12.1324 10.1121 11.4004C10.1241 10.6684 9.57206 10.0684 8.88806 10.0684ZM13.2681 10.0684C12.5841 10.0684 12.0441 10.6684 12.0441 11.4004C12.0441 12.1324 12.5961 12.7324 13.2681 12.7324C13.9521 12.7324 14.4921 12.1324 14.4921 11.4004C14.4921 10.6684 13.9521 10.0684 13.2681 10.0684Z"
                  fill="#3470E4"
                />
                <path
                  d="M19.1001 0H3.02006C1.66406 0 0.560059 1.104 0.560059 2.472V18.696C0.560059 20.064 1.66406 21.168 3.02006 21.168H16.6281L15.9921 18.948L17.5281 20.376L18.9801 21.72L21.5601 24V2.472C21.5601 1.104 20.4561 0 19.1001 0ZM14.4681 15.672C14.4681 15.672 14.0361 15.156 13.6761 14.7C15.2481 14.256 15.8481 13.272 15.8481 13.272C15.3561 13.596 14.8881 13.824 14.4681 13.98C13.8681 14.232 13.2921 14.4 12.7281 14.496C11.5761 14.712 10.5201 14.652 9.62006 14.484C8.93606 14.352 8.34806 14.16 7.85606 13.968C7.58006 13.86 7.28006 13.728 6.98006 13.56C6.94406 13.536 6.90806 13.524 6.87206 13.5C6.84806 13.488 6.83606 13.476 6.82406 13.464C6.60806 13.344 6.48806 13.26 6.48806 13.26C6.48806 13.26 7.06406 14.22 8.58806 14.676C8.22806 15.132 7.78406 15.672 7.78406 15.672C5.13206 15.588 4.12406 13.848 4.12406 13.848C4.12406 9.984 5.85206 6.852 5.85206 6.852C7.58006 5.556 9.22406 5.592 9.22406 5.592L9.34406 5.736C7.18406 6.36 6.18806 7.308 6.18806 7.308C6.18806 7.308 6.45206 7.164 6.89606 6.96C8.18006 6.396 9.20006 6.24 9.62006 6.204C9.69206 6.192 9.75206 6.18 9.82406 6.18C10.5561 6.084 11.3841 6.06 12.2481 6.156C13.3881 6.288 14.6121 6.624 15.8601 7.308C15.8601 7.308 14.9121 6.408 12.8721 5.784L13.0401 5.592C13.0401 5.592 14.6841 5.556 16.4121 6.852C16.4121 6.852 18.1401 9.984 18.1401 13.848C18.1401 13.848 17.1201 15.588 14.4681 15.672Z"
                  fill="#3470E4"
                />
              </svg>
              {/* LINK */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M10.5899 13.4103C10.9999 13.8003 10.9999 14.4403 10.5899 14.8303C10.1999 15.2203 9.55995 15.2203 9.16995 14.8303C7.21995 12.8803 7.21995 9.71031 9.16995 7.76031L12.7099 4.22031C14.6599 2.27031 17.8299 2.27031 19.7799 4.22031C21.7299 6.17031 21.7299 9.34031 19.7799 11.2903L18.2899 12.7803C18.2999 11.9603 18.1699 11.1403 17.8899 10.3603L18.3599 9.88031C19.5399 8.71031 19.5399 6.81031 18.3599 5.64031C17.1899 4.46031 15.2899 4.46031 14.1199 5.64031L10.5899 9.17031C9.40995 10.3403 9.40995 12.2403 10.5899 13.4103ZM13.4099 9.17031C13.7999 8.78031 14.4399 8.78031 14.8299 9.17031C16.7799 11.1203 16.7799 14.2903 14.8299 16.2403L11.2899 19.7803C9.33995 21.7303 6.16995 21.7303 4.21995 19.7803C2.26995 17.8303 2.26995 14.6603 4.21995 12.7103L5.70995 11.2203C5.69995 12.0403 5.82995 12.8603 6.10995 13.6503L5.63995 14.1203C4.45995 15.2903 4.45995 17.1903 5.63995 18.3603C6.80995 19.5403 8.70995 19.5403 9.87995 18.3603L13.4099 14.8303C14.5899 13.6603 14.5899 11.7603 13.4099 10.5903C12.9999 10.2003 12.9999 9.56031 13.4099 9.17031Z"
                  fill="#3470E4"
                />
              </svg>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function LoadingModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={"none"} mt={{ base: "300", lg: "300px" }}>
          <ModalBody>
            <Box pb={5} m={"auto"} border={"0px solid black"} align={"center"}>
              <Spinner
                thickness="2px"
                speed="0.65s"
                emptyColor="gray.600"
                size={"xl"}
                color="white"
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MasaiOnboardingPage;
