import React, { useEffect, useRef } from "react";
import {
  Image,
  Text,
  Box,
  Button,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Divider,
  Flex,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Accordion,
  Show,
  AspectRatio,
  Hide,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import modalbanner from "../assets/body/Frame 1321316834.svg";
import LiveEventCard from "../components/Greetings/LiveEventCard";
import CustomSteps from "../components/Home/CustomSteps";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApplicationContext } from "../context/ApplicationContext";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { handleApplicationStatus, CreateApplication, applicationStatus, UpdateApplicationStatus } =
    useApplicationContext();
  const { currentUser } = useUserContext();
  const [counter, setCounter] = useState(10);

  const { isOpen: isOpenModal2, onOpen: onOpenModal2, onClose: onCloseModal2 } = useDisclosure();
  const intervalRef = useRef(null);
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      if (counter > 0 && counter !== 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const [Steps, setSteps] = useState([
    {
      title: "Register For Free Webinar",
      subTitle: "",
      isCompleted: false,
    },
    {
      title: "Finish MSAT",
      subTitle: "(Masai School Admission Test)",
      isCompleted: false,
    },
    {
      title: "Complete Onboarding",
      subTitle: "(Web Development Course)",
      isCompleted: false,
    },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await axios(`${baseUrl}/events/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data) setEvents(data.events[0]);
    } catch (error) {
      console.log("Error while fetching Events");
    } finally {
      setIsLoading(false);
    }
  };

  const data = {
    _id: "650ecef0bc0955a8f468e185",
    name: "Explore how Masai Can Help Build Your Career",
    eventType: "Webinar",
    eventDuration: "1",
    eventStartDate: "2023-10-10T12:30:00.000Z",
    eventEndDate: "2023-10-10T13:30:00.000Z",
    eventDescription:
      "Are you curious about the dynamic worlds of software development and data analytics?/n/nJoin this session, as Yogesh Bhat, Co-founder & SVP, uncovers the secret to launching your dream career with Masai. Don't miss this exceptional opportunity to learn how Masai helps play an instrumental role in shaping the landscape of education.",
    speakerName: "Yogesh Bhat",
    speakerDesignation: "Co Founder and SVP",
    speakerImageURL:
      "https://masai-website-images.s3.ap-south-1.amazonaws.com/Yogesh_Bhat_Webinar_Speaker_PNG_4b14113fc3.png",
    speakerDetails:
      "Yogesh Bhat is a Co Founder and SVP at Masai School who also heads Holistic Learning.\nYogesh has his areas of expertise in Strategic Partnerships and Operations, Learning program design, and delivery. Till date, he has facilitated well over 500+ workshops, 600+ masterclasses that catered to over 10,000+ participants across India & overseas.",
    recordedVideoLink: null,
    createdAt: "2023-09-23T11:41:36.760Z",
    updatedAt: "2023-09-23T11:41:36.760Z",
    __v: 0,
  };

  const completeStep = async (index = 0) => {
    // setCurrentStep(index + 1);
    if(index==0){
      const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
      await axios.get(`${process.env.REACT_APP_BASE_URL}/events/register/${events._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    }
   
    const temp = Steps.map((item, i) => {
      return i === index ? { ...item, isCompleted: true } : item;
    });
    setSteps(temp);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getContent = (i) => {
    switch (i) {
      case 0:
        return (
          <AccordionPanel
            px={0}
            bgColor="#6E71CC"
            borderBottomRightRadius={"8px"}
            borderBottomLeftRadius={"8px"}
          >
            <Show breakpoint="(min-width: 1201px)">
              {isLoading ? (
                <Skeleton>
                  {" "}
                  <LiveEventCard {...data} size="xs" handleOnRegister={completeStep} />
                </Skeleton>
              ) : (
                <LiveEventCard {...events} size="xl" handleOnRegister={completeStep} />
              )}
            </Show>
            <Hide breakpoint="(max-width: 470px)">
              <Show breakpoint="(max-width: 1201px)">
                {isLoading ? (
                  <Skeleton>
                    {" "}
                    <LiveEventCard {...data} size="xs" handleOnRegister={completeStep} />
                  </Skeleton>
                ) : (
                  <LiveEventCard {...events} handleOnRegister={completeStep} />
                )}
              </Show>
            </Hide>
            <Show breakpoint="(max-width: 470px)">
              {isLoading ? (
                <Skeleton>
                  {" "}
                  <LiveEventCard {...data} size="xs" handleOnRegister={completeStep} />
                </Skeleton>
              ) : (
                <LiveEventCard {...events} size="xs" handleOnRegister={completeStep} />
              )}
            </Show>
          </AccordionPanel>
        );
      case 1:
        return (
          <AccordionPanel
            px={0}
            bgColor="#6E71CC"
            borderBottomRightRadius={"8px"}
            borderBottomLeftRadius={"8px"}
          >
            <Box borderRadius={"10px"} p="10px">
              <Flex maxW={"600px"} w={"100%"} bg={"white"} borderRadius={"10px"}>
                <AspectRatio borderRadius={"10px"} w={"100%"} maxH={"300px"} ratio={10 / 10}>
                  <iframe
                    src="https://www.youtube.com/embed/cA80lsg0mlo"
                    title="An Insight into our MSAT (Masai School Admissions Test)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  ></iframe>
                </AspectRatio>
              </Flex>
              <Flex w="100%" justifyContent={"flex-end"}>
                <Button
                  colorScheme="gray"
                  border={"1px solid #CCCCCC"}
                  mt={4}
                  onClick={() => {
                    if (
                      applicationStatus === "MSAT_CLEARED" ||
                      applicationStatus === "MSAT_FAILED" ||
                      applicationStatus === "MSAT_SECOND_ATTEMPT_CLEARED" ||
                      applicationStatus === "MSAT_SECOND_ATTEMPT_FAILED"
                    ) {
                      return;
                    } else {
                      onOpen();
                    }
                  }}
                  w={"258px"}
                  bgColor={"white"}
                  _disabled={{ bgColor: "#a3a7e0", cursor: "not-allowed" }}
                  _hover={{ bgColor: "#e4e9ed" }}
                >
                  {applicationStatus === "MSAT_CLEARED" ||
                  applicationStatus === "MSAT_FAILED" ||
                  applicationStatus === "MSAT_SECOND_ATTEMPT_CLEARED" ||
                  applicationStatus === "MSAT_SECOND_ATTEMPT_FAILED"
                    ? "View Result"
                    : "START MSAT"}
                </Button>
              </Flex>
            </Box>
          </AccordionPanel>
        );
      case 2:
        return (
          <AccordionPanel
            px={0}
            bgColor="#6E71CC"
            borderBottomRightRadius={"8px"}
            borderBottomLeftRadius={"8px"}
          >
            <Box borderRadius={"10px"} p="10px">
              <Flex maxW={"600px"} w={"100%"} bg={"white"} borderRadius={"10px"}>
                <AspectRatio borderRadius={"10px"} w={"100%"} maxH={"300px"} ratio={10 / 10}>
                  <iframe
                    width="630"
                    height="302"
                    src="https://www.youtube.com/embed/cA80lsg0mlo"
                    title="An Insight into our MSAT (Masai School Admissions Test)"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                </AspectRatio>
              </Flex>
              <Flex w="100%" justifyContent={"flex-end"}>
                <Button
                  colorScheme="gray"
                  border={"1px solid #CCCCCC"}
                  mt={4}
                  isDisabled={
                    applicationStatus !== "MSAT_CLEARED" &&
                    applicationStatus !== "MSAT_SECOND_ATTEMPT_CLEARED"
                  }
                  onClick={() => {
                    handleApplicationStatus("ONBOARDING_STARTED");
                  }}
                  w={"258px"}
                  bgColor={"white"}
                  _disabled={{
                    bgColor: "#a3a7e0",
                    cursor: "not-allowed",
                    border: "none",
                    _hover: { bgColor: "#a3a7e0" },
                    color: "#8893dc",
                  }}
                  _hover={{ bgColor: "#e4e9ed" }}
                >
                  START ONBOARDING
                </Button>
              </Flex>
            </Box>
          </AccordionPanel>
        );
      default:
        return;
    }
  };
  return (
    <Box mb="20px">
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
        <ModalOverlay />
        <ModalOverlay />
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow={"none"} mt={{ base: "300", lg: "300px" }}>
          <ModalBody>
            <Box pb={5} m={"auto"} border={"0px solid black"} align={"center"}>
              <Flex color={"white"} mb={5} align={"center"} gap={5} justifyContent={"center"}>
                <Text as={"h4"}>00 :{counter === 10 ? counter : `0${counter}`}</Text>
              </Flex>
              <Text as={"h3"} color={"white"}>
                You are being redirected to our MSAT Platform.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4} bg={"#D6E2FA"}>
          <ModalHeader>Before you proceed accept that you are</ModalHeader>
          <ModalCloseButton />
          <ModalBody borderRadius={"10px"}>
            <Image src={modalbanner} />
            <Text fontWeight={"bold"}>Please select the course you want to apply for</Text>
            <Menu>
              <MenuButton
                mt={3}
                width={"100%"}
                bg={"white"}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                Full Stack Web Developement
              </MenuButton>
              <MenuList h={"200px"} overflow={"auto"} w={"370px"} bg={"white"}>
                <MenuItem>Full Stack Web Developement</MenuItem>
                <MenuItem>Backend Web Development</MenuItem>
                <MenuItem>Data Analytics</MenuItem>
                <MenuItem>Software Testing & Automantion</MenuItem>
                <MenuItem>Mobile Development</MenuItem>
              </MenuList>
            </Menu>
          </ModalBody>

          <Divider />
          <ModalFooter>
            <Button colorScheme="gray" variant={"solid"} color={"#0078ff"} mr={3} onClick={onClose}>
              Cancel
            </Button>

            <Button
              variant="solid"
              colorScheme="messenger"
              onClick={() => {
                completeStep(1);
                onClose();
                CreateApplication();
                startTimer();
                onOpenModal2();
                // setTimeout(() => {
                //   UpdateApplicationStatus("MSAT_DECISION_PENDING");
                //   handleApplicationStatus("MSAT_DECISION_PENDING");
                // }, 3000);
                // setTimeout(() => {
                //   UpdateApplicationStatus("MSAT_CLEARED");
                //   handleApplicationStatus("MSAT_CLEARED");
                // }, 5000);
              }}
            >
              CONFIRM & CONTINUE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box ml={{ md: "24px" }} mr={{ md: "24px" }} mt="16px">
        <Text textStyle="body1">
          Hey {currentUser?.user.name}{" "}
          <Box as="span" textStyle="body1-md">
            Welcome to Masai!
          </Box>
        </Text>
        <Text textStyle="h3">
          Start Your Journey in{" "}
          <Box as="span" color={"ms-red.500"}>
            3 Steps
          </Box>
        </Text>
        <Accordion defaultIndex={[0]} allowMultiple pos="relative">
          <Box
            w="1px"
            border={"1px #BBBBBB"}
            pos="absolute"
            top={"0"}
            bottom={0}
            left={{ base: "15px", md: "24px" }}
            borderStyle={"dashed"}
          />
          {Steps.map((item, i) => (
            <AccordionItem
              border={"none"}
              _expanded={{ bg: "#6E71CC", color: "white" }}
              mt="20px"
              pos="relative"
              zIndex={i === 2 ? 5 : 1}
              bgColor={i === 2 ? "#edf2f7" : "transparent"}
              p={0}
              key={i}
            >
              <Flex gap={{ base: "10px", md: "24px" }}>
                <CustomSteps index={i} isCompleted={item.isCompleted} />
                <Box maxW={"571px"} flexGrow={1} m={{ base: "auto", md: "0" }}>
                  <AccordionButton
                    _expanded={{
                      bg: "#6E71CC",
                      color: "white",
                      textStyle: "h4",
                      roundedBottom: "0",
                      border: "none",
                      boxShadow: "none",
                    }}
                    boxShadow="0px 4px 6px -1px #0000001A"
                    rounded={"8px"}
                    textStyle="body1-md"
                    bgColor={"white"}
                    h="80px"
                    border="1px solid #E5E5E5"
                  >
                    <Box flex="1" textAlign="left">
                      <Text as="span" textAlign="left">
                        {item.title}
                      </Text>
                      <Text textStyle="body2">{item.subTitle}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {getContent(i)}
                </Box>
              </Flex>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default Home;
